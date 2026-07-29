"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { LeafIcon, BagIcon } from "./Icons";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/track-order", label: "Track Order" },
];

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpeg"
            alt="KMC Iyarkai Creation"
            width={55}
            height={55}
            priority
            className="h-12 w-12 object-contain"
          />

          <div className="leading-tight">
            <h1 className="font-display text-xl font-bold text-forest">
              KMC
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-muted">
              Iyarkai Creation
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/80 transition hover:text-forest"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
          <button
  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 md:hidden"
  onClick={() => setOpen(!open)}
  aria-label="Toggle menu"
>
  <div className="flex flex-col justify-between h-4 w-5">
    <span
      className={`block h-0.5 w-5 bg-ink transition-all duration-300 ${
        open ? "translate-y-[7px] rotate-45" : ""
      }`}
    />
    <span
      className={`block h-0.5 w-5 bg-ink transition-all duration-300 ${
        open ? "opacity-0" : ""
      }`}
    />
    <span
      className={`block h-0.5 w-5 bg-ink transition-all duration-300 ${
        open ? "-translate-y-[7px] -rotate-45" : ""
      }`}
    />
  </div>
</button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-gold/20 bg-ivory px-5 py-3 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 text-sm font-medium text-ink/80 hover:bg-champagne"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
