"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ media, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex];
  const isVideo = (active?.type || active?.mediaType) === "video";

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-xl2 bg-champagne shadow-card">
        {isVideo ? (
          <video
            src={active.url}
            className="h-full w-full object-cover"
            controls
            autoPlay
            muted
            loop
          />
        ) : (
          <Image
            src={active.url}
            alt={productName}
            width={800}
            height={800}
            className="h-full w-full object-cover"
            priority
          />
        )}
      </div>

      {media.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {media.map((item, index) => {
            const itemIsVideo = (item.type || item.mediaType) === "video";
            return (
              <button
                key={item.publicId || index}
                onClick={() => setActiveIndex(index)}
                className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 ${
                  index === activeIndex ? "border-forest" : "border-transparent"
                }`}
              >
                {itemIsVideo ? (
                  <video src={item.url} className="h-full w-full object-cover" muted />
                ) : (
                  <Image src={item.url} alt={`${productName} ${index + 1}`} fill className="object-cover" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}