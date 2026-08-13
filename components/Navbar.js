"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { LeafIcon, BagIcon } from "./Icons";
import { Search, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/track-order", label: "Track Order" },
];

function ShippingMarquee({ settings }) {
  const freeShipping = settings?.freeShipping ?? 999;

  const messages = [
    `🚚 FREE SHIPPING on orders above ₹${freeShipping}`,
    `🌿 Naturally & Traditionally Made`,
    `✅ Pan India Delivery`,
  ];

  const track = [...messages, ...messages];

  return (
    <div className="relative overflow-hidden bg-forest py-2 text-ivory">
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap px-4 text-xs font-semibold tracking-wide md:text-sm">
        {track.map((msg, idx) => (
          <span key={idx} className="flex items-center gap-2">
            {msg}
          </span>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 22s linear infinite;
        }
        .relative:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default function Navbar({ settings }) {
  const { count } = useCart();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const storeName = settings?.storeName || "Goavah Naturals";
  const [brand, tagline] = storeName.includes(" ")
    ? [storeName.split(" ")[0], storeName.split(" ").slice(1).join(" ")]
    : [storeName, ""];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <>
      <ShippingMarquee settings={settings} />

      <header className="sticky top-0 z-40 border-b border-gold/25 bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_rgba(139,74,32,0.06)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-gold/40 p-1">
              <Image
                src="/images/logo.png"
                alt={storeName}
                width={55}
                height={55}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            <div className="leading-tight">
              <h1 className="font-cormorant text-2xl font-bold uppercase italic text-forest">
                {brand}
              </h1>
              {tagline && (
                <p className="text-xs italic uppercase tracking-[0.25em] text-gold-dark">
                  {tagline}
                </p>
              )}
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l, idx) => (
              <span key={l.href} className="flex items-center gap-8">
                <Link
                  href={l.href}
                  className="font-body text-sm font-medium tracking-wide text-ink/80 transition hover:text-forest"
                >
                  {l.label}
                </Link>
                {idx < LINKS.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-gold/50" aria-hidden="true" />
                )}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center md:flex">
              {searchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center overflow-hidden rounded-full border border-gold/30 bg-white pl-4 pr-1 py-1.5 shadow-sm transition-all"
                >
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-48 bg-transparent text-sm outline-none placeholder:text-muted"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-ink/60 hover:bg-champagne"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-forest transition hover:bg-champagne"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-forest transition hover:bg-champagne md:hidden"
              aria-label="Search"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>

            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-forest transition hover:bg-champagne"
              aria-label="View cart"
            >
              <BagIcon className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta text-[10px] font-semibold text-ivory">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-gold/20 bg-ivory px-5 py-3 md:hidden">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 rounded-full border border-gold/30 bg-white px-4 py-2.5 shadow-sm"
            >
              <Search className="h-4 w-4 shrink-0 text-muted" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
            </form>
          </div>
        )}
      </header>
    </>
  );
}