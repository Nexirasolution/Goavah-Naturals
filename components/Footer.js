import Image from "next/image";
import Link from "next/link";
import { LeafIcon, PhoneIcon, WhatsappIcon, LocationIcon } from "./Icons";

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 8124128840";
  const phone2 = process.env.NEXT_PUBLIC_CONTACT_PHONE_2 || "+91 7010032694";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "918124128840";
  const address = process.env.NEXT_PUBLIC_ADDRESS || "Kallidaikurichi, Tirunelveli, Tamil Nadu";

  return (
    <footer className="mt-20 border-t border-gold/20 bg-forest text-ivory/90">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-gold/40 bg-ivory/10">
    <Image
      src="/images/favicon.jpeg"
      alt="KMC Organic Farm Logo"
      fill
      className="object-cover"
    />
  </div>

  <p className="font-display text-xl font-bold">
    KMC Organic Farm
  </p>
</div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/70">
              Nature&rsquo;s goodness, handcrafted with care for a better tomorrow. Premium handmade
              products, eco-friendly and sustainable.
            </p>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold-light">
              Shop
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/70">
              <li><Link href="/products" className="hover:text-gold-light">All Products</Link></li>
              <li><Link href="/track-order" className="hover:text-gold-light">Track Order</Link></li>
              <li><Link href="/cart" className="hover:text-gold-light">Cart</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold-light">
              Why Choose Us
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/70">
              <li>100% Handmade by Skilled Artisans</li>
              <li>Eco-Friendly &amp; Sustainable</li>
              <li>Premium Quality, Carefully Crafted</li>
              <li>Pan India Delivery</li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold-light">
              Contact Us
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ivory/70">
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 shrink-0 text-gold-light" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-gold-light">{phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 shrink-0 text-gold-light" />
                <a href={`tel:${phone2.replace(/\s/g, "")}`} className="hover:text-gold-light">{phone2}</a>
              </li>
              <li className="flex items-center gap-2">
                <WhatsappIcon className="h-4 w-4 shrink-0 text-gold-light" />
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-2">
                <LocationIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="leaf-divider my-8 opacity-40" />

       <div className="text-center text-xs text-ivory/50 space-y-2">
  <p>
    &copy; {new Date().getFullYear()} KMC Organic Farm. From Nature &bull; Crafted with Care &bull;
    Delivered with Trust.
  </p>

  <p>
    Developed &amp; Designed by{" "}
    <a
      href="https://www.nexirasolution.in/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-gold-light transition hover:text-white hover:underline"
    >
      Nexira Solution
    </a>
  </p>
</div>
      </div>
    </footer>
  );
}
