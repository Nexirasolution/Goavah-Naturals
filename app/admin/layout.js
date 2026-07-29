"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <div className="min-h-screen bg-ivory">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-champagne/40">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden px-6 py-8 md:px-10">{children}</main>
    </div>
  );
}
