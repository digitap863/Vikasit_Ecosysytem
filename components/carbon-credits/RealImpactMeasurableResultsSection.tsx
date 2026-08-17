"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* Unified Database Compatible Interface for Future DB / Headless CMS Integration */
export interface ProjectCaseStudy {
  id: string;
  categoryTag: string;
  title: string;
  bannerImage: string;
  section1Title: string;
  section1Items: string[];
  section2Title: string;
  section2Items: string[];
  noticeBoxText?: string;
}

/* Dummy Project Showcasing Data Array (DB Compatible JSON Structure) */
const DUMMY_PROJECTS: ProjectCaseStudy[] = [
  {
    id: "proj-001",
    categoryTag: "Example :",
    title: "Real Impact. Measurable Results.",
    bannerImage: "/banner/compost_banner.png",
    section1Title: "Current Processing:",
    section1Items: [
      "Approximately 800kg/day of food waste",
      "About 962 tonnes/year of organic waste diverted from landfill",
    ],
    section2Title: "Environmental Benefits Include:",
    section2Items: [
      "Methane emissions avoided",
      "Compost production",
      "Reduced transportation emissions",
      "Cleaner environment",
      "Lower landfill burden",
    ],
    noticeBoxText:
      "With Proper Monitoring And Verification Under An Approved Carbon Standard, The Emissions Reductions From This Project Can Potentially Be Converted Into Tradable Carbon Credits.",
  },
  {
    id: "proj-002",
    categoryTag: "Example :",
    title: "Municipal Corporations",
    bannerImage: "/banner/carbon_credits_banner.webp",
    section1Title: "Processing Capacity & Waste Delivered:",
    section1Items: [
      "A Municipal Corporation Processing: 5 TONNES/DAY",
      "Annual Waste Delivered: = 1,825 TONNES/YEAR",
    ],
    section2Title: "Benefits:",
    section2Items: [
      "Large methane avoidance",
      "Lower landfill costs",
      "Reduced transportation",
      "Carbon credit potential",
      "Improved Swachh Bharat performance",
      "ESG reporting support",
    ],
  },
  {
    id: "proj-003",
    categoryTag: "Example :",
    title: "DLF, IT PARKS & COMMERCIAL CAMPUSES",
    bannerImage: "/banner/wmaas_banner.png",
    section1Title: "For Large Campuses:",
    section1Items: [
      "Hotels",
      "IT Parks",
      "Residential Communities",
      "Shopping Malls",
    ],
    section2Title: "THE SOIL MAKER Enables:",
    section2Items: [
      "On-site waste treatment",
      "Zero landfill organic waste",
      "Lower Scope 3 emissions (where applicable)",
      "Sustainability reporting",
      "Green building support",
      "Potential participation in voluntary carbon markets through aggregated projects.",
    ],
  },
];

export default function RealImpactMeasurableResultsSection({
  projects = DUMMY_PROJECTS,
}: {
  projects?: ProjectCaseStudy[];
}) {
  // Mobile Swiper State
  const [mobileActive, setMobileActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(scrollLeft / (clientWidth * 0.86));
      setMobileActive(Math.min(Math.max(0, idx), projects.length - 1));
    }
  };

  const scrollToMobileSlide = (idx: number) => {
    setMobileActive(idx);
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth * 0.86;
      scrollRef.current.scrollTo({
        left: cardWidth * idx,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#EBE4D5] text-[#1A1A1A] py-14 sm:py-20 overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-10 sm:space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 max-w-[950px] mx-auto"
        >
          <h2
            className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-[#343433] tracking-tight leading-tight font-farro text-center"
            style={{
              textShadow: "0px 4px 10px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.15)",
            }}
          >
            Real Impact. Measurable Results.
          </h2>
        </motion.div>

        {/* ==================== DESKTOP VIEW (>= 768px) ==================== */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-10 max-w-[1380px] mx-auto items-stretch">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-transparent rounded-[24px] flex flex-col justify-between cursor-default group"
            >
              {/* Top Banner Image with Rounded Corners */}
              <div className="relative w-full h-[200px] sm:h-[220px] rounded-[22px] overflow-hidden bg-neutral-800 shadow-md">
                <Image
                  src={project.bannerImage}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Card Body Content */}
              <div className="py-5 px-1 sm:px-2 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-normal text-neutral-500 tracking-wider block font-sans">
                    {project.categoryTag}
                  </span>

                  <h3 className="text-xl sm:text-[22px] font-extrabold text-[#343433] leading-snug font-farro">
                    {project.title}
                  </h3>

                  {/* Section 1 Items */}
                  <div className="space-y-2 pt-1 font-satoshi">
                    <p className="text-xs sm:text-sm font-bold text-[#343433] font-farro">
                      {project.section1Title}
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
                      {project.section1Items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-neutral-500 select-none font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 2 Items */}
                  <div className="space-y-2 pt-2 font-satoshi">
                    <p className="text-xs sm:text-sm font-bold text-[#343433] font-farro">
                      {project.section2Title}
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
                      {project.section2Items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-neutral-500 select-none font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Optional Footer Notice Box */}
                {project.noticeBoxText && (
                  <div className="mt-4 bg-[#8C867A]/35 border border-[#8C867A]/30 rounded-[16px] p-4 text-[11.5px] sm:text-xs text-[#343433] font-satoshi leading-relaxed font-medium">
                    {project.noticeBoxText}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ==================== MOBILE VIEW (< 768px - Touch/Swipe Swiper) ==================== */}
        <div className="md:hidden flex flex-col">
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6"
          >
            {projects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => scrollToMobileSlide(idx)}
                className="shrink-0 w-[86vw] max-w-[340px] snap-center bg-transparent rounded-[24px] flex flex-col justify-between cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full h-[190px] rounded-[20px] overflow-hidden bg-neutral-800 shadow-md">
                  <Image
                    src={project.bannerImage}
                    alt={project.title}
                    fill
                    className="object-cover object-center brightness-[0.95]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="py-4 px-1 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <span className="text-xs font-normal text-neutral-500 tracking-wider block font-sans">
                      {project.categoryTag}
                    </span>

                    <h3 className="text-lg font-extrabold text-[#343433] leading-snug font-farro">
                      {project.title}
                    </h3>

                    {/* Section 1 */}
                    <div className="space-y-1.5 pt-1 font-satoshi">
                      <p className="text-xs font-bold text-[#343433] font-farro">
                        {project.section1Title}
                      </p>
                      <ul className="space-y-1 text-xs text-neutral-700">
                        {project.section1Items.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-neutral-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-1.5 pt-1 font-satoshi">
                      <p className="text-xs font-bold text-[#343433] font-farro">
                        {project.section2Title}
                      </p>
                      <ul className="space-y-1 text-xs text-neutral-700">
                        {project.section2Items.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-neutral-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {project.noticeBoxText && (
                    <div className="mt-3 bg-[#8C867A]/35 border border-[#8C867A]/30 rounded-[14px] p-3 text.11px text-[#343433] font-satoshi leading-relaxed font-medium">
                      {project.noticeBoxText}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center gap-2 mt-5">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToMobileSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  mobileActive === idx ? "w-6 bg-[#333333]" : "w-2 bg-neutral-400/50"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
