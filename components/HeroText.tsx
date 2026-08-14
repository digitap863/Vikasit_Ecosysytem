"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";

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
        <Button href="/products" variant="dark" showArrow size="lg">
          Explore Products
        </Button>
        <Button href="/contact" variant="outline" size="lg">
          Download Brochure
        </Button>
      </motion.div>
    </motion.div>
  );
}
