// Seed script — populates the database with Goavah Naturals' product
// categories and starter products so the store isn't empty on first run.
//
// NOTE: Prices, units, and stock below are PLACEHOLDERS. Update them from
// the admin panel (Products > Edit) or edit the PRODUCTS array below before
// running this in production.
//
// Usage:  npm run seed
// Requires MONGODB_URI to be set in .env.local

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    icon: String,
    isActive: { type: Boolean, default: true },
    sortOrder: Number,
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    shortDescription: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    price: Number,
    compareAtPrice: Number,
    unit: String,
    images: [{ url: String, publicId: String }],
    stock: Number,
    lowStockThreshold: Number,
    isFeatured: Boolean,
    isActive: Boolean,
    attributes: {
      handmade: Boolean,
      natural: Boolean,
      ecoFriendly: Boolean,
    },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const CATEGORIES = [
  {
    name: "Herbal Food & Wellness",
    slug: "herbal-food-wellness",
    icon: "leaf",
    sortOrder: 1,
    description: "Herbal powders, tonics, and wellness foods made the traditional way.",
  },
  {
    name: "Donkey Milk Skin & Hair Care",
    slug: "skin-hair-care",
    icon: "drop",
    sortOrder: 2,
    description: "Natural donkey-milk and herbal skin and hair care products.",
  },
  {
    name: "Spiritual Products",
    slug: "spiritual-products",
    icon: "root",
    sortOrder: 3,
    description: "Gemstones, rudraksha, karungali, dhoop, and other spiritual essentials.",
  },
];

const PRODUCTS = [
  // Herbal Food & Wellness
  {
    name: "Weight Loss Herbal Powder",
    category: "herbal-food-wellness",
    price: 450,
    unit: "200 g",
    stock: 20,
    isFeatured: true,
    description: "Herbal powder blend formulated to support healthy weight management.",
  },
  {
    name: "Pomegranate Red Wine",
    category: "herbal-food-wellness",
    price: 350,
    unit: "500 ml",
    stock: 20,
    isFeatured: true,
    description: "Naturally prepared pomegranate red wine, rich in antioxidants.",
  },
  {
    name: "Fruits Lehyam",
    category: "herbal-food-wellness",
    price: 320,
    unit: "250 g",
    stock: 20,
    isFeatured: false,
    description: "Traditional fruit-based lehyam (herbal jam), a nutritious daily tonic.",
  },

  // Donkey Milk Skin & Hair Care
  {
    name: "Donkey Milk Face Cream",
    category: "skin-hair-care",
    price: 380,
    unit: "50 g",
    stock: 25,
    isFeatured: true,
    description: "Nourishing face cream made with donkey milk, known for its natural skin-brightening properties.",
  },
  {
    name: "Herbal Face Wash",
    category: "skin-hair-care",
    price: 220,
    unit: "100 ml",
    stock: 25,
    isFeatured: false,
    description: "Gentle herbal face wash for everyday cleansing.",
  },
  {
    name: "Herbal Gel",
    category: "skin-hair-care",
    price: 200,
    unit: "100 g",
    stock: 20,
    isFeatured: false,
    description: "Soothing herbal gel for skin and hair care.",
  },
  {
    name: "Herbal Hair Oil",
    category: "skin-hair-care",
    price: 280,
    unit: "200 ml",
    stock: 25,
    isFeatured: true,
    description: "Traditional herbal hair oil to nourish scalp and hair.",
  },
  {
    name: "Herbal Face Pack",
    category: "skin-hair-care",
    price: 250,
    unit: "100 g",
    stock: 20,
    isFeatured: false,
    description: "Natural herbal face pack for glowing, healthy skin.",
  },
  {
    name: "Herbal Hair Spray",
    category: "skin-hair-care",
    price: 260,
    unit: "150 ml",
    stock: 15,
    isFeatured: false,
    description: "Herbal hair spray for daily styling and care.",
  },
  {
    name: "Herbal Soap",
    category: "skin-hair-care",
    price: 90,
    unit: "100 g",
    stock: 30,
    isFeatured: false,
    description: "Natural herbal soap, gentle on the skin.",
  },

  // Spiritual Products
  {
    name: "Gemstone Bracelet",
    category: "spiritual-products",
    price: 450,
    unit: "1 piece",
    stock: 15,
    isFeatured: true,
    description: "Natural gemstone bracelet.",
  },
  {
    name: "Rudraksha Mala (ருத்ராக்ஷம்)",
    category: "spiritual-products",
    price: 550,
    unit: "1 piece",
    stock: 15,
    isFeatured: true,
    description: "Traditional rudraksha mala.",
  },
  {
    name: "Karungali Bracelet",
    category: "spiritual-products",
    price: 400,
    unit: "1 piece",
    stock: 15,
    isFeatured: false,
    description: "Karungali (black ebony wood) bracelet.",
  },
  {
    name: "Herbal Water",
    category: "spiritual-products",
    price: 150,
    unit: "500 ml",
    stock: 20,
    isFeatured: false,
    description: "Herbal-infused water for daily use.",
  },
  {
    name: "Bathi & Dhoop Sticks",
    category: "spiritual-products",
    price: 120,
    unit: "pack",
    stock: 30,
    isFeatured: false,
    description: "Traditional bathi and dhoop sticks for daily worship.",
  },
  {
    name: "Yantra",
    category: "spiritual-products",
    price: 300,
    unit: "1 piece",
    stock: 15,
    isFeatured: false,
    description: "Sacred yantra for home or worship space.",
  },
];

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");
}

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set. Add it to .env.local before seeding.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  const categoryMap = {};
  for (const cat of CATEGORIES) {
    const existing = await Category.findOne({ slug: cat.slug });
    if (existing) {
      categoryMap[cat.slug] = existing._id;
      console.log(`Category exists: ${cat.name}`);
      continue;
    }
    const created = await Category.create(cat);
    categoryMap[cat.slug] = created._id;
    console.log(`Created category: ${cat.name}`);
  }

  for (const p of PRODUCTS) {
    const slug = slugify(p.name);
    const existing = await Product.findOne({ slug });
    if (existing) {
      console.log(`Product exists: ${p.name}`);
      continue;
    }
    await Product.create({
      ...p,
      slug,
      category: categoryMap[p.category],
      lowStockThreshold: 5,
      attributes: { handmade: true, natural: true, ecoFriendly: true },
      isActive: true,
      images: [],
    });
    console.log(`Created product: ${p.name}`);
  }

  console.log("\nSeeding complete. Add product images and confirm real prices from the admin panel (Products > Edit).");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});