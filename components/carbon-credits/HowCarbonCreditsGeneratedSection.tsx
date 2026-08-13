"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { 
  FiShield, 
  FiTruck, 
  FiTrash2, 
  FiSun, 
  FiRefreshCw, 
  FiAward,
  FiZap 
} from "react-icons/fi";

export default function HowCarbonCreditsGeneratedSection() {
  const items = [
    {
      id: 1,
      icon: FiShield,
      text: (
        <>
          Preventing methane emissions from landfills through aerobic composting.
        </>
      ),
    },
    {
      id: 2,
      icon: FiTruck,
      text: (
        <>
          Reducing transportation emissions by processing waste at the source.
        </>
      ),
    },
    {
      id: 3,
      icon: FiTrash2,
      text: (
        <>
          Avoiding emissions associated with landfill operations and open dumping.
        </>
      ),
    },
    {
      id: 4,
      icon: FiSun,
      text: (
        <>
          Producing organic compost that replaces chemical fertilizers, further reducing lifecycle greenhouse gas emissions.
        </>
      ),
    },
    {
      id: 5,
      icon: FiRefreshCw,
      text: (
        <>
          Supporting a circular economy by returning valuable nutrients to the soil.
        </>
      ),
    },
    {
      id: 6,
      icon: FiAward,
      text: (
        <>
          Each verified ton of greenhouse gas emissions avoided or removed is equivalent to one <strong className="font-bold text-[#343433]">Carbon Credit, 1 tCO₂e</strong>
        </>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#EBE4D5] text-[#1A1A1A] py-12 sm:py-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-10 sm:space-y-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 max-w-[850px] mx-auto"
        >
          {/* Main Title with Figma Text Shadow Effect */}
          <h2
            className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-[#343433] tracking-tight leading-tight font-farro text-center"
            style={{
              textShadow: "0px 4px 10px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.15)",
            }}
          >
            How Carbon Credits Are Generated
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-600 font-satoshi font-normal text-sm sm:text-base text-center max-w-xl mx-auto pt-1">
            Sustainable waste management projects can generate carbon credits by:
          </p>
        </motion.div>

        {/* 6-Column Swiper Carousel */}
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
              1024: { slidesPerView: 4, spaceBetween: 18 },
              1280: { slidesPerView: 6, spaceBetween: 16 },
            }}
            className="how-credits-swiper !pt-2 !pb-10"
          >
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <SwiperSlide key={item.id} className="h-auto">
                  <div
                    className="flex flex-col items-center text-center justify-start h-full min-h-[220px] p-2 cursor-default group"
                  >
                    {/* Top Dark Icon Box matching screenshot */}
                    <div className="w-13 h-13 bg-[#343433] text-white rounded-[16px] flex items-center justify-center mb-5 shadow-md transition-all duration-300 group-hover:bg-[#2E7D32] group-hover:shadow-[0_0_12px_rgba(46,125,50,0.35)]">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Centered Text */}
                    <p className="text-xs sm:text-[13px] text-neutral-700 font-satoshi leading-relaxed font-normal text-center max-w-[200px]">
                      {item.text}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Bottom Dark Notice Banner Box with Green Lightning Icon matching Figma */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[1380px] mx-auto bg-[#343433] text-white rounded-[22px] p-6 sm:p-7 sm:px-10 flex items-center gap-4 sm:gap-6 shadow-lg border border-neutral-700/50"
        >
          {/* Green Lightning Icon */}
          <div className="shrink-0 p-1 text-[#69BD45]">
            <FiZap className="w-7 h-7 sm:w-8 sm:h-8 fill-[#69BD45]" />
          </div>

          {/* Text */}
          <p className="text-xs sm:text-sm lg:text-[14.5px] text-neutral-200 font-satoshi leading-relaxed font-normal">
            These Credits Can Be Certified Under Recognized Carbon Standards And Traded In Voluntary Or Compliance Carbon Markets, Creating An Additional Revenue Stream For Waste Management Projects.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
