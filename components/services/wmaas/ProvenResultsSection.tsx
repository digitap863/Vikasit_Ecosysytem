"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ProvenResultsSection() {
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

  const caseStudies = [
    {
      id: "res-township",
      category: "RESIDENTIAL COMMUNITY",
      title: "1,250–Unit Township",
      subtitle: "1,100+ kg mixed waste generated daily",
      image: "/Services/wmas1.png",
      alt: "1,250-Unit Township Residential Community",
      badgeIcon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2" />
          <path d="M10 22v-4h4v4" />
        </svg>
      ),
      challenge:
        "High transportation costs, pest issues, and inconsistent municipal collection across the township.",
      solution:
        "A complete decentralized system — THE SOIL MAKER™, source segregation, resident awareness, trained operators, and daily monitoring.",
      results: [
        "100% of wet waste processed on-site",
        "50+ tonnes of organic waste diverted from landfill every year",
        "₹25 Lakhs saved annually in transportation & disposal costs",
      ],
    },
    {
      id: "corporate-campus",
      category: "IT TECHNOLOGY PARK",
      title: "Corporate Campus",
      subtitle: "4.5 tonnes waste generated daily",
      image: "/Services/wmas2.png",
      alt: "Corporate Campus IT Technology Park",
      badgeIcon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-3" />
          <path d="M9 9h1M9 13h1M9 17h1" />
        </svg>
      ),
      challenge:
        "~3,000 kg kitchen waste and 300 kg garden waste daily, driving high transportation expenses and environmental concerns.",
      solution:
        "Deployment of a 3 TPD THE SOIL MAKER™ decentralized processing system, fully managed by Vikasit Ecosystems.",
      results: [
        "~₹25 Lakhs saved annually",
        "~25 tonnes of organic compost produced every month",
        "Compost reused for landscaping & community green spaces",
        "Significant cut in landfill waste and carbon emissions",
      ],
    },
  ];

  return (
    <section className="w-full bg-[#EBE4D5] text-[#1A1A1A] py-4 sm:py-8 lg:py-10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6 sm:space-y-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="text-center space-y-2.5 max-w-[800px] mx-auto"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs sm:text-sm font-semibold tracking-wider text-[#5A5A5C] uppercase block font-sans"
          >
            PROVEN RESULTS
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#343433] tracking-tight leading-[1.12] font-farro"
          >
            What WMAAS™
            <br />
            <span className="font-normal text-[#343433]">
              Looks Like On The Ground.
            </span>
          </motion.h2>
        </motion.div>

        {/* Desktop View: 2 Case Study Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="hidden lg:grid max-w-[1440px] mx-auto grid-cols-2 gap-8 sm:gap-10 lg:gap-12"
        >
          {caseStudies.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <CaseStudyCard item={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View: Swiper Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="block lg:hidden max-w-[1440px] mx-auto pb-2"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={18}
            slidesPerView={1.05}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-12 !px-1"
          >
            {caseStudies.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <CaseStudyCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudyCard({ item }: { item: any }) {
  return (
    <div className="flex flex-col space-y-5 group h-full">
      {/* Image Box with Floating Badge */}
      <div className="relative w-full h-[175px] sm:h-[195px] lg:h-[204px] rounded-t-[20px] overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {/* Green Building Icon Badge overlapping bottom left */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#044D29] border-2 border-white/90 flex items-center justify-center text-white shadow-lg">
          {item.badgeIcon}
        </div>
      </div>

      {/* Content Details */}
      <div className="space-y-4 px-1 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <span className="text-[11px] sm:text-xs font-normal tracking-wider text-[#343433] uppercase block font-sans">
              {item.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#343433] font-farro tracking-tight mt-0.5">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[#343433] font-satoshi mt-0.5">
              {item.subtitle}
            </p>
          </div>

          {/* Challenge */}
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-[#343433] font-satoshi">
              Challenge
            </h4>
            <p className="text-xs sm:text-sm text-[#343433] font-satoshi leading-relaxed">
              {item.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-[#343433] font-satoshi">
              WMAAS™ Solution
            </h4>
            <p className="text-xs sm:text-sm text-[#343433] font-satoshi leading-relaxed">
              {item.solution}
            </p>
          </div>

          {/* Results */}
          <div className="space-y-1.5 pt-1">
            <h4 className="text-sm sm:text-base font-bold text-[#343433] font-farro">
              Results
            </h4>
            <ul className="space-y-1 text-xs sm:text-sm text-[#343433] font-sans leading-relaxed">
              {item.results.map((res: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#343433] font-bold">•</span>
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
