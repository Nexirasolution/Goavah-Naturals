"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { optimizedCloudinaryUrl } from "@/lib/cloudinaryUrl";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider({ initialSlides = [] }) {
  const [slides] = useState(initialSlides);

  if (!slides.length) return null;

  return (
    <section className="relative h-[260px] sm:h-[350px] md:h-[500px] lg:h-[650px] hero-slider">
      <Swiper
        className="h-full"
        modules={[Navigation, Pagination, Autoplay]}
        navigation={false}
        breakpoints={{
          768: { navigation: true },
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={slides.length > 1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide._id || index}>
            <div className="relative h-full w-full">
              {slide.image?.url ? (
                <Image
                  src={optimizedCloudinaryUrl(slide.image.url, { width: 1600 })}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-champagne" />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
                  <div className="max-w-xs sm:max-w-md md:max-w-xl">
                    <h1 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    {slide.subtitle && (
                      <p className="mt-3 text-sm text-white/90 sm:text-base md:text-lg">
                        {slide.subtitle}
                      </p>
                    )}

                    {slide.ctaText && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          href={slide.ctaLink || "/products"}
                          className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory transition hover:bg-forest-light md:px-8 md:py-3"
                        >
                          {slide.ctaText}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-slider .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.6;
          width: 9px;
          height: 9px;
        }
        .hero-slider .swiper-pagination-bullet-active {
          background: #c9a227;
          opacity: 1;
        }
        .hero-slider .swiper-button-next,
        .hero-slider .swiper-button-prev {
          color: #c9a227;
        }
        .hero-slider .swiper-button-next::after,
        .hero-slider .swiper-button-prev::after {
          font-size: 22px;
          font-weight: 700;
        }
      `}</style>
    </section>
  );
}