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

function normalizeMedia(media) {
  if (!Array.isArray(media)) return [];
  return media.map((item) => ({
    url: item.url,
    publicId: item.publicId,
    type: item.type || item.mediaType || "image",
  }));
}

// Escape regex special characters so search terms like "gift+set" or "100%" don't break the query
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const SORT_MAP = {
  newest: { createdAt: -1 },
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  "name-asc": { name: 1 },
  "name-desc": { name: -1 },
};

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = (searchParams.get("search") || "").trim();
    const featured = searchParams.get("featured");
    const activeOnly = searchParams.get("activeOnly");
    const limit = parseInt(searchParams.get("limit") || "0", 10);
    const sort = searchParams.get("sort");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const query = {};
    if (category) query.category = category;
    if (featured === "true") query.isFeatured = true;
    if (activeOnly === "true") query.isActive = true;

    if (search) {
      const safe = escapeRegex(search);
      query.$or = [
        { name: { $regex: safe, $options: "i" } },
        { description: { $regex: safe, $options: "i" } },
        { shortDescription: { $regex: safe, $options: "i" } },
        { sku: { $regex: safe, $options: "i" } },
        { tags: { $regex: safe, $options: "i" } },
      ];
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      const min = Number(minPrice);
      const max = Number(maxPrice);
      if (minPrice && Number.isFinite(min)) query.price.$gte = min;
      if (maxPrice && Number.isFinite(max)) query.price.$lte = max;
      if (Object.keys(query.price).length === 0) delete query.price;
    }

    // Products are ordered by SKU across the site by default;
    // an explicit `sort` param overrides that.
    const sortSpec = (sort && SORT_MAP[sort]) || { sku: 1 };

    let cursor = Product.find(query).populate("category", "name slug").sort(sortSpec);
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
    if (!body.sku || !String(body.sku).trim()) {
      return NextResponse.json({ error: "SKU is required." }, { status: 400 });
    }

    const sku = String(body.sku).trim().toUpperCase();
    const dupSku = await Product.findOne({ sku });
    if (dupSku) {
      return NextResponse.json({ error: `SKU "${sku}" is already in use.` }, { status: 400 });
    }

    let slug = slugify(body.name);
    const existingSlug = await Product.findOne({ slug });
    if (existingSlug) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    try {
      const product = await Product.create({
        ...body,
        sku,
        slug,
        media: normalizeMedia(body.media),
      });
      return NextResponse.json({ product }, { status: 201 });
    } catch (err) {
      if (err.code === 11000) {
        return NextResponse.json({ error: "SKU must be unique." }, { status: 400 });
      }
      throw err;
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create product." }, { status: 500 });
  }
}