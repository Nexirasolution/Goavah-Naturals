import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import "@/models/Category";
import { buildProductFilter, getSortSpec } from "@/lib/productQuery";

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

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = (searchParams.get("search") || "").trim();
    const featured = searchParams.get("featured");
    const activeOnly = searchParams.get("activeOnly");
    const sort = searchParams.get("sort");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // Pagination params. `limit=0` (or omitted with no `page`) preserves the old
    // "return everything" behavior for any other callers of this endpoint.
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const hasPageParam = searchParams.has("page");
    const rawLimit = parseInt(searchParams.get("limit") || "0", 10);
    const limit = hasPageParam ? (rawLimit > 0 ? rawLimit : 12) : rawLimit;

    const query = buildProductFilter({ category, search, featured, activeOnly, minPrice, maxPrice });
    const sortSpec = getSortSpec(sort);

    let cursor = Product.find(query).populate("category", "name slug").sort(sortSpec);

    let total = null;
    if (limit) {
      total = await Product.countDocuments(query);
      cursor = cursor.skip((page - 1) * limit).limit(limit);
    }

    const products = await cursor;

    const body = { products };
    if (limit) {
      body.pagination = {
        page,
        limit,
        total,
        totalPages: Math.max(Math.ceil(total / limit), 1),
      };
    }

    return NextResponse.json(body);
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