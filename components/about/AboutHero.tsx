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
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#ebe4d5] min-h-[380px] sm:min-h-[430px] flex items-center p-6 mb-8 sm:p-10 lg:p-12"
    >
      {/* Right Background Image - seamlessly blended with blog banner gradient style */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] pointer-events-none overflow-hidden rounded-r-3xl sm:rounded-r-[36px]">
        <Image
          src="/banner/about_page_banner.png"
          alt="We Turn Waste Into Working Infrastructure Banner"
          fill
          priority
          className="object-cover object-right"
        />
        {/* Soft Left Edge Blend */}
        <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-[#ebe4d5] via-[#ebe4d5]/40 to-transparent z-10" />
        <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#ebe4d5]/20 via-transparent to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-[#ebe4d5]/20 via-transparent to-transparent z-10" />
      </div>

      {/* Left Text Content Container */}
      <div className="relative z-20 max-w-[620px] space-y-6">
        
        {/* Sub-Header Category Tag */}
        <motion.span 
          variants={itemVariants}
          className="text-xs sm:text-sm font-bold tracking-widest text-neutral-500 uppercase block font-sans"
        >
          WHO WE ARE
        </motion.span>

        {/* Main Heading with Staggered Alignment */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.1] font-farro"
        >
          We Turn Waste Into<br />
          <span className="font-extrabold">Working</span><br />
          <span className="font-normal text-neutral-800">Infrastructure.</span>
        </motion.h1>

        {/* Descriptive Body Paragraph */}
        <motion.p 
          variants={itemVariants}
          className="text-neutral-700 text-sm sm:text-base leading-relaxed font-sans max-w-[510px]"
        >
          Vikasit Ecosystems is building a bubble of life through waste management. We&apos;re a circular-economy channel that treats today&apos;s waste as tomorrow&apos;s raw material — closed loop, proprietary tech, end to end.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 pt-2 font-sans"
        >
          {/* Primary Action Button */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2.5 bg-[#2c2d2c] hover:bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span>Meet the Team</span>
            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Secondary Action Button */}
          <button
            onClick={handleDownloadBrochure}
            className="inline-flex items-center gap-2 border border-[#2c2d2c] text-[#2c2d2c] hover:bg-[#2c2d2c]/10 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <FiDownload className="w-4 h-4" />
            <span>Download Brochure</span>
          </button>
        </motion.div>

      </div>
    </motion.section>
  );
}
