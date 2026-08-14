"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function BrandedCompostSection() {
  const [activePill, setActivePill] = useState("Landscapers");

  const pills = [
    "Home gardening",
    "Landscapers",
    "Nurseries",
    "Organic Farms",
    "Plantation Projects",
    "Institutions",
    "Commercial Agriculture",
  ];

  const cards = [
    {
      id: "retail",
      title: "Retail Packs",
      description:
        "Ready for home gardeners and small growers — sized for shelf, with clear usage instructions on every bag.",
      image: "/product/vikasit_chakra.png",
    },
    {
      id: "institutional",
      title: "Institutional Packs",
      description:
        "Sized for schools, campuses, and municipal green spaces that need consistent volume, batch after batch.",
      image: "/product/vikasit_chakra.png",
    },
    {
      id: "bulk",
      title: "Bulk Agricultural Supply",
      description:
        "For organic farms, plantations, and commercial agriculture ordering compost at field scale.",
      image: "/product/vikasit_chakra.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <section className="w-full bg-[#EBE4D5] text-[#1A1A1A] py-12 sm:py-16 lg:py-20 overflow-hidden border-t border-[#E0D8C8]/60">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12 sm:space-y-16">
        {/* Top Split Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* Left Text Block */}
          <motion.div variants={itemVariants} className="lg:col-span-7 max-w-[608px] space-y-5">
            {/* Tagline */}
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#5A5A5C] uppercase block font-sans">
              BRANDED COMPOST PRODUCTS
            </span>

            {/* Main Title */}
            <h2
              className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#343433] tracking-tight leading-[1.12] font-farro"
              style={{
                textShadow: "0px 4px 10px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.15)",
              }}
            >
              From Processed Waste To Market-Ready Product.
            </h2>

            {/* Description */}
            <p className="text-neutral-700 text-sm sm:text-base lg:text-[15.5px] font-satoshi font-normal leading-relaxed">
              We convert processed organic waste into professionally packaged, market-ready soil enhancement products under our own brand — each with application guidance, quality parameters, and usage recommendations.
            </p>

            {/* Target Audience / Usage Pill Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              {pills.map((pill) => {
                const isActive = activePill === pill;
                return (
                  <button
                    key={pill}
                    onClick={() => setActivePill(pill)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-sans transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#2B2B2C] text-white shadow-md border border-[#2B2B2C]"
                        : "border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent hover:bg-[#2B2B2C] hover:text-white"
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Right Product Image Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex items-center justify-center lg:justify-end"
          >
            <div className="hidden sm:block relative w-full max-w-[473px] h-[320px] sm:h-[380px] lg:h-[399px] flex items-center justify-center">
              <Image
                src="/Services/vikasit_chakra_group.png"
                alt="Vikasit Chakra Branded Compost Products"
                width={473}
                height={399}
                priority
                className="w-full h-full object-contain filter drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Cards Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={containerVariants}
          className="w-full max-w-[934px] mx-auto pt-2"
        >
          {/* Desktop View: 3-Column Grid */}
          <div className="hidden md:grid grid-cols-3 gap-5 sm:gap-6">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard card={card} />
              </motion.div>
            ))}
          </div>

          {/* Mobile View: Swiper Carousel */}
          <div className="block md:hidden pb-2">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1.15}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="pb-12 !px-1"
            >
              {cards.map((card) => (
                <SwiperSlide key={card.id} className="h-auto">
                  <ProductCard card={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ card }: { card: any }) {
  return (
    <div className="bg-white rounded-[22px] overflow-hidden shadow-md border border-neutral-200/80 flex flex-col justify-between group hover:shadow-xl transition-shadow min-h-[283px] h-full cursor-pointer">
      {/* Top Dark Header Box with Product Image */}
      <div className="bg-[#2B2B2C] h-[145px] sm:h-[155px] relative flex items-center justify-center p-4">
        <div className="relative w-[110px] h-[115px] transition-transform duration-300 group-hover:scale-105">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-contain filter drop-shadow-md"
          />
        </div>
      </div>

      {/* Bottom White Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-start space-y-2 font-sans">
        <h3 className="text-base sm:text-[17px] font-extrabold text-[#1A1A1A] font-farro tracking-tight leading-snug">
          {card.title}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
          {card.description}
        </p>
      </div>
    </div>
  );
}
