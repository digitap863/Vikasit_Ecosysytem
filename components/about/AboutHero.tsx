"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";

export default function AboutHero() {
  const handleDownloadBrochure = () => {
    const link = document.createElement("a");
    link.href = "/banner/about_page_banner.png";
    link.download = "Vikasit_About_Brochure.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <span className="text-[#2E7D32]">ABOUT US</span>
          </motion.div>

          {/* 2-Column Grid matching all other page banners */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              {/* Category Tag */}
              <motion.span
                variants={itemVariants}
                className="text-xs sm:text-sm font-semibold tracking-wider text-[#5A5A5C] uppercase block font-sans"
              >
                WHO WE ARE
              </motion.span>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                style={{ textShadow: "0px 3px 8px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.1)" }}
                className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold text-[#343433] tracking-tight leading-[1.08] font-farro"
              >
                We Turn Waste Into <br />
                <span className="font-extrabold">Working</span> <br />
                <span className="font-normal text-neutral-800">Infrastructure.</span>
              </motion.h1>

              {/* Descriptive Body Paragraph */}
              <motion.p
                variants={itemVariants}
                className="text-neutral-700 text-sm sm:text-lg lg:text-[18px] font-medium leading-relaxed font-satoshi max-w-xl pt-1 sm:pt-2"
              >
                Vikasit Ecosystems is building a bubble of life through waste management. We&apos;re a circular-economy channel that treats today&apos;s waste as tomorrow&apos;s raw material — closed loop, proprietary tech, end to end.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 sm:pt-4 font-sans"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#343433] text-white hover:bg-black px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg group cursor-pointer"
                >
                  <span>Meet the Team</span>
                  <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={handleDownloadBrochure}
                  className="inline-flex items-center justify-center border border-[#343433] text-[#343433] hover:bg-[#343433] hover:text-white px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer gap-2"
                >
                  <FiDownload className="w-4 h-4" />
                  <span>Download Brochure</span>
                </button>
              </motion.div>
            </div>

            {/* Right Blended Image Container - Fully visible right side without overflow clipping */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-6 relative w-full h-[280px] sm:h-[380px] lg:h-[460px] rounded-[24px] sm:rounded-[32px] overflow-hidden"
            >
              <Image
                src="/banner/about_page_banner.png"
                alt="We Turn Waste Into Working Infrastructure Banner"
                fill
                priority
                className="object-cover object-right filter brightness-[1.02]"
              />

              {/* Multi-Directional Soft Gradient Overlay - Blends left & bottom into #EBE4D5 background */}
              <div className="absolute inset-y-0 left-0 w-[40%] sm:w-[35%] bg-gradient-to-r from-[#EBE4D5] via-[#EBE4D5]/70 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-[#EBE4D5] via-[#EBE4D5]/40 to-transparent z-10 pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
