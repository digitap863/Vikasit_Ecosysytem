"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function MobileHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  return (
    <section className="block sm:hidden relative w-full bg-[#ede3d3] pt-[80px] pb-8 overflow-hidden">
      {/* Ambient Radial Soft Glow */}
      <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-[#e89b74]/20 rounded-full blur-[90px] pointer-events-none z-0" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 flex flex-col w-full"
      >
        {/* Top Text Block */}
        <div className="w-full px-6 max-w-[440px] mx-auto flex flex-col text-left mb-1">
          {/* Sub-header / Tagline */}
          <motion.span
            variants={itemVariants}
            className="text-[11px] xs:text-xs font-semibold tracking-wider uppercase text-[#5a5a5a] mb-2 font-farro inline-block"
          >
            Regenerative Waste Infrastructure
          </motion.span>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="font-farro text-[32px] xs:text-[36px] font-bold text-[#262626] leading-[1.12] mb-3 tracking-tight"
          >
            Turning Today&apos;s<br />
            Waste Into<br />
            Tomorrow&apos;s Soil
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p
            variants={itemVariants}
            className="font-farro text-[#3d3d3d] text-[13.5px] xs:text-[14.5px] leading-[1.55] font-normal"
          >
            Vikasit Ecosystems builds a circular economy for organic waste proprietary composting technology, end-to-end services and consulting for a cleaner, waste-free India.
          </motion.p>
        </div>

        {/* Middle Image Block (Full-Bleed, image extends down under buttons) */}
        <motion.div
          variants={itemVariants}
          className="relative w-full aspect-[1.05/1] -mb-14 xs:-mb-18 z-0"
        >
          {/* Top Sky Smooth Blend Mask */}
          <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#ede3d3] via-[#ede3d3]/50 to-transparent pointer-events-none z-10" />

          <Image
            src="/banner/mobile_banner_green.png"
            alt="Vikasit Composter Machine in Green Field"
            fill
            priority
            className="object-cover object-center w-full"
          />

          {/* Bottom Grass/Soil Smooth Blend Mask */}
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#ede3d3] via-[#ede3d3]/85 to-transparent pointer-events-none z-10" />
        </motion.div>

        {/* Action Buttons Block (Overlapping on top of the image bottom/soil area) */}
        <motion.div
          variants={itemVariants}
          className="relative z-20 w-full px-6 max-w-[440px] mx-auto flex flex-col gap-3 font-farro pt-1 pb-1"
        >
          <Button
            href="/products"
            variant="dark"
            showArrow
            size="lg"
            className="w-full !rounded-full py-3.5 text-sm font-semibold justify-center shadow-xl bg-[#262626] text-white"
          >
            Explore Products
          </Button>

          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="w-full !rounded-full py-3.5 text-sm font-semibold justify-center border-[#2B2B2C] text-[#1A1A1A] bg-[#ede3d3]/90 backdrop-blur-sm"
          >
            Download Brochure
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
