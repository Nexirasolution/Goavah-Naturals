import Link from "next/link";
import { LeafIcon, PhoneIcon, WhatsappIcon, LocationIcon } from "./Icons";
import Image from "next/image";

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AmazonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.5 15.6c-1.9 1.4-4.6 2.1-6.9 2.1-3.3 0-6.2-1.2-8.4-3.2-.2-.2 0-.4.2-.3 2.4 1.4 5.3 2.2 8.3 2.2 2 0 4.3-.4 6.4-1.3.3-.1.6.2.4.5Z" />
      <path d="M15.3 14.6c-.2-.3-1.6-.2-2.2-.1-.2 0-.2-.2-.1-.3 1.1-.8 2.9-.5 3.1-.3.2.3-.1 2.1-1.1 3-.2.1-.3 0-.2-.2.2-.5.7-1.8.5-2.1Z" />
      <path d="M13.1 9.3v-.5c0-.3.2-.5.5-.5.9 0 1.6.4 1.6 1.9v3.5c0 .2.1.4.3.5.1.1.1.3 0 .4-.3.2-.7.5-.9.7-.1.1-.3.1-.4 0-.2-.2-.4-.4-.5-.5-.5.5-.9.7-1.6.7-.8 0-1.5-.5-1.5-1.6 0-.8.5-1.4 1.1-1.7.6-.3 1.4-.3 2-.4v-.1c0-.3 0-.6-.2-.8-.1-.2-.4-.3-.6-.3-.4 0-.8.2-.9.7 0 .2-.2.3-.3.3l-1.2-.1c-.2 0-.3-.2-.3-.4.3-1.4 1.5-1.8 2.6-1.8.6 0 1.3.2 1.7.5.5.5.4 1.1.4 1.5Zm-1.3 3.1c.3 0 .6-.1.8-.4.2-.3.2-.6.2-1v-.2c-.5 0-1.1.1-1.4.3-.3.2-.4.5-.4.8 0 .4.2.5.8.5Z" />
    </svg>
  );
}

function MeeshoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 8l8-4 8 4-8 4-8-4Z" />
      <path d="M4 8v8l8 4 8-4V8" />
      <path d="M12 12v8" />
    </svg>
  );
}

export default function Footer({ settings }) {
  const storeName = settings?.storeName || "KMC Iyarkai Creation";
  const phone = settings?.phone || "+91 8124128840";
  const whatsapp = settings?.whatsapp || "918124128840";
  const address = settings?.address || "Kallidaikurichi, Tirunelveli, Tamil Nadu";

  const instagram =
    settings?.instagram ||
    "https://www.instagram.com/kmc_organic_products?igsh=MWZncXMxN2xvMjMyMA==";
  const facebook =
    settings?.facebook || "https://www.facebook.com/share/1EPxhtXdps/?mibextid=wwXIfr";
  const amazon =
    settings?.amazon ||
    "https://www.amazon.in/b?ie=UTF8&node=27943762031&me=AW3M1SX9Q4BOW";
  const meesho = settings?.meesho || "https://www.meesho.com/KMCORGANICFARM?_ms=3.0.1";
  const youtube = settings?.youtube;

  const socialLinks = [
    { href: facebook, label: "Facebook", Icon: FacebookIcon },
    { href: instagram, label: "Instagram", Icon: InstagramIcon },
    { href: amazon, label: "Amazon", Icon: AmazonIcon },
    { href: meesho, label: "Meesho", Icon: MeeshoIcon },
    { href: youtube, label: "YouTube", Icon: null },
  ].filter((s) => s.href);

  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Column 1 - Brand & Contact */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            <Image
              src="/images/logo.jpeg"
              alt={`${storeName} Logo`}
              width={80}
              height={80}
              className="rounded-full object-contain"
            />

            <h2 className="text-2xl font-semibold">{storeName}</h2>
          </div>

          <p className="text-green-100 leading-relaxed max-w-md">
            Fresh and natural organic products directly from our farm.
            Healthy food with traditional farming methods.
          </p>

          <div className="mt-6 space-y-3 text-green-100">
            {phone && (
              <p className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5" />
                {phone}
              </p>
            )}

            {address && (
              <p className="flex items-center gap-2">
                <LocationIcon className="w-5 h-5" />
                {address}
              </p>
            )}

            {whatsapp && (
              
              <a  href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-300 transition"
              >
                <WhatsappIcon className="w-5 h-5" />
                WhatsApp Us
              </a>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-6 flex items-center gap-4 text-green-100">
              {socialLinks.map(({ href, label, Icon }) => (
                
                 <a key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="flex items-center gap-2 hover:text-green-300 transition text-sm font-medium"
                >
                  {Icon ? <Icon className="w-5 h-5" /> : null}
                  <span className={Icon ? "hidden sm:inline" : ""}>{label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-green-700 mt-10 pt-5 text-center text-sm text-green-200">
        <p>
          © {new Date().getFullYear()} {storeName}. All rights reserved.
        </p>

        <p className="mt-2">
          Developed &amp; Designed by{" "}
          
           <a href="https://www.nexirasolution.in/"
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