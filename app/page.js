import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { CATEGORY_ICONS, LeafIcon } from "@/components/Icons";
import HeroSlider from "@/components/HeroSlider";
import { ArrowRight } from "lucide-react";
import { getSettings } from "@/lib/settings";
import { getActiveBanners } from "@/lib/banners";

export const dynamic = "force-dynamic";

async function getData() {
  await connectDB();
  const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
  const bestSelling = await Product.find({ isActive: true, isFeatured: true })
    .populate("category", "name slug")
    .limit(8)
    .lean();
  return {
    categories: JSON.parse(JSON.stringify(categories)),
    bestSelling: JSON.parse(JSON.stringify(bestSelling)),
  };
}

const WHY_CHOOSE = [
  { title: "100% Natural", desc: "No chemicals, no synthetic additives" },
  { title: "Herbal & Ayurvedic", desc: "Traditional formulations, time-tested recipes" },
  { title: "Handmade in Small Batches", desc: "Crafted with care in Pollachi, Tamil Nadu" },
  { title: "Pan India Delivery", desc: "Safe & timely, everywhere" },
];

// Map your Category collection's `name` field (as entered in the admin panel)
// to a fallback image. Update these keys to match your actual category names.
const CATEGORY_IMAGES = {
  "Food Products": "/categroy/food-products.png",
  "Spiritual Products": "/categroy/spiritual-products.png",
};

export default async function HomePage() {
  // Run all three independently — categories/products stay live (force-dynamic),
  // banners are cached for 60s via unstable_cache so they don't hit Mongo every request.
  const [{ categories, bestSelling }, settings, banners] = await Promise.all([
    getData(),
    getSettings(),
    getActiveBanners(),
  ]);

  return (
    <>
      <Navbar settings={settings} />

      <HeroSlider initialSlides={banners} />

      {/* Rooted in tradition intro band */}
      <section className="border-y border-gold/20 bg-champagne/40">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 py-10 text-center md:px-8">
          <LeafIcon className="h-6 w-6 text-forest" />
          <h2 className="font-display text-2xl italic text-forest md:text-3xl">
            Rooted in Tradition, Crafted by Hand
          </h2>
          <p className="max-w-2xl font-body text-sm text-ink/70 md:text-base">
            Every Goavah Naturals product is made in small batches using time-tested
            Ayurvedic recipes &mdash; no shortcuts, no synthetic additives, just nature
            prepared with care.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Herbal &middot; Natural &middot; Spiritual
          </p>
          <h2 className="mt-2 font-display text-3xl italic text-forest md:text-4xl">
            Shop by Category
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-gold/40" />
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-muted">
            Categories will appear here once added from the admin panel.
          </p>
        ) : (
          <div
            className="flex snap-x snap-mandatory gap-x-4 overflow-x-auto scroll-smooth px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-x-6"
          >
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products?category=${cat._id}`}
                className="group flex shrink-0 snap-start flex-col items-center"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-double border-gold/50 bg-champagne p-1 shadow-soft transition group-hover:border-forest/50 md:h-28 md:w-28">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src={cat.image?.url || CATEGORY_IMAGES[cat.name] || "/categroy/default.png"}
                      alt={cat.name}
                      fill
                      sizes="(max-width:768px) 80px, 112px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <h3 className="mt-3 w-20 text-center font-body text-xs font-medium text-ink/80 transition group-hover:text-forest md:w-28 md:text-sm">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Best Selling products */}
      {bestSelling.length > 0 && (
        <section className="border-y border-gold/20 bg-champagne/40 py-16">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
                  Customer Favorites
                </p>
                <h2 className="mt-2 font-display text-3xl italic text-forest md:text-4xl">
                  Best Selling Products
                </h2>
              </div>
              <Link href="/products" className="hidden font-body text-sm font-semibold text-forest hover:underline md:block">
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {bestSelling.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3 font-body text-sm font-semibold italic text-white transition hover:bg-forest-light"
              >
                Shop Now
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Our Promise
          </p>
          <h2 className="mt-2 font-display text-3xl italic text-forest md:text-4xl">
            Why Choose Us?
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-gold/40" />
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {WHY_CHOOSE.map((item) => (
            <div key={item.title} className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-gold/50 bg-forest text-ivory">
                <LeafIcon className="h-7 w-7" />
              </span>
              <p className="mt-4 font-display text-sm font-bold italic text-ink">{item.title}</p>
              <p className="mt-1 font-body text-xs text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="border-t border-gold/20 bg-forest py-14 text-center text-ivory">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <h2 className="font-display text-2xl italic md:text-3xl">
            Bring Nature's Care Into Your Everyday
          </h2>
          <p className="mt-3 font-body text-sm text-ivory/80 md:text-base">
            Handmade skincare, wellness and spiritual essentials, delivered to your door.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ivory px-8 py-3 font-body text-sm font-semibold text-forest transition hover:bg-champagne"
          >
            Explore Products
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <Footer settings={settings} />
    </>
  );
}