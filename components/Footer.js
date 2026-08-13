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
  const storeName = settings?.storeName || "Goavah Naturals";
  const phone = settings?.phone || "+91 9626200999";
  const whatsapp = settings?.whatsapp || "919626200999";
  const address = settings?.address || "Zamin Uthukuli, Pollachi, Coimbatore District, Tamil Nadu - 642004";
  const email = settings?.email || "goavahnaturals@gmail.com";

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
    <footer className="overflow-x-hidden border-t border-gold/30 bg-forest-dark text-ivory">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 sm:py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Column 1 - Brand & Contact */}
        <div>
          <div className="flex flex-col items-center gap-3 mb-5 text-center md:items-start md:text-left">
            <div className="rounded-full border-2 border-dashed border-gold/40 bg-white p-1.5">
              <Image
                src="/images/logo.png"
                alt={`${storeName} Logo`}
                width={80}
                height={80}
                className="h-16 w-16 rounded-full object-contain sm:h-20 sm:w-20"
              />
            </div>

            <h2 className="font-cormorant text-xl font-bold uppercase italic sm:text-2xl">{storeName}</h2>
          </div>

          <p className="font-body text-champagne leading-relaxed max-w-md text-center text-sm sm:text-left sm:text-base">
            Herbal, natural &amp; spiritual essentials &mdash; handcrafted in small
            batches using traditional recipes, from Pollachi, Coimbatore.
          </p>

          <div className="mt-6 space-y-3 font-body text-champagne text-sm sm:text-base">
            {phone && (
              <p className="flex min-w-0 items-center justify-center gap-2 sm:justify-start">
                <PhoneIcon className="w-5 h-5 text-gold-light shrink-0" />
                <span className="break-words">{phone}</span>
              </p>
            )}

            {email && (
              <p className="flex min-w-0 items-center justify-center gap-2 sm:justify-start">
                <span className="w-5 h-5 flex items-center justify-center text-gold-light shrink-0">✉</span>
                <span className="min-w-0 break-all">{email}</span>
              </p>
            )}

            {address && (
              <p className="flex min-w-0 items-start justify-center gap-2 sm:justify-start">
                <LocationIcon className="w-5 h-5 text-gold-light shrink-0 mt-0.5" />
                <span className="min-w-0 break-words">{address}</span>
              </p>
            )}

            {settings?.gst && (
              <p className="text-sm text-champagne/70 text-center sm:text-left">GST No: {settings.gst}</p>
            )}

            {settings?.msme && (
              <p className="text-sm text-champagne/70 text-center sm:text-left">MSME Registration: {settings.msme}</p>
            )}

            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 hover:text-gold-light transition sm:justify-start"
              >
                <WhatsappIcon className="w-5 h-5 shrink-0" />
                WhatsApp Us
              </a>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 md:justify-start">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="flex flex-col items-center gap-1 font-body text-champagne hover:text-gold-light hover:-translate-y-0.5 transition-transform text-xs font-medium"
                >
                  {Icon ? (
                    <Icon className="w-11 h-11 sm:w-12 sm:h-12 drop-shadow-md" />
                  ) : (
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-terracotta text-white text-[10px] font-bold">
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
      <div className="border-t border-gold/20 px-4 py-5 text-center text-sm text-champagne/70">
        <p className="font-body">
          © {new Date().getFullYear()} {storeName}. All rights reserved.
        </p>

        <p className="mt-2 font-body">
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