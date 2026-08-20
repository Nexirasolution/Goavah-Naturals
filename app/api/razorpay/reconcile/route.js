import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getRazorpay } from "@/lib/razorpay";

// Safety net for the rare case where BOTH the client-side /verify call and
// the webhook fail to reach us (e.g. browser closed + webhook delivery
// blip). Run this on a schedule (see vercel.json cron, or an external
// cron pinger) and/or trigger it manually from the admin panel.
export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.RECONCILE_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const razorpay = getRazorpay();

  const GRACE_PERIOD_MS = 15 * 60 * 1000; // 15 minutes
  const cutoff = new Date(Date.now() - GRACE_PERIOD_MS);

  const staleOrders = await Order.find({
    status: "pending_payment",
    createdAt: { $lte: cutoff },
  });

  const results = [];

  for (const order of staleOrders) {
    try {
      const rzpOrderId = order.razorpay?.orderId;
      if (!rzpOrderId) {
        results.push({ orderNumber: order.orderNumber, resolved: "skipped-no-razorpay-id" });
        continue;
      }

      // Ask Razorpay directly what happened to this order's payment(s).
      const payments = await razorpay.orders.fetchPayments(rzpOrderId);
      const captured = payments.items.find((p) => p.status === "captured");

      if (captured) {
        // Payment actually succeeded — both /verify and the webhook
        // missed it. Resolve it now.
        order.paymentStatus = "paid";
        order.status = "confirmed";
        order.razorpay.paymentId = captured.id;
        order.statusHistory.push({ status: "confirmed", note: "Reconciled: payment found captured" });
        await order.save();

        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }
        results.push({ orderNumber: order.orderNumber, resolved: "paid" });
      } else {
        // No captured payment after the grace period — genuinely
        // abandoned at checkout. No stock to restore (never decremented).
        order.status = "cancelled";
        order.statusHistory.push({ status: "cancelled", note: "Reconciled: no captured payment found" });
        await order.save();
        results.push({ orderNumber: order.orderNumber, resolved: "cancelled" });
      }
    } catch (err) {
      console.error(`Reconcile failed for ${order.orderNumber}:`, err.message);
      results.push({ orderNumber: order.orderNumber, resolved: "error", error: err.message });
    }
  }

  return NextResponse.json({ checked: staleOrders.length, results });
}
