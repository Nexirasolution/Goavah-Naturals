import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/Banner";

export const getActiveBanners = unstable_cache(
  async () => {
    await connectDB();
    const banners = await Banner.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(banners));
  },
  ["active-banners"],
  { revalidate: 60, tags: ["banners"] }
);