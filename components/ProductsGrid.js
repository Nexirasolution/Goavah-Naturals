"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { CATEGORY_ICONS, LeafIcon } from "./Icons";

export default function ProductsGrid({ initialCategory, initialSearch }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory || "");
  const [search, setSearch] = useState(initialSearch || "");

  useEffect(() => {
    fetch("/api/categories?activeOnly=true")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ activeOnly: "true" });
    if (activeCategory) params.set("category", activeCategory);
    if (search) params.set("search", search);

    fetch(`/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .finally(() => setLoading(false));
  }, [activeCategory, search]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("")}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              activeCategory === ""
                ? "border-forest bg-forest text-ivory"
                : "border-gold/30 text-ink/70 hover:bg-champagne"
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.icon] || LeafIcon;
            return (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  activeCategory === cat._id
                    ? "border-forest bg-forest text-ivory"
                    : "border-gold/30 text-ink/70 hover:bg-champagne"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gold/30 bg-white px-5 py-2.5 text-sm outline-none focus:border-forest md:w-64"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-xl2 bg-champagne/60" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-lg text-forest">No products found</p>
          <p className="mt-1 text-sm text-muted">Try a different category or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}