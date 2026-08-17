import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "leaf" }, // icon key used on the storefront
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Matches Category.find({ isActive: true }).sort({ sortOrder: 1 }) used on
// the homepage and products page filter bar.
CategorySchema.index({ isActive: 1, sortOrder: 1 });

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);