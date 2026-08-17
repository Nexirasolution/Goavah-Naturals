import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number, default: 0 },
    unit: { type: String, default: "piece" },

    // Images + Videos
    media: {
      type: [MediaSchema],
      default: [],
    },

    stock: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    tags: { type: [String], default: [] },

    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    attributes: {
      handmade: { type: Boolean, default: true },
      natural: { type: Boolean, default: true },
      ecoFriendly: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

// Full-text search across name/description/tags (used by ?search=)
ProductSchema.index({
  name: "text",
  description: "text",
  tags: "text",
});

// Storefront queries always filter on isActive first, then narrow by
// category or isFeatured, or sort by createdAt/price. Without these,
// Mongo falls back to a full collection scan on every products page,
// category page, and homepage best-seller load.
ProductSchema.index({ isActive: 1, category: 1 });
ProductSchema.index({ isActive: 1, isFeatured: 1 });
ProductSchema.index({ isActive: 1, createdAt: -1 });
ProductSchema.index({ isActive: 1, price: 1 });

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);