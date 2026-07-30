"use client";

import { usePathname } from "next/navigation";
import { WhatsappIcon } from "./Icons"; // Your existing icon

export default function FloatingWhatsApp() {
  const whatsapp = "919876543210"; // Replace with your WhatsApp number
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    
     <a href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] md:bottom-6 md:right-6 md:h-14 md:w-14"
      aria-label="Chat on WhatsApp"
    >
      <WhatsappIcon className="h-6 w-6 md:h-8 md:w-8" />
    </a>
  );
}