import Link from "next/link";
import { LeafIcon, PhoneIcon, WhatsappIcon, LocationIcon } from "./Icons";
import Image from "next/image";

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 8124128840";
  const phone2 = process.env.NEXT_PUBLIC_CONTACT_PHONE_2 || "+91 7010032694";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "918124128840";
  const address =
    process.env.NEXT_PUBLIC_ADDRESS ||
    "Kallidaikurichi, Tirunelveli, Tamil Nadu";

  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Column 1 - Brand & Contact */}
        <div>
          <div className="flex items-center gap-4 mb-5">

  <Image
    src="/images/logo.jpeg"
    alt="KMC Organic Farm Logo"
    width={80}
    height={80}
    className="rounded-full object-contain"
  />

  <h2 className="text-2xl font-semibold">
    KMC Organic Farm
  </h2>

</div>

          <p className="text-green-100 leading-relaxed max-w-md">
            Fresh and natural organic products directly from our farm.
            Healthy food with traditional farming methods.
          </p>

          <div className="mt-6 space-y-3 text-green-100">

            <p className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5" />
              {phone}
            </p>

            <p className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5" />
              {phone2}
            </p>

            <p className="flex items-center gap-2">
              <LocationIcon className="w-5 h-5" />
              {address}
            </p>

            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-300 transition"
            >
              <WhatsappIcon className="w-5 h-5" />
              WhatsApp Us
            </a>

          </div>
        </div>


        {/* Column 2 - Quick Links */}
        <div className="md:pl-20">

          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-green-100">

            <li>
              <Link href="/" className="hover:text-green-300 transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-green-300 transition">
                Products
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-green-300 transition">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-green-300 transition">
                Contact
              </Link>
            </li>

            <li>
              <Link href="/track-order" className="hover:text-green-300 transition">
                Track Order
              </Link>
            </li>

          </ul>

        </div>

      </div>


      {/* Bottom Footer */}
      <div className="border-t border-green-700 mt-10 pt-5 text-center text-sm text-green-200">

        <p>
          © {new Date().getFullYear()} KMC Organic Farm. All rights reserved.
        </p>

        <p className="mt-2">
          Developed &amp; Designed by{" "}
          <a
            href="https://www.nexirasolution.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-green-300 hover:text-white hover:underline transition"
          >
            Nexira Solution
          </a>
        </p>

      </div>

    </footer>
  );
}