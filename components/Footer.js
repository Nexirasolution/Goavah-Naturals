import Link from "next/link";
import { LeafIcon, PhoneIcon, WhatsappIcon, LocationIcon } from "./Icons";
import Image from "next/image";

export default function Footer({ settings }) {
  const storeName = settings?.storeName || "KMC Iyarkai Creation";
  const phone = settings?.phone || "+91 8124128840";
  const whatsapp = settings?.whatsapp || "918124128840";
  const address = settings?.address || "Kallidaikurichi, Tirunelveli, Tamil Nadu";
  const instagram = settings?.instagram;
  const facebook = settings?.facebook;
  const youtube = settings?.youtube;

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

            <h2 className="text-2xl font-semibold">
              {storeName}
            </h2>

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
              
               <a href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-300 transition"
              >
                <WhatsappIcon className="w-5 h-5" />
                WhatsApp Us
              </a>
            )}

          </div>

          {(instagram || facebook || youtube) && (
            <div className="mt-6 flex items-center gap-4 text-green-100">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition text-sm font-medium">
                  Instagram
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition text-sm font-medium">
                  Facebook
                </a>
              )}
              {youtube && (
                <a href={youtube} target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition text-sm font-medium">
                  YouTube
                </a>
              )}
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