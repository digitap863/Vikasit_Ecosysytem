"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbLeaf,
  TbSettings,
  TbShieldCheck,
  TbRecycle,
  TbBolt,
  TbChartBar,
} from "react-icons/tb";

export default function ProductBanner() {

  // 4 Thumbnail Image options using the provided product banner image
  const images = [
    {
      id: "view1",
      src: "/banner/product-page_banner.png",
      alt: "The Soil Maker Full Front View",
      cropClass: "object-contain scale-100",
      thumbStyle: "object-contain p-1",
    },
    {
      id: "view2",
      src: "/banner/product-page_banner.png",
      alt: "The Soil Maker Perspective View",
      cropClass: "object-contain scale-[1.05]",
      thumbStyle: "object-contain p-1",
    },
    {
      id: "view3",
      src: "/banner/product-page_banner.png",
      alt: "The Soil Maker Angle View",
      cropClass: "object-contain scale-[1.10]",
      thumbStyle: "object-contain p-1",
    },
    {
      id: "view4",
      src: "/banner/product-page_banner.png",
      alt: "The Soil Maker Overview",
      cropClass: "object-contain scale-[1.02]",
      thumbStyle: "object-contain p-1",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = images[selectedIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  const features = [
    {
      icon: <TbLeaf className="w-5 h-5 text-white" />,
      title: "100% Organic Waste",
      subtitle: "To Compost",
    },
    {
      icon: <TbSettings className="w-5 h-5 text-white" />,
      title: "Fully Automatic &",
      subtitle: "Efficient",
    },
    {
      icon: <TbShieldCheck className="w-5 h-5 text-white" />,
      title: "Odourless & Hygienic",
      subtitle: "",
    },
    {
      icon: <TbRecycle className="w-5 h-5 text-white" />,
      title: "Sustainable &",
      subtitle: "Eco-Friendly",
    },
    {
      icon: <TbBolt className="w-5 h-5 text-white" />,
      title: "Energy Efficient",
      subtitle: "Lower Power Usage",
    },
    {
      icon: <TbChartBar className="w-5 h-5 text-white" />,
      title: "Built for Durability",
      subtitle: "Low Maintenance",
    },
  ];

  return (
    <section className="relative w-full bg-[#EBE4D5] text-[#1A1A1A] overflow-hidden pt-[110px] sm:pt-[120px] pb-12 sm:pb-16 lg:pb-20 min-h-[640px] lg:min-h-[720px] flex items-center">
      {/* 1. Underlying Layer: Right Side Image (positioned lower down from top) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%] xl:w-[65%] flex items-end justify-end z-10 pointer-events-none overflow-hidden pt-36 sm:pt-44 lg:pt-56 xl:pt-64 pb-6 lg:pb-10 pr-4 lg:pr-12 xl:pr-16 translate-y-6 lg:translate-y-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-[380px] sm:h-[500px] lg:h-[620px] xl:h-[680px]"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              className={`w-full h-full object-contain object-right ${activeImage.cropClass} transition-all duration-300 drop-shadow-2xl lg:scale-110 xl:scale-115`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft Gradient Fade on Left Edge for Text Readability */}
        <div className="absolute inset-y-0 left-0 w-[35%] lg:w-[40%] bg-gradient-to-r from-[#EBE4D5] via-[#EBE4D5]/70 to-transparent z-20" />
      </div>

      {/* 2. Top Layer: Foreground Content Container */}
      <div className="relative z-30 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-[640px] xl:max-w-[700px] space-y-5 sm:space-y-6 w-full"
        >
          {/* Featured Product Tagline */}
          <motion.span
            variants={itemVariants}
            className="text-xs sm:text-sm font-normal tracking-widest text-[#2E7D32] uppercase block font-sans"
          >
            FEATURED PRODUCT
          </motion.span>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-extrabold text-[#1A1A1A] tracking-tight leading-[1.08] font-farro drop-shadow-md"
            style={{
              textShadow: "0px 3px 8px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            The Soil Maker
            <br />
            <span className="font-normal text-[#1A1A1A]">
              Organic Waste Converter
            </span>
          </motion.h1>

          {/* Body Paragraph 1 */}
          <motion.p
            variants={itemVariants}
            className="text-neutral-700 text-sm sm:text-base leading-relaxed font-sans max-w-[580px]"
          >
            Our flagship composting machine, one of a kind. Soil Maker converts
            organic waste into usable compost in just 3–4 hours, powered by an
            in-house proprietary bioculture agent that&apos;s the catalyst behind the
            speed.
          </motion.p>

          {/* Body Paragraph 2 */}
          <motion.p
            variants={itemVariants}
            className="text-neutral-700 text-sm sm:text-base leading-relaxed font-sans max-w-[580px]"
          >
            Built for real estate developers, facility managers, and apartment
            associations — Soil Maker ships in 17 capacities from 25 KG to 2500
            KG/day, so every site gets a model sized to its actual waste volume,
            not the nearest oversized fit.
          </motion.p>

          {/* 6 Key Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-[580px]"
          >
            {features.map((feat, index) => (
              <div key={index} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#27272A] text-white flex items-center justify-center shrink-0 shadow-sm">
                  {feat.icon}
                </div>
                <div className="font-sans">
                  <p className="text-xs sm:text-sm font-bold text-[#1A1A1A] leading-tight">
                    {feat.title}
                  </p>
                  {feat.subtitle && (
                    <p className="text-xs sm:text-sm font-bold text-[#1A1A1A] leading-tight">
                      {feat.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3. Combined Flex Row for Stats Dark Card & Thumbnail Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 w-full mt-6 lg:mt-8 z-40"
        >
          {/* Specs Dark Card */}
          <div className="bg-[#2B2B2C] text-white p-4 sm:p-5 rounded-2xl shadow-lg w-full sm:w-auto max-w-[580px] flex-1 flex items-center justify-between gap-3 shrink-0">
            {/* Stat 1 */}
            <div className="flex items-center gap-2.5">
              <TbBolt className="w-5 h-5 text-[#22C55E] shrink-0" />
              <div className="font-sans">
                <p className="text-xs sm:text-sm font-normal text-white leading-tight">
                  25–2500 Kg/Cycle
                </p>
                <p className="text-[10px] sm:text-[11px] text-white font-normal leading-tight">
                  High Capacity
                </p>
              </div>
            </div>

            <div className="w-[1px] h-8 bg-white shrink-0" />

            {/* Stat 2 */}
            <div className="flex items-center gap-2.5">
              <TbBolt className="w-5 h-5 text-[#22C55E] shrink-0" />
              <div className="font-sans">
                <p className="text-xs sm:text-sm font-normal text-white leading-tight">
                  24–48 Hours
                </p>
                <p className="text-[10px] sm:text-[11px] text-white font-normal leading-tight">
                  Quick Composting
                </p>
              </div>
            </div>

            <div className="w-[1px] h-8 bg-white shrink-0" />

            {/* Stat 3 */}
            <div className="flex items-center gap-2.5">
              <TbBolt className="w-5 h-5 text-[#22C55E] shrink-0" />
              <div className="font-sans">
                <p className="text-xs sm:text-sm font-normal text-white leading-tight">
                  Better Soil
                </p>
                <p className="text-[10px] sm:text-[11px] text-white font-normal leading-tight">
                  Better Tomorrow
                </p>
              </div>
            </div>
          </div>

          {/* Thumbnail Selector */}
          <div className="flex items-center justify-center lg:justify-end gap-3.5 w-full lg:w-auto shrink-0">
            {images.map((img, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={img.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative w-16 h-14 sm:w-20 sm:h-16 lg:w-22 lg:h-18 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer shadow-sm ${
                    isSelected
                      ? "border-[#27272A] ring-2 ring-[#27272A]/20 scale-105 bg-white"
                      : "border-neutral-400/80 hover:border-neutral-700 opacity-80 hover:opacity-100 bg-[#E0D8C8]"
                  }`}
                  title={img.alt}
                  aria-label={img.alt}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className={`${img.thumbStyle} transition-transform duration-300`}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
