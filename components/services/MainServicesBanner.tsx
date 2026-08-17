"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function MainServicesBanner() {
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
    <section className="relative w-full bg-[#EBE4D5] text-[#1A1A1A] overflow-hidden pt-[85px] sm:pt-[120px] pb-6 sm:pb-14">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6 sm:space-y-10"
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
            <span className="text-[#2E7D32]">SERVICES</span>
          </motion.div>

          {/* 2-Column Grid (Left Text + Right Blended Image Box) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              {/* Tagline */}
              <motion.span
                variants={itemVariants}
                className="text-xs sm:text-sm font-semibold tracking-wider text-[#5A5A5C] uppercase block font-sans"
              >
                WASTE MANAGEMENT AS A SERVICE
              </motion.span>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold text-[#343433] tracking-tight leading-[1.08] font-farro"
              >
                Smart Waste <br className="hidden sm:inline" />
                Management <br className="hidden sm:inline" />
                <span className="font-normal text-[#343433]">Solutions.</span>
              </motion.h1>

              {/* Body Description */}
              <motion.p
                variants={itemVariants}
                className="text-neutral-700 text-sm sm:text-lg lg:text-[18px] font-medium leading-relaxed font-satoshi max-w-xl pt-1 sm:pt-2"
              >
                Helping Organisations transform organic waste into valuable resources through technology, engineering and expert consulting.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 sm:pt-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#2B2B2C] text-white hover:bg-black px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg group cursor-pointer font-sans"
                >
                  <span>Talk to Expert</span>
                  <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href="/contact?type=brochure"
                  className="inline-flex items-center justify-center border border-[#2B2B2C]/70 text-[#1A1A1A] hover:bg-[#2B2B2C] hover:text-white px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer font-sans"
                >
                  Download Brochure
                </a>
              </motion.div>
            </div>

            {/* Right Blended Image Container */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-6 relative w-full h-[280px] sm:h-[380px] lg:h-[460px] rounded-[24px] sm:rounded-[32px] overflow-hidden"
            >
              <Image
                src="/banner/service_banner.png"
                alt="Smart Waste Management Solutions Banner"
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

          {/* Bottom Feature Pill Badges Bar (2 Columns on Mobile, Flex on Desktop) */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-4 pt-2 sm:pt-4"
          >
            <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] xs:text-xs sm:text-sm font-bold shadow-sm font-sans hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default text-center flex items-center justify-center">
              Decentralized Waste Management
            </div>

            <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] xs:text-xs sm:text-sm font-bold shadow-sm font-sans hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default text-center flex items-center justify-center">
              The Soil Maker™ Technology
            </div>

            <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] xs:text-xs sm:text-sm font-bold shadow-sm font-sans hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default text-center flex items-center justify-center">
              Branded Organic Compost
            </div>

            <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] xs:text-xs sm:text-sm font-bold shadow-sm font-sans hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default text-center flex items-center justify-center">
              ESG & Carbon Credit Aligned
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
