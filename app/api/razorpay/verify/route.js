// app/api/razorpay/verify/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    // The order was already created (as "pending_payment") by /create-order.
    // This route just confirms it — it never creates a new order.
    const order = await Order.findOne({ "razorpay.orderId": razorpay_order_id });
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Idempotent: if the webhook already marked this paid, don't redo work
    // (and definitely don't decrement stock twice).
    if (order.paymentStatus !== "paid") {
      order.paymentStatus = "paid";
      order.status = "confirmed";
      order.razorpay.paymentId = razorpay_payment_id;
      order.razorpay.signature = razorpay_signature;
      order.statusHistory.push({ status: "confirmed", note: "Paid via Razorpay" });
      await order.save();

      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
      }
    }

    return NextResponse.json({ order });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Payment verification failed." }, { status: 500 });
  }
}
