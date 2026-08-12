"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WmaasBanner() {
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
    <section className="relative w-full bg-[#EBE4D5] text-[#1A1A1A] overflow-hidden pt-[100px] sm:pt-[120px] pb-12 sm:pb-16">
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
            <span className="text-[#2E7D32]">WMAAS</span>
          </motion.div>

          {/* 2-Column Grid (Left Text + Right Blended Image Box) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-6  pt-1 sm:pt-2">
              {/* Tagline */}
              <motion.span
                variants={itemVariants}
                className="text-xs sm:text-sm font-normal tracking-wider text-[#5A5A5C] uppercase block font-sans"
              >
                AN INNOVATIVE SERVICE MODEL BY VIKASIT ECOSYSTEMS
              </motion.span>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-extrabold text-[#343433] tracking-tight leading-[1.08] font-farro"
              >
                Waste Management
                <br />
                <span className="font-normal text-[#343433]">
                  As A Service
                </span>
              </motion.h1>

              {/* Body Description */}
              <motion.p
                variants={itemVariants}
                className="text-neutral-700 text-base sm:text-lg lg:text-[18px] font-medium leading-relaxed font-satoshi max-w-[620px] pt-5"
              >
                <span>WMAAS™ </span> is VIKASIT ECOSYSTEMS&apos;
                decentralized, subscription-based waste management solution that manages
                your entire waste ecosystem. Powered by{" "}
                <span>THE SOIL MAKER™ </span>, we handle
                everything from source segregation and on-site processing to resource
                recovery, compliance, and reporting—helping you reduce costs, achieve ESG
                goals, and turn waste into valuable resources.
              </motion.p>
            </div>

            {/* Right Blended Image Container (Rounded box with smooth left gradient blend) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-6 relative w-full h-[320px] sm:h-[400px] lg:h-[460px] rounded-[24px] sm:rounded-[32px] overflow-hidden"
            >
              <Image
                src="/banner/wmas.png"
                alt="Waste Management As A Service Eco Truck"
                fill
                priority
                className="object-cover object-center filter brightness-[1.02]"
              />

              {/* Soft Left Gradient Overlay blending inside the container */}
              <div className="absolute inset-y-0 left-0 w-[38%] sm:w-[45%] bg-gradient-to-r from-[#EBE4D5] via-[#EBE4D5]/65 to-transparent z-10 pointer-events-none" />
            </motion.div>
          </div>

          {/* Bottom 3 Feature Pill Badges Bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* Pill 1 */}
            <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-sm font-sans shrink-0 hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default">
              Zero CAPEX, subscription-based
            </div>

            {/* Pill 2 */}
            <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-md font-sans shrink-0  transition-colors cursor-default hover:bg-[#2B2B2C] hover:text-white">
              Powered by THE SOIL MAKER™
            </div>

            {/* Pill 3 */}
            <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-sm font-sans shrink-0 hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default">
              SWM Rules · PCB · NGT aligned
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
