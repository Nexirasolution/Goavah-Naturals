"use client";

import { WhatsappIcon } from "./Icons"; // Your existing icon

export default function FloatingWhatsApp() {
  const whatsapp = "919876543210"; // Replace with your WhatsApp number

  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a]"
      aria-label="Chat on WhatsApp"
    >
      <WhatsappIcon className="h-8 w-8" />
    </a>
  );
}