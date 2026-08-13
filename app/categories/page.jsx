// app/categories/page.jsx
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/settings";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 24;

const PROMO_TILES = [
  { label: "Shop All", sub: "Every product", href: "/products", tone: "bg-forest" },
  { label: "Best Sellers", sub: "Customer favorites", href: "/products?featured=true", tone: "bg-gold-dark" },
  { label: "Your Cart", sub: "Review & checkout", href: "/cart", tone: "bg-champagne" },
  { label: "Track Order", sub: "Where's my order", href: "/track-order", tone: "bg-ink" },
];

async function getCategories() {
  await connectDB();
  const categories = await Category.find({ isActive: true })
    .sort({ sortOrder: 1, name: 1 })
    .lean();
  return JSON.parse(JSON.stringify(categories));
}

export const metadata = {
  title: "Shop by Category | Goavah Naturals",
  description: "Browse all product categories — natural food products and spiritual products.",
};

export default async function CategoriesPage({ searchParams }) {
  const { page: pageParam } = await searchParams;
  const allCategories = await getCategories();
  const settings = await getSettings();

  const totalPages = Math.max(1, Math.ceil(allCategories.length / PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, parseInt(pageParam || "1", 10) || 1),
    totalPages
  );

  const start = (currentPage - 1) * PAGE_SIZE;
  const categories = allCategories.slice(start, start + PAGE_SIZE);

  return (
    <>
      <Navbar settings={settings} />

      <section className="border-b border-gold/15 px-5 py-6 md:px-8 md:py-8">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">
          Browse
        </p>
        <h1 className="mt-1 font-display text-2xl italic text-forest md:text-3xl">
          All Categories
        </h1>
      </section>

      {allCategories.length === 0 ? (
        <p className="px-5 py-14 text-center text-muted">
          Categories will appear here once added from the admin panel.
        </p>
      ) : (
        <>
          {/* Flat list, mega-menu style */}
          <nav aria-label="Category list" className="px-5 md:px-8">
            <Link
              href="/products"
              className="flex items-center justify-between border-b border-gold/15 py-4 transition hover:bg-champagne/20 md:py-5"
            >
              <span className="font-display text-lg italic text-forest md:text-xl">
                All Products
              </span>
              <Plus className="h-5 w-5 shrink-0 text-gold-dark" strokeWidth={2} />
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products?category=${cat._id}`}
                className="flex items-center justify-between border-b border-gold/15 py-4 transition hover:bg-champagne/20 md:py-5"
              >
                <span className="font-display text-lg italic text-forest md:text-xl">
                  {cat.name}
                </span>
                <Plus className="h-5 w-5 shrink-0 text-gold-dark" strokeWidth={2} />
              </Link>
            ))}
          </nav>

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}

          {/* Promo tile strip */}
          <section className="mt-8 border-t border-gold/15 bg-champagne/15 px-5 py-6 md:px-8 md:py-8">
            <div className="flex gap-4 overflow-x-auto pb-1">
              {PROMO_TILES.map((tile) => (
                <Link
                  key={tile.label}
                  href={tile.href}
                  className={`group flex h-28 w-28 shrink-0 flex-col justify-end overflow-hidden p-3 shadow-soft transition hover:opacity-90 md:h-32 md:w-36 ${tile.tone}`}
                >
                  <span
                    className={`font-display text-sm italic leading-tight md:text-base ${
                      tile.tone === "bg-champagne" ? "text-ink" : "text-ivory"
                    }`}
                  >
                    {tile.label}
                  </span>
                  <span
                    className={`mt-0.5 font-body text-[10px] leading-tight ${
                      tile.tone === "bg-champagne" ? "text-ink/60" : "text-ivory/70"
                    }`}
                  >
                    {tile.sub}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <Footer settings={settings} />
    </>
  );
}

function Pagination({ currentPage, totalPages }) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2 px-4">
      <PageLink
        page={currentPage - 1}
        disabled={currentPage === 1}
        label="‹ Prev"
      />

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 font-body text-sm text-muted">
            …
          </span>
        ) : (
          <PageLink key={p} page={p} active={p === currentPage} label={p} />
        )
      )}

      <PageLink
        page={currentPage + 1}
        disabled={currentPage === totalPages}
        label="Next ›"
      />
    </nav>
  );
}

function PageLink({ page, label, active, disabled }) {
  if (disabled) {
    return (
      <span className="rounded-full px-4 py-2 font-body text-sm font-medium text-muted/40">
        {label}
      </span>
    );
  }

  return (
    <Link
      href={page <= 1 ? "/categories" : `/categories?page=${page}`}
      className={`rounded-full border px-4 py-2 font-body text-sm font-medium transition ${
        active
          ? "border-gold/40 bg-forest text-ivory"
          : "border-gold/20 text-ink/70 hover:bg-champagne"
      }`}
    >
      {label}
    </Link>
  );
}

function getPageNumbers(current, total) {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let last;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (last) {
      if (i - last === 2) {
        rangeWithDots.push(last + 1);
      } else if (i - last > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    last = i;
  }

  return rangeWithDots;
}