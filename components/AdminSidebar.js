"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LeafIcon } from "./Icons";
import Image from "next/image";
const NAV = [
  { href: "/admin", label: "Dashboard", icon: "▤" },
  { href: "/admin/products", label: "Products", icon: "🛍" },
  { href: "/admin/categories", label: "Categories", icon: "☰" },
  { href: "/admin/orders", label: "Orders", icon: "🧾" },
  { href: "/admin/inventory", label: "Inventory", icon: "📦" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex min-h-screen w-72 shrink-0 flex-col border-r border-gold/15 bg-forest text-ivory">      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold/40 bg-ivory shadow-md">
  <Image
    src="/images/logo.jpeg"
    alt="KMC Organic Farm Logo"
    fill
    className="object-cover"
  />
</div>
        <div>
          <p className="font-display text-base font-bold">KMC Admin</p>
          <p className="-mt-0.5 text-[10px] uppercase tracking-widest text-ivory/50">Organic Farm</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                active ? "bg-gold/90 text-forest-dark" : "text-ivory/75 hover:bg-ivory/10"
              }`}
            >
              <span className="w-4 text-center text-xs">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ivory/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ivory/75 transition hover:bg-ivory/10"
        >
          <span className="w-4 text-center text-xs">⏻</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
