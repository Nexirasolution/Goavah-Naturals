import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

// Configure this URL in Razorpay Dashboard -> Settings -> Webhooks,
// subscribed to the "payment.captured" event, with its own secret
// (RAZORPAY_WEBHOOK_SECRET, distinct from RAZORPAY_KEY_SECRET).
export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
    console.error("RAZORPAY_WEBHOOK_SECRET is not configured.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (expected !== signature) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (payload.event === "payment.captured") {
    try {
      const payment = payload.payload.payment.entity;
      const razorpayOrderId = payment.order_id;

      await connectDB();
      const order = await Order.findOne({ "razorpay.orderId": razorpayOrderId });

      if (!order) {
        // No matching order — could mean create-order failed to save,
        // or this is a stale/test event. Log for manual follow-up.
        console.error("Webhook: no matching order for razorpay order", razorpayOrderId);
        return NextResponse.json({ received: true });
      }

      // Idempotency: client-side /verify may have already processed this
      // payment. Only act once.
      if (order.paymentStatus !== "paid") {
        order.paymentStatus = "paid";
        order.status = "confirmed";
        order.razorpay.paymentId = payment.id;
        order.statusHistory.push({ status: "confirmed", note: "Paid via Razorpay (webhook)" });
        await order.save();

        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }
      }
    } catch (err) {
      console.error("Webhook processing error:", err);
      // Still acknowledge receipt so Razorpay doesn't endlessly retry a
      // payload that will never succeed; the /reconcile job is the backstop.
    }
  }

  return NextResponse.json({ received: true });
}
