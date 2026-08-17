"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#ebe4d5] min-h-0 lg:min-h-[520px] flex flex-col lg:flex-row items-center p-6 sm:p-12 lg:p-16 mb-8 sm:mb-12"
    >
      {/* Desktop Background Image (>= lg) */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[65%] pointer-events-none overflow-hidden rounded-r-[36px]">
        <Image
          src="/banner/blog_banner.webp"
          alt="Notes From The Waste-To-Soil Frontier Banner"
          fill
          priority
          className="object-cover object-right"
        />
        <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#ebe4d5] via-[#ebe4d5]/85 to-transparent z-10" />
        <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#ebe4d5]/40 via-transparent to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#ebe4d5]/40 via-transparent to-transparent z-10" />
      </div>

      {/* Left Text Content */}
      <div className="relative z-20 w-full max-w-full lg:max-w-[580px] space-y-3.5 sm:space-y-4 text-left">
        <span className="text-xs sm:text-sm font-bold tracking-wider text-neutral-500 uppercase block font-sans">
          WASTE MANAGEMENT AS A SERVICE
        </span>

        <h1
          className="text-3xl xs:text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.1] font-farro"
          style={{
            textShadow: "0px 3px 8px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          Notes From The<br />
          <span className="font-normal text-[#2d2d2d]">Waste-To-Soil Frontier.</span>
        </h1>

        <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-sans max-w-[480px]">
          Field notes, policy explainers, and product deep-dives from the team building India&apos;s organic-waste infrastructure.
        </p>
      </div>

      {/* Mobile/Tablet Image Container (< lg) - Matches About Hero Blending Card */}
      <div className="block lg:hidden relative w-full h-[260px] sm:h-[340px] mt-6 rounded-[24px] sm:rounded-[32px] overflow-hidden z-10">
        <Image
          src="/banner/blog_banner.webp"
          alt="Notes From The Waste-To-Soil Frontier Banner"
          fill
          priority
          className="object-cover object-center filter brightness-[1.02]"
        />

        {/* Multi-Directional Soft Gradient Overlay matching About Hero */}
        <div className="absolute inset-y-0 left-0 w-[45%] sm:w-[35%] bg-gradient-to-r from-[#ebe4d5] via-[#ebe4d5]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#ebe4d5] via-[#ebe4d5]/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#ebe4d5]/30 to-transparent z-10 pointer-events-none" />
      </div>
    </motion.section>
  );
}
