import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { CATEGORY_ICONS, LeafIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

async function getData() {
  await connectDB();
  const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
  const featured = await Product.find({ isActive: true, isFeatured: true })
    .populate("category", "name slug")
    .limit(8)
    .lean();
  return {
    categories: JSON.parse(JSON.stringify(categories)),
    featured: JSON.parse(JSON.stringify(featured)),
  };
}

const WHY_CHOOSE = [
  { title: "100% Handmade", desc: "Crafted by skilled artisans" },
  { title: "Eco-Friendly", desc: "Natural & sustainable materials" },
  { title: "Premium Quality", desc: "Carefully crafted with perfection" },
  { title: "Pan India Delivery", desc: "Safe & timely, everywhere" },
];
const CATEGORY_IMAGES = {
  "Handmade Wire Bags": "/categroy/wire-bags.png",
  "Organic Fertilizers & Soil Enhancers": "/categroy/organic-fertilizers.png",
  "Clay Products": "/categroy/clay-products.png",
  "Wooden Products": "/categroy/wooden-products.png",
  "Handmade Wooden Toys & Miniatures": "/categroy/wooden-toys.png",
  "Herbal Products": "/categroy/herbal-products.png",
};
export default async function HomePage() {
  const { categories, featured } = await getData();

  return (
    <>
      <Navbar />

      {/* Hero */}
            {/* Hero */}
        <section className="relative h-[90vh] min-h-[650px] overflow-hidden">

          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/farm.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />

          {/* Decorative Overlay */}
          <div className="absolute inset-0 bg-leaf-corner opacity-20" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 md:px-8">
            <div className="max-w-2xl">

              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md">
                <LeafIcon className="h-4 w-4" />
                Eco-Friendly • Handmade • Natural
              </span>

              <h1 className="mt-8 font-display text-5xl font-bold leading-tight text-white md:text-7xl">
                Pure Nature.
                <br />
                Handmade with Love.
              </h1>

              

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="rounded-full bg-forest px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-green-800"
                >
                  Shop Collection
                </Link>

                <Link
                  href="/track-order"
                  className="rounded-full border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
                >
                  Track Order
                </Link>
              </div>

            </div>
          </div>

        </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">Explore</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-forest md:text-4xl">
            Shop by Category
          </h2>
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-muted">
            Categories will appear here once added from the admin panel.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-6 md:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products?category=${cat._id}`}
                className="group flex flex-col items-center"
              >
                {/* Circular Image */}
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-lg">
                  <Image
                    src={CATEGORY_IMAGES[cat.name] || "/categroy/default.png"}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Category Name */}
                <h3 className="mt-3 text-center text-sm font-medium text-gray-800 transition group-hover:text-green-700">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="bg-champagne/50 py-16">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
                  Handpicked
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-forest md:text-4xl">
                  Featured Products
                </h2>
              </div>
              <Link href="/products" className="hidden text-sm font-semibold text-forest hover:underline md:block">
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-forest md:text-4xl">Why Choose Us?</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {WHY_CHOOSE.map((item) => (
            <div key={item.title} className="text-center">
              <span className="badge-stamp mx-auto flex h-16 w-16 items-center justify-center border-gold/40 bg-forest text-ivory">
                <LeafIcon className="h-7 w-7" />
              </span>
              <p className="mt-4 font-display text-sm font-bold text-ink">{item.title}</p>
              <p className="mt-1 text-xs text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
