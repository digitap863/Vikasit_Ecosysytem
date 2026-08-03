"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#ebe4d5] min-h-[460px] sm:min-h-[520px] flex items-center p-8 sm:p-14 lg:p-16"
    >
      {/* Right Background Image - seamlessly blended */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] pointer-events-none overflow-hidden rounded-r-3xl sm:rounded-r-[36px]">
        <Image
          src="/blog_banner.png"
          alt="Notes From The Waste-To-Soil Frontier Banner"
          fill
          priority
          className="object-cover object-right"
        />
        <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#ebe4d5] via-[#E6DFD3]/85 to-transparent z-10" />
        <div className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-[#ebe4d5]/40 via-transparent to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-[#ebe4d5]/40 via-transparent to-transparent z-10" />
      </div>

      {/* Left Text Content */}
      <div className="relative z-20 max-w-[620px] space-y-4">
        <span className="text-xs sm:text-sm font-bold tracking-wider text-neutral-500 uppercase block font-sans">
          WASTE MANAGEMENT AS A SERVICE
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.1] font-farro">
          Notes From The<br />
          <span className="font-normal">Waste-To-Soil Frontier.</span>
        </h1>

        <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-sans max-w-[480px]">
          Field notes, policy explainers, and product deep-dives from the team building India&apos;s organic-waste infrastructure.
        </p>
      </div>
    </motion.section>
  );
}
