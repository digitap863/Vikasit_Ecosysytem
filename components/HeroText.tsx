"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll parallax animation tracking
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -70]);
  const textOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  // Staggered child variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const, // Cubic bezier smooth ease-out
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ y: textY, opacity: textOpacity }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pointer-events-auto max-w-[695px] flex flex-col justify-between"
    >
      {/* Tagline / Sub-header */}
      <motion.span
        variants={itemVariants}
        className="text-xs md:text-sm font-semibold tracking-wider uppercase text-neutral-600 mb-3 font-farro inline-block"
      >
        Regenerative Waste Infrastructure
      </motion.span>

      {/* Main Title in Farro Font */}
      <motion.h1
        variants={itemVariants}
        className="font-farro text-3xl sm:text-5xl md:text-[60px] font-bold text-[#262626] leading-[1.08] mb-5 tracking-tight"
      >
        Turning Today&apos;s<br />
        Waste Into<br />
        Tomorrow&apos;s Soil
      </motion.h1>

      {/* Description Paragraph in Farro Font */}
      <motion.p
        variants={itemVariants}
        className="font-farro text-neutral-700 text-sm sm:text-base md:text-[18px] leading-[1.55] max-w-[620px] mb-8 font-normal"
      >
        Vikasit Ecosystems builds a circular economy for organic waste proprietary composting technology, end-to-end services and consulting for a cleaner, waste-free India.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-farro w-full sm:w-auto"
      >
        <button className="bg-[#2d2f2f] text-white px-7 py-3.5 rounded-full font-medium text-sm md:text-base flex items-center justify-center gap-3 hover:bg-black transition-all shadow-md group w-full sm:w-auto">
          Explore Products
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
        <button className="bg-[#f0eee8] text-[#2d2f2f] px-7 py-3.5 rounded-full font-medium text-sm md:text-base border border-neutral-300/80 hover:bg-[#e6e4dc] transition-all shadow-sm text-center w-full sm:w-auto">
          Download Brochure
        </button>
      </motion.div>
    </motion.div>
  );
}
