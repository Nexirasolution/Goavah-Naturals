import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import "@/models/Category";
import { deleteImageFromCloudinary } from "@/lib/cloudinary";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const product =
      (await Product.findById(id).populate("category", "name slug")) ||
      (await Product.findOne({ slug: id }).populate("category", "name slug"));

    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    return NextResponse.json({ product });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch product." }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });

    return NextResponse.json({ product });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });

    for (const img of product.images) {
      await deleteImageFromCloudinary(img.publicId);
    }
    await product.deleteOne();

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}
