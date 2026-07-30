// app/categories/page.jsx
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

const CATEGORY_IMAGES = {
  "Handmade Wire Bags": "/categroy/wire-bags.png",
  "Organic Fertilizers & Soil Enhancers": "/categroy/organic-fertilizers.png",
  "Clay Products": "/categroy/clay-products.png",
  "Wooden Products": "/categroy/wooden-products.png",
  "Handmade Wooden Toys & Miniatures": "/categroy/wooden-toys.png",
  "Herbal Products": "/categroy/herbal-products.png",
};

async function getCategories() {
  await connectDB();
  const categories = await Category.find({ isActive: true })
    .sort({ sortOrder: 1, name: 1 })
    .lean();
  return JSON.parse(JSON.stringify(categories));
}

export const metadata = {
  title: "Shop by Category | KMC Iyarkai Creation",
  description: "Browse all product categories — handmade, natural, and eco-friendly.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
            Browse
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-forest md:text-4xl">
            All Categories
          </h1>
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-muted">
            Categories will appear here once added from the admin panel.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products?category=${cat._id}`}
                className="group flex flex-col items-center"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-lg md:h-28 md:w-28">
                  <Image
                    src={cat.image?.url || CATEGORY_IMAGES[cat.name] || "/categroy/default.png"}
                    alt={cat.name}
                    fill
                    sizes="(max-width:768px) 96px, 112px"
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-3 text-center text-sm font-semibold text-ink transition group-hover:text-forest md:text-base">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}