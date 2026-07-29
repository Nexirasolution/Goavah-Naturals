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
    image: "/images/banner1.png",
    title: "Premium Handmade Collection",
    subtitle: "Beautiful handcrafted products made with love.",
  },
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
    <section className="relative h-[90vh] min-h-[650px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[90vh]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-6">
                  <div className="max-w-xl">

                    <h1 className="font-display text-[42px] md:text-[64px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                      {slide.title}
                    </h1>

                    <p className="mt-5 text-lg text-white/90">
                      {slide.subtitle}
                    </p>

                    <div className="mt-8 flex gap-4">
                      <Link
                        href="/products"
                        className="rounded-full bg-white px-8 py-4 font-semibold text-pink-600"
                      >
                        Shop Now
                      </Link>

                      <Link
                        href="/track-order"
                        className="rounded-full border border-white px-8 py-4 font-semibold text-white"
                      >
                        Track Order
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}