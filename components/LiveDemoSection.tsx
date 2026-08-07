"use client";

import Image from "next/image";
import Link from "next/link";

const LeafIcon = () => (
  <div className="shrink-0 w-5 h-5 relative flex items-center justify-center">
    <Image
      src="/leaf_icon.webp"
      alt="Leaf Icon"
      width={20}
      height={20}
      className="object-contain"
    />
  </div>
);

export default function LiveDemoSection() {
  return (
    <section className="w-full bg-[#eae4d6] py-6 md:py-10 px-4 sm:px-6 lg:px-12 relative overflow-hidden z-10">
      <div className="max-w-[1320px] mx-auto">
        {/* Main Banner Card (Stacked on mobile, background overlay on desktop) */}
        <div className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-none border border-[#c4beaf]/30 bg-[#fdfbf7] flex flex-col md:flex-row md:items-center justify-end p-0 md:p-14 lg:p-16 min-h-0 md:min-h-[560px]">
          
          {/* Mobile Image Container (visible on < md) */}
          <div className="relative w-full h-[220px] min-[440px]:h-[260px] sm:h-[300px] md:hidden overflow-hidden bg-neutral-200 select-none shrink-0">
            <Image
              src="/LiveDemo.webp"
              alt="See The Soil Maker In Action"
              fill
              priority
              className="object-cover object-left sm:object-center"
            />
          </div>

          {/* Desktop Background Image (visible on >= md) */}
          <div className="hidden md:block absolute inset-0 w-full h-full z-0 select-none">
            <Image
              src="/LiveDemo.webp"
              alt="See The Soil Maker In Action"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Content Layer (Padded on mobile, right-aligned on desktop) */}
          <div className="relative z-10 max-w-[560px] w-full md:ml-auto p-6 sm:p-8 md:p-0 space-y-5 sm:space-y-6">
            {/* Small Label */}
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500 font-farro block">
              LIVE DEMO
            </span>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold font-farro leading-[1.1] tracking-tight text-[#2a2d2a]">
              See The Soil Maker
              <span className="block text-[#005F15] font-normal">In Action.</span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-satoshi max-w-[500px]">
              Experience a live demonstration of the soil maker and witness how organic waste is
              transformed into nutrient-rich compost in just hours.
            </p>

            {/* Bullet Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-xs sm:text-[13px] font-medium font-farro text-neutral-800">
              <div className="flex items-center gap-2.5">
                <LeafIcon />
                <span>Live Machine Demonstration</span>
              </div>
              <div className="flex items-center gap-2.5">
                <LeafIcon />
                <span>Custom solution recommendation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <LeafIcon />
                <span>Organic waste assessment</span>
              </div>
              <div className="flex items-center gap-2.5">
                <LeafIcon />
                <span>Cost &amp; ROI analysis</span>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
              {/* Primary Dark Button with Animated Fill */}
              <Link
                href="#"
                className="group relative inline-flex items-center gap-2.5 bg-[#292d2a] border border-[#292d2a] rounded-full px-6 py-3 text-xs sm:text-sm font-semibold font-farro text-white overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span className="absolute inset-0 bg-[#045922] -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out rounded-full" />
                <span className="relative z-10">Book Your Demo</span>
                <span className="relative z-10 text-base leading-none transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              {/* Secondary Outline Button with Animated Fill */}
              <Link
                href="#"
                className="group relative inline-flex items-center gap-2.5 border border-[#292d2a] rounded-full px-6 py-3 text-xs sm:text-sm font-semibold font-farro text-[#292d2a] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span className="absolute inset-0 bg-[#292d2a] -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out rounded-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Watch 2 Minute Demo
                </span>
                <span className="relative z-10 text-xs transition-colors duration-300 group-hover:text-white">
                  ▷
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
