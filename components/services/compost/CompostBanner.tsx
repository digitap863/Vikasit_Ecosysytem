"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CompostBanner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative w-full bg-[#EBE4D5] text-[#1A1A1A] overflow-hidden pt-[85px] sm:pt-[120px] pb-4 sm:pb-12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6 sm:space-y-8"
        >
          {/* Top Breadcrumb Line */}
          <motion.div
            variants={itemVariants}
            className="text-xs font-bold tracking-widest text-[#2E7D32] uppercase font-sans flex items-center gap-1.5"
          >
            <Link href="/" className="hover:underline">
              HOME
            </Link>
            <span className="text-neutral-400 font-normal">|</span>
            <Link href="/services" className="hover:underline">
              SERVICES
            </Link>
            <span className="text-neutral-400 font-normal">|</span>
            <span className="text-[#2E7D32]">COMPOST</span>
          </motion.div>

          {/* 2-Column Grid (Left Text + Right Blended Image Box) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-6 pt-1 sm:pt-2">
              {/* Tagline */}
              <motion.span
                variants={itemVariants}
                className="text-xs sm:text-sm font-normal tracking-wider text-[#5A5A5C] uppercase block font-sans"
              >
                THE COMPOST VALUE CHAIN
              </motion.span>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-extrabold text-[#343433] tracking-tight leading-[1.08] font-farro"
              >
                From Waste To Wealth.{" "}
                <br className="hidden sm:inline" />
                <span className="font-normal text-[#343433]">
                  Building A Circular Carbon Economy
                </span>
              </motion.h1>

              {/* Body Description */}
              <motion.p
                variants={itemVariants}
                className="text-neutral-700 text-sm sm:text-lg lg:text-[18px] font-medium leading-relaxed font-satoshi max-w-2xl pt-4 sm:pt-5"
              >
                Our responsibility doesn&apos;t end with organic waste processing. We
                manage the complete compost value chain — from scientific
                conversion of organic waste to quality assurance, soil-specific
                fortification, branded packaging, and sustainable distribution.
                Through WMAAS™ and THE SOIL MAKER™, waste from communities,
                institutions, and businesses becomes high-quality organic compost
                that supports agriculture, horticulture, landscaping, and soil
                regeneration.
              </motion.p>
            </div>

            {/* Right Blended Image Container */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-6 relative w-full h-[280px] sm:h-[380px] lg:h-[460px] rounded-[24px] sm:rounded-[32px] overflow-hidden"
            >
              <Image
                src="/banner/compost_banner.png"
                alt="Vikasit Organic Compost Agriculture Soil Banner"
                fill
                priority
                className="object-cover object-center filter brightness-[1.02]"
              />

              {/* Multi-Directional Soft Gradient Overlay - Blends seamlessly into #EBE4D5 background */}
              <div className="absolute inset-y-0 left-0 w-[55%] sm:w-[50%] bg-gradient-to-r from-[#EBE4D5] via-[#EBE4D5]/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#EBE4D5] via-[#EBE4D5]/50 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#EBE4D5]/30 to-transparent z-10 pointer-events-none" />
            </motion.div>
          </div>

          {/* Bottom 4 Feature Pill Badges Bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* Pill 1 */}
            <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-sm font-sans shrink-0 hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default">
              Soil Maker™
            </div>

            {/* Pill 2 */}
            <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-sm font-sans shrink-0 hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default">
              Quality Compost
            </div>

            {/* Pill 3 */}
            <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-sm font-sans shrink-0 hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default">
              Soil Regeneration
            </div>

            {/* Pill 4 */}
            <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-sm font-sans shrink-0 hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default">
              Carbon Value
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
