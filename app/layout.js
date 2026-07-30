import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BottomNav from "@/components/BottomNav";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "KMC Iyarkai Creation| Natural & Handmade Products",
  description:
    "KMC Iyarkai Creation — 100% natural, eco-friendly, handmade products from Kallidaikurichi, Tirunelveli.",
  icons: {
    icon: "/images/logo.jpeg",
    shortcut: "/images/logo.jpeg",
    apple: "/images/logo.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased pb-16 md:pb-0">
        <CartProvider>
          {children}

          {/* Floating WhatsApp Button */}
          <FloatingWhatsApp />

          {/* Bottom Nav (mobile only, hidden on /admin) */}
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}