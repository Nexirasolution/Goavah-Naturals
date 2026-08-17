import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsGrid from "@/components/ProductsGrid";
import { getSettings } from "@/lib/settings";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { buildProductFilter, getSortSpec } from "@/lib/productQuery";

export const metadata = { title: "Shop | Goavah Naturals" };

// Cache this page for 60s so repeat/nearby visitors get a pre-rendered
// response instead of hitting Mongo on every request. Filtered views
// (category/search query params) still render fresh since Next treats
// distinct searchParams combinations separately, but the common
// no-filter case is what benefits most.
export const revalidate = 60;

const PAGE_SIZE = 12;

// Uses the same filter/sort builder as /api/products (via lib/productQuery)
// so the server-rendered first page always matches what ProductsGrid's
// client-side fetch would return for the same params — no flash/mismatch
// when the client takes over.
async function getInitialProducts({ category, search }) {
  await connectDB();

  const query = buildProductFilter({ category, search, activeOnly: true });
  const sortSpec = getSortSpec(); // no `sort` param on initial load = default (sku: 1)

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate("category", "name slug")
      .sort(sortSpec)
      .limit(PAGE_SIZE)
      .lean(),
    Product.countDocuments(query),
  ]);

  return {
    products: JSON.parse(JSON.stringify(products)),
    pagination: {
      page: 1,
      limit: PAGE_SIZE,
      total,
      totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    },
  };
}

async function getInitialCategories() {
  await connectDB();
  const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
  return JSON.parse(JSON.stringify(categories));
}

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams;
  const category = sp?.category || "";
  const search = sp?.search || "";

  const [settings, categories, { products, pagination }] = await Promise.all([
    getSettings(),
    getInitialCategories(),
    getInitialProducts({ category, search }),
  ]);

  return (
    <>
      <Navbar settings={settings} />
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="mb-10 text-center">
          <p className="font-body italic text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">Our Collection</p>
          <h1 className="mt-2 font-body italic text-3xl font-bold text-forest md:text-4xl">
            Natural Wellness, Skincare &amp; Spiritual Products
          </h1>
        </div>
        <ProductsGrid
          initialCategory={category}
          initialSearch={search}
          initialCategories={categories}
          initialProducts={products}
          initialPagination={pagination}
        />
      </section>
      <Footer />
    </>
  );
}