"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image: "/images/banner2.png",
    title: "Eco Friendly Products",
    subtitle: "Natural, sustainable and artisan-made creations.",
  },
  {
    image: "/images/banner3.png",
    title: "Traditional Craftsmanship",
    subtitle: "Supporting local artisans across India.",
  },
  {
    image: "/images/banner4.png",
    title: "Exclusive Handmade Bags",
    subtitle: "Elegant woven bags for every occasion.",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative h-[260px] sm:h-[350px] md:h-[500px] lg:h-[650px] hero-slider">
      <Swiper
        className="h-full"
        modules={[Navigation, Pagination, Autoplay]}
        navigation={false}
        breakpoints={{
          768: {
            navigation: true,
          },
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
                  <div className="max-w-xs sm:max-w-md md:max-w-xl">
                    <h1 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="mt-3 text-sm text-white/90 sm:text-base md:text-lg">
                      {slide.subtitle}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href="/products"
                        className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory transition hover:bg-forest-light md:px-8 md:py-3"
                      >
                        Shop Now
                      </Link>

                      {/* <Link
                        href="/track-order"
                        className="rounded-full border border-white px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black md:px-8 md:py-3"
                      >
                        Track Order
                      </Link> */}
                    </div>
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
          background: #c9a227; /* gold */
          opacity: 1;
        }
        .hero-slider .swiper-button-next,
        .hero-slider .swiper-button-prev {
          color: #c9a227; /* gold */
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