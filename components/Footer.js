import Link from "next/link";
import { LeafIcon, PhoneIcon, WhatsappIcon, LocationIcon } from "./Icons";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaAmazon } from "react-icons/fa6";

// Wraps a real brand glyph (from react-icons) in a correctly colored circle badge.
function BrandBadge({ children, background, className }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full text-white ${className}`}
      style={{ background }}
    >
      {children}
    </span>
  );
}

function FacebookIcon({ className }) {
  return (
    <BrandBadge background="#1877F2" className={className}>
      <FaFacebookF className="w-[52%] h-[52%]" />
    </BrandBadge>
  );
}

function InstagramIcon({ className }) {
  return (
    <BrandBadge
      background="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"
      className={className}
    >
      <FaInstagram className="w-[62%] h-[62%]" />
    </BrandBadge>
  );
}

function AmazonIcon({ className }) {
  return (
    <BrandBadge background="#232F3E" className={className}>
      <FaAmazon className="w-[58%] h-[58%]" style={{ color: "#FF9900" }} />
    </BrandBadge>
  );
}

function MeeshoIcon({ className }) {
  return (
    <BrandBadge background="#F43397" className={className}>
      <span className="font-black italic" style={{ fontSize: "1.1em", lineHeight: 1 }}>
        M
      </span>
    </BrandBadge>
  );
}

export default function Footer({ settings }) {
  const storeName = settings?.storeName || "Abi Foods & Oils";
  const phone = settings?.phone || "+91 9344936684";
  const whatsapp = settings?.whatsapp || "919344936684";
  const address = settings?.address || "Kosakattur, Kodumudi, Erode, Tamil Nadu";
  const email = settings?.email || "abifoodsandoils@gmail.com";

  // No public social/marketplace links provided yet — leave blank until settings supply them.
  const instagram = settings?.instagram || "";
  const facebook = settings?.facebook || "";
  const amazon = settings?.amazon || "";
  const meesho = settings?.meesho || "";
  const youtube = settings?.youtube;

  const socialLinks = [
    { href: facebook, label: "Facebook", Icon: FacebookIcon },
    { href: instagram, label: "Instagram", Icon: InstagramIcon },
    { href: amazon, label: "Amazon", Icon: AmazonIcon },
    { href: meesho, label: "Meesho", Icon: MeeshoIcon },
    { href: youtube, label: "YouTube", Icon: null },
  ].filter((s) => s.href);

  return (
    <footer className="bg-forest-dark text-ivory py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Column 1 - Brand & Contact */}
        <div>
          <div className="flex flex-col items-center gap-3 mb-5 text-center md:items-start md:text-left">
            <Image
              src="/images/logo.png"
              alt={`${storeName} Logo`}
              width={80}
              height={80}
              className="rounded-full object-contain"
            />

            <h2 className="text-2xl font-semibold uppercase italic">{storeName}</h2>
          </div>

          <p className="text-champagne leading-relaxed max-w-md">
            Fresh, traditionally made oils and food products from Erode.
            Cold-pressed marachekku oils and natural home-style powders.
          </p>

          <div className="mt-6 space-y-3 text-champagne">
            {phone && (
              <p className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5" />
                {phone}
              </p>
            )}

            {email && (
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center">✉</span>
                {email}
              </p>
            )}

            {address && (
              <p className="flex items-center gap-2">
                <LocationIcon className="w-5 h-5" />
                {address}
              </p>
            )}

            {settings?.gst && (
              <p className="text-sm text-champagne/70">GST No: {settings.gst}</p>
            )}

            {settings?.msme && (
              <p className="text-sm text-champagne/70">MSME Registration: {settings.msme}</p>
            )}

            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold-light transition"
              >
                <WhatsappIcon className="w-5 h-5" />
                WhatsApp Us
              </a>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-6 flex items-center gap-5">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="flex flex-col items-center gap-1 text-champagne hover:text-gold-light hover:-translate-y-0.5 transition-transform text-xs font-medium"
                >
                  {Icon ? (
                    <Icon className="w-12 h-12 drop-shadow-md" />
                  ) : (
                    <span className="w-11 h-11 flex items-center justify-center rounded-full bg-terracotta text-white text-[10px] font-bold">
                      YT
                    </span>
                  )}
                  <span>{label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gold/20 mt-10 pt-5 text-center text-sm text-champagne/70">
        <p>
          © {new Date().getFullYear()} {storeName}. All rights reserved.
        </p>

        <p className="mt-2">
          Developed &amp; Designed by{" "}
          <a
            href="https://www.nexirasolution.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold-light hover:text-ivory hover:underline transition"
          >
            Nexira Solution
          </a>
        </p>
      </div>
    </footer>
  );
}