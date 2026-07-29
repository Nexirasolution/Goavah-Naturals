import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import "@/models/Category";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const activeOnly = searchParams.get("activeOnly");
    const limit = parseInt(searchParams.get("limit") || "0", 10);

    const query = {};
    if (category) query.category = category;
    if (featured === "true") query.isFeatured = true;
    if (activeOnly === "true") query.isActive = true;
    if (search) query.$text = { $search: search };

    let cursor = Product.find(query).populate("category", "name slug").sort({ createdAt: -1 });
    if (limit) cursor = cursor.limit(limit);

    const products = await cursor;
    return NextResponse.json({ products });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name || !body.category || body.price === undefined) {
      return NextResponse.json({ error: "Name, category and price are required." }, { status: 400 });
    }

    let slug = slugify(body.name);
    const existing = await Product.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    const product = await Product.create({ ...body, slug });
    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create product." }, { status: 500 });
  }
}
