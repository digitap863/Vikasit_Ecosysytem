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
  // 4 Thumbnail Image options using the provided product banner images
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
      src: "/product/product_back.png",
      alt: "The Soil Maker Perspective View",
      cropClass: "object-contain scale-[1.05]",
      thumbStyle: "object-contain p-1",
    },
    {
      id: "view3",
      src: "/product/product_side.png",
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
    <section className="relative w-full bg-[#EBE4D5] text-[#1A1A1A] overflow-hidden pt-[95px] sm:pt-[115px] lg:pt-[130px] pb-10 sm:pb-16 lg:pb-20 min-h-0 lg:min-h-[720px] flex items-center">
      {/* 1. Desktop Only Background Image (Positioned on the Right) */}
      <div className="hidden lg:flex absolute inset-y-0 right-0 w-[48%] xl:w-[50%] items-center justify-end z-10 pointer-events-none overflow-hidden pt-36 lg:pt-40 pb-20 pr-8 xl:pr-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-[440px] xl:h-[500px]"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              loading="eager"
              className={`w-full h-full object-contain object-right ${activeImage.cropClass} transition-all duration-300 drop-shadow-2xl`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Main Foreground Container */}
      <div className="relative z-30 max-w-[1440px] w-full mx-auto px-5 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-full lg:max-w-[640px] xl:max-w-[700px] space-y-4 sm:space-y-6 w-full"
        >
          {/* Featured Product Tagline */}
          <motion.span
            variants={itemVariants}
            className="text-xs sm:text-sm font-semibold tracking-wider text-[#2E7D32] uppercase block font-sans"
          >
            FEATURED PRODUCT
          </motion.span>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl xs:text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-extrabold text-[#1A1A1A] tracking-tight leading-[1.08] font-farro drop-shadow-sm"
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
            className="text-neutral-700 text-sm sm:text-base leading-relaxed font-sans max-w-[620px]"
          >
            Our flagship composting machine, one of a kind. Soil Maker converts
            organic waste into usable compost in just 3–4 hours, powered by an
            in-house proprietary bioculture agent that&apos;s the catalyst behind the
            speed.
          </motion.p>

          {/* Body Paragraph 2 */}
          <motion.p
            variants={itemVariants}
            className="text-neutral-700 text-sm sm:text-base leading-relaxed font-sans max-w-[620px]"
          >
            Built for real estate developers, facility managers, and apartment
            associations — Soil Maker ships in 17 capacities from 25 KG to 2500
            KG/day, so every site gets a model sized to its actual waste volume,
            not the nearest oversized fit.
          </motion.p>

          {/* 3. Mobile/Tablet In-Flow Product Image Showcase (< lg screens) */}
          <motion.div variants={itemVariants} className="block lg:hidden w-full my-6">
            <div className="relative w-full h-[240px] xs:h-[290px] sm:h-[360px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    priority
                    loading="eager"
                    className="object-contain object-center drop-shadow-xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Thumbnail Selector */}
            <div className="flex items-center justify-center gap-3 mt-4">
              {images.map((img, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={img.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative w-14 h-12 sm:w-18 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer shadow-sm ${
                      isSelected
                        ? "border-[#27272A] ring-2 ring-[#27272A]/20 scale-105 bg-white"
                        : "border-neutral-400/70 opacity-80 bg-[#E0D8C8]"
                    }`}
                    title={img.alt}
                    aria-label={img.alt}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      loading="eager"
                      className={`${img.thumbStyle} transition-transform duration-300`}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* 4. 6 Key Features Grid (2 Columns on mobile & desktop) */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-x-3 gap-y-4 pt-2 max-w-[620px]"
          >
            {features.map((feat, index) => (
              <div key={index} className="flex items-center gap-2.5 sm:gap-3.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#27272A] text-white flex items-center justify-center shrink-0 shadow-sm">
                  {feat.icon}
                </div>
                <div className="font-sans">
                  <p className="text-[11.5px] xs:text-xs sm:text-sm font-bold text-[#1A1A1A] leading-tight">
                    {feat.title}
                  </p>
                  {feat.subtitle && (
                    <p className="text-[11.5px] xs:text-xs sm:text-sm font-bold text-[#1A1A1A] leading-tight">
                      {feat.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* 5. Bottom Controls: Specs Dark Card & Desktop Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 w-full mt-6 lg:mt-8 z-40"
        >
          {/* Specs Dark Card */}
          <div className="bg-[#2B2B2C] text-white p-4 sm:p-5 rounded-2xl shadow-lg w-full max-w-full lg:max-w-[620px] flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center">
              {/* Stat 1 */}
              <div className="flex items-center gap-3">
                <TbBolt className="w-5 h-5 text-[#22C55E] shrink-0" />
                <div className="font-sans">
                  <p className="text-xs sm:text-sm font-bold sm:font-normal text-white leading-tight">
                    25–2500 Kg/Cycle
                  </p>
                  <p className="text-[11px] text-neutral-300 font-normal leading-tight">
                    High Capacity
                  </p>
                </div>
              </div>

              {/* Divider on sm+ */}
              <div className="hidden sm:block w-[1px] h-8 bg-white/25 justify-self-center" />

              {/* Stat 2 */}
              <div className="flex items-center gap-3">
                <TbBolt className="w-5 h-5 text-[#22C55E] shrink-0" />
                <div className="font-sans">
                  <p className="text-xs sm:text-sm font-bold sm:font-normal text-white leading-tight">
                    24–48 Hours
                  </p>
                  <p className="text-[11px] text-neutral-300 font-normal leading-tight">
                    Quick Composting
                  </p>
                </div>
              </div>

              {/* Divider on sm+ */}
              <div className="hidden sm:block w-[1px] h-8 bg-white/25 justify-self-center" />

              {/* Stat 3 */}
              <div className="flex items-center gap-3">
                <TbBolt className="w-5 h-5 text-[#22C55E] shrink-0" />
                <div className="font-sans">
                  <p className="text-xs sm:text-sm font-bold sm:font-normal text-white leading-tight">
                    Better Soil
                  </p>
                  <p className="text-[11px] text-neutral-300 font-normal leading-tight">
                    Better Tomorrow
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Thumbnail Selector (Hidden on mobile) */}
          <div className="hidden lg:flex items-center justify-end gap-3.5 shrink-0">
            {images.map((img, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={img.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative w-18 h-15 xl:w-20 xl:h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer shadow-sm ${
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
