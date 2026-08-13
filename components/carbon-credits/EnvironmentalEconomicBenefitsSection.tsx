"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiZap } from "react-icons/fi";

/* Custom Line-Art Icons matching exact Figma screenshot */
function Icon1({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 24L24 10L38 24V40H10V24Z" />
      <path d="M18 26L22 30M22 30L26 26M22 30V40" />
      <path d="M14 20L20 14" />
      <path d="M28 14L34 20" />
      <circle cx="37" cy="11" r="3" />
      <path d="M37 5V6M43 11H42M37 17V16" />
      <path d="M8 12C9 10 11 10 12 11C13 10 15 10 16 11.5" />
    </svg>
  );
}

function IconCH4({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 44" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 30C8 30 5 26.5 5 22C5 17.5 8.5 14 13 14C14.5 9 19 6 24 6C29.5 6 34 10 35 15C39 15 42 18 42 22C42 26.5 39 30 35 30H12Z" />
      <text x="12" y="23.5" fill="currentColor" stroke="none" fontSize="12" fontWeight="bold" fontFamily="sans-serif">CH₄</text>
    </svg>
  );
}

function IconCompost({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="10" y="24" width="28" height="16" rx="3" />
      <path d="M10 32H38" />
      <path d="M16 24V40M32 24V40" />
      <path d="M18 18C18 12 24 10 24 10C24 10 30 12 30 18H18Z" />
      <path d="M24 10V18" />
      <circle cx="24" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconESG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M24 10V6M16 12L13 9M32 12L35 9" />
      <path d="M10 28L18 20L24 26L30 20L38 28" />
      <path d="M14 24L10 28L14 34L20 28L24 32L28 28L34 34L38 28L34 24" />
    </svg>
  );
}

function IconCircularBins({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 14C20 11 28 11 30 14" />
      <path d="M30 14L28 11M30 14L28 17" />
      <path d="M30 18C28 21 20 21 18 18" />
      <path d="M18 18L20 21M18 18L20 15" />
      <rect x="8" y="26" width="8" height="12" rx="2" />
      <rect x="20" y="26" width="8" height="12" rx="2" />
      <rect x="32" y="26" width="8" height="12" rx="2" />
    </svg>
  );
}

function IconCO2({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 26C8 26 5 22.5 5 18C5 13.5 8.5 10 13 10C14.5 5 19 2 24 2C29.5 2 34 6 35 11C39 11 42 14 42 18C42 22.5 39 26 35 26H12Z" />
      <text x="13" y="19" fill="currentColor" stroke="none" fontSize="11" fontWeight="bold" fontFamily="sans-serif">CO₂</text>
      <path d="M24 26V40M24 40L19 35M24 40L29 35" />
    </svg>
  );
}

function IconSoilRegen({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M24 34V20" />
      <path d="M24 20C24 20 18 14 12 18C12 24 24 26 24 26" />
      <path d="M24 20C24 20 30 14 36 18C36 24 24 26 24 26" />
      <path d="M16 38C20 42 28 42 32 38" />
      <path d="M32 38L30 35M32 38L29 40" />
      <path d="M32 32C28 28 20 28 16 32" />
      <path d="M16 32L18 35M16 32L19 30" />
      <path d="M8 16H14M11 13V19M34 16H40M37 13V19" />
    </svg>
  );
}

export default function EnvironmentalEconomicBenefitsSection() {
  const benefits = [
    {
      id: 1,
      icon: Icon1,
      text: "Reduction in greenhouse gas emissions.",
    },
    {
      id: 2,
      icon: IconCH4,
      text: "Prevention of methane generation from landfills.",
    },
    {
      id: 3,
      icon: IconCompost,
      text: "Production of high-quality organic compost.",
    },
    {
      id: 4,
      icon: IconESG,
      text: "Contribution toward corporate ESG goals and Net Zero commitments.",
    },
    {
      id: 5,
      icon: IconCircularBins,
      text: "Promotion of sustainable and circular waste management practices.",
    },
    {
      id: 6,
      icon: IconCO2,
      text: "Generation of carbon credits and additional financial returns.",
    },
    {
      id: 7,
      icon: IconSoilRegen,
      text: "Improved soil health and reduced dependence on chemical fertilizers.",
    },
  ];

  return (
    <section className="w-full bg-[#292929] text-white py-10 sm:py-14 px-6 sm:px-10 lg:px-12 overflow-hidden border-t border-neutral-800">
      <div className="max-w-[1440px] mx-auto space-y-8 sm:space-y-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2 max-w-[850px] mx-auto"
        >
          <h2
            className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#FAF6EE] tracking-tight leading-tight font-farro text-center"
            style={{
              textShadow: "0px 4px 10px rgba(0, 0, 0, 0.35), 0px 1px 3px rgba(0, 0, 0, 0.2)",
            }}
          >
            Environmental & Economic Benefits
          </h2>
        </motion.div>

        {/* Swiper Slider Row with overflow padding to prevent top clipping */}
        <div className="max-w-[1380px] mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={2}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 5, spaceBetween: 18 },
              1280: { slidesPerView: 7, spaceBetween: 16 },
            }}
            className="benefits-swiper !pt-2 !pb-10"
          >
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <SwiperSlide key={b.id} className="h-auto">
                  <div
                    className="bg-[#333333]/90 hover:bg-[#383838] border border-neutral-700/70 hover:border-[#69BD45] hover:shadow-[0_0_15px_rgba(105,189,69,0.25)] rounded-[18px] p-5 sm:p-6 flex flex-col items-center text-center justify-start h-full min-h-[210px] transition-all duration-300 group cursor-default"
                  >
                    {/* Top Cream Line-Art Icon matching screenshot */}
                    <div className="w-12 h-12 flex items-center justify-center mb-4 text-[#EBE4D5] transition-colors duration-300 group-hover:text-[#69BD45]">
                      <Icon className="w-9 h-9 stroke-[#EBE4D5] group-hover:stroke-[#69BD45] transition-colors duration-300" />
                    </div>

                    {/* Centered Text */}
                    <p className="text-xs sm:text-[12.5px] text-neutral-300 font-satoshi leading-relaxed font-normal text-center">
                      {b.text}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Bottom Dark Banner Box with Green Lightning Icon matching Figma */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[1380px] mx-auto bg-[#333333]/80 border border-neutral-700 text-white rounded-[20px] p-5 sm:p-6 sm:px-8 flex items-center gap-4 sm:gap-6 shadow-md"
        >
          {/* Green Lightning Icon */}
          <div className="shrink-0 p-1 text-[#69BD45]">
            <FiZap className="w-6 h-6 sm:w-7 sm:h-7 fill-[#69BD45]" />
          </div>

          {/* Text */}
          <p className="text-xs sm:text-sm lg:text-[13.5px] text-neutral-300 font-satoshi leading-relaxed font-normal">
            By Integrating Advanced Composting Technology With Carbon Credit Mechanisms, <strong className="text-white font-bold">Vikasit Ecosystems Pvt. Ltd.</strong> Enables Organizations, Municipalities, Institutions, And Industries To Transform Organic Waste Into Valuable Resources While Contributing To Global Climate Action And Creating Measurable Environmental And Economic Value.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
