"use client";

import { motion } from "framer-motion";

export default function QualityAssuranceSection() {
  const processList = [
    "Scientific Curing And Stabilization Of Compost",
    "Screening And Refinement For Uniform Quality",
    "Testing As Per Applicable Fertiliser Control Order (FCO) Standards",
    "Analysis Of Key Parameters Including Organic Carbon, Moisture, PH, C:N Ratio, And Nutrient Profile",
    "NPK Customization And Fortification Based On Soil Requirements And Crop-Specific Needs",
    "Enhancement With Beneficial Microbial Consortia And Natural Soil Conditioners Where Required",
    "Batch-Wise Quality Documentation And Traceability",
  ];

  const highlights = [
    {
      id: "consistent",
      label: "CONSISTENT QUALITY",
      icon: (
        <svg
          className="w-10 h-10 text-[#343433]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "compliant",
      label: "SAFE & COMPLIANT",
      icon: (
        <svg
          className="w-10 h-10 text-[#343433]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      ),
    },
    {
      id: "enriched",
      label: "ENRICHED SOIL HEALTH",
      icon: (
        <svg
          className="w-10 h-10 text-[#343433]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      ),
    },
    {
      id: "yield",
      label: "IMPROVED CROP YIELD",
      icon: (
        <svg
          className="w-10 h-10 text-[#343433]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22V12" />
          <path d="M12 12C12 7 7 4 2 6c0 6 5 9 10 6Z" />
          <path d="M12 15c0-5 5-8 10-6 0 6-5 9-10 6Z" />
        </svg>
      ),
    },
    {
      id: "eco",
      label: "SUSTAINABLE & ECO-FRIENDLY",
      icon: (
        <svg
          className="w-10 h-10 text-[#343433]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a10 10 0 1 0 10 10" />
          <path d="m16 8 2 2-2 2" />
          <path d="M18 10H10a4 4 0 0 0-4 4v2" />
        </svg>
      ),
    },
    {
      id: "traceable",
      label: "TRACEABLE & TRANSPARENT",
      icon: (
        <svg
          className="w-10 h-10 text-[#343433]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <path d="M14 2v6h6" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      ),
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
    <section className="w-full bg-[#EBE4D5] text-[#1A1A1A] py-4 sm:py-8 lg:py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6 sm:space-y-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={containerVariants}
          className="text-center space-y-2.5 max-w-[800px] mx-auto"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs sm:text-sm font-semibold tracking-wider text-[#5A5A5C] uppercase block font-sans"
          >
            QUALITY ASSURANCE
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-4xl lg:text-[46px] font-bold text-[#343433] tracking-tight leading-[1.12] font-farro drop-shadow-md"
          >
            Quality Assurance &{" "}
            <br  />
            <span className="font-normal text-[#343433] ">
              Soil-Specific Fortification
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-neutral-700 text-sm sm:text-base lg:text-[17px] font-satoshi font-normal leading-relaxed pt-2 max-w-2xl mx-auto"
          >
            Every batch of compost undergoes a structured quality management process to ensure consistency, safety, and performance.
          </motion.p>
        </motion.div>

        {/* 2-Column Content Layout (Left Process List + Right 6 Icon Highlights) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={containerVariants}
          className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left Column: Process List */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#343433] font-farro">
              Our quality process includes:
            </h3>

            <ul className="space-y-3.5 text-xs sm:text-sm lg:text-[15px] text-[#343433] font-satoshi leading-relaxed">
              {processList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#343433] font-bold text-base mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column: 6 Icon Feature Highlights Grid */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pt-4 lg:pt-0"
          >
            {highlights.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center text-center space-y-3"
              >
                <div className="p-2 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#343433] tracking-wide font-sans uppercase leading-tight max-w-[120px]">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
