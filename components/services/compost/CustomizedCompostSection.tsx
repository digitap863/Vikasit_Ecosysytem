"use client";

import { motion } from "framer-motion";

export default function CustomizedCompostSection() {
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

  const basedOnList = [
    "Soil Analysis",
    "Crop Nutrient Requirements",
    "Desired NPK Levels",
    "Organic Carbon Improvement Targets",
    "Farming Practices & Application Methods",
  ];

  return (
    <section className="w-full bg-[#EBE4D5] text-[#1A1A1A] py-4 sm:py-8 lg:py-10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          {/* Left Column */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            {/* Header Block */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#5A5A5C] uppercase block font-sans">
                CUSTOMIZED SOLUTIONS
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#343433] tracking-tight leading-[1.12] font-farro drop-shadow-md">
                Customized Compost Solutions{" "}
                <br className="hidden sm:inline" />
                <span className="font-normal text-[#343433]">
                  For Organic Farms
                </span>
              </h2>

              <p className="text-neutral-700 text-sm sm:text-base lg:text-[16px] font-satoshi font-normal leading-relaxed pt-1 max-w-2xl">
                Vikasit Ecosystems works with organic farms, plantations, nurseries, landscaping companies, and agricultural enterprises to develop customized soil health solutions based on:
              </p>
            </div>

            {/* Helps Improve Section */}
            <div className="pt-4 space-y-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#343433] font-farro text-left">
                Helps improve :
              </h3>

              {/* Pill Badges Container */}
              <div className="flex flex-wrap items-center justify-start gap-3 pt-1">
                {/* Row 1 Pills */}
                <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm font-sans shrink-0 hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default">
                  Soil Organic Matter
                </div>

                <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm font-sans shrink-0 hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default">
                  Microbial Activity
                </div>

                <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm font-sans shrink-0 hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default">
                  Nutrient Availability
                </div>

                {/* Row 2 Pills */}
                <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm font-sans shrink-0 hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default">
                  Water Retention Capacity
                </div>

                <div className="border border-[#2B2B2C]/70 text-[#1A1A1A] bg-transparent px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm font-sans shrink-0 hover:bg-[#2B2B2C] hover:text-white transition-colors cursor-default">
                  Long-Term Soil Fertility
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Based On List */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 space-y-6 pt-2 lg:pt-10"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#343433] font-farro">
              Based on :
            </h3>

            <ul className="space-y-4 text-xs sm:text-sm lg:text-[15px] text-[#343433] font-satoshi leading-relaxed pl-1">
              {basedOnList.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#343433] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
