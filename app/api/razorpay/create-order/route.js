// app/api/razorpay/create-order/route.js
import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount } = body; // rupees

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    return NextResponse.json({ order });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create Razorpay order." }, { status: 500 });
  }
}