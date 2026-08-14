"use client";

import { motion } from "framer-motion";

export default function KeyFeaturesTechnicalSpecs() {
  const keyFeatures = [
    { label: "Fast processing", val: "Compost in 3–4 hours" },
    { label: "Scalable", val: "17 models, 25 kg – 2500 kg" },
    { label: "Odour-free operation", val: "Bio-filtration & ventilation" },
    { label: "AMC support", val: "On-site & remote" },
    { label: "Compact & low power", val: "Space-saving design" },
    { label: "Interface", val: "Fully automatic" },
  ];

  const techSpecs = [
    { label: "Capacity", val: "25 kg – 2500 kg/day (17 models)" },
    { label: "Operation", val: "Fully automatic" },
    { label: "Input waste", val: "Organic / wet waste" },
    { label: "Cycle time", val: "3–4 hrs with bioculture" },
    { label: "Maintenance", val: "Annual Maintenance Contract" },
  ];

  const capacities = [
    "25 KG", "50 KG", "75 KG", "100 KG", "150 KG", "200 KG",
    "250 KG", "300 KG", "400 KG", "500 KG", "600 KG", "700 KG",
    "800 KG", "1000 KG", "1200 KG", "1500 KG", "2000 KG", "2500 KG",
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
        duration: 0.5,
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

  return (
    <section className="w-full bg-[#232325] text-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="space-y-10"
        >
          {/* Section Title Header */}
          <div className="space-y-3">
            <motion.span
              variants={itemVariants}
              className="text-xs sm:text-sm font-normal tracking-widest text-[#22C55E] uppercase block font-satoshi"
            >
              SPECIFICATIONS
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[46px] font-md text-[#EAE3D2] tracking-tight leading-[1.12] font-farro"
              style={{
                textShadow: "0px 3px 10px rgba(0, 0, 0, 0.4), 0px 1px 3px rgba(0, 0, 0, 0.25)",
              }}
            >
              Key Features & Technical Specs.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-neutral-400 text-sm sm:text-base font-satoshi"
            >
              Everything you need to size a Soil Maker for your site.
            </motion.p>
          </div>

          {/* Top 2 Cards: Key Features & Technical Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: Key Features */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="bg-[#1C241E] border border-[#2B3B2F] rounded-2xl sm:rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-lg"
            >
              <div>
                <h3 className="text-xs font-bold tracking-widest text-[#4ADE80] uppercase mb-6 font-satoshi">
                  KEY FEATURES
                </h3>

                <div className="divide-y divide-neutral-800/80 font-satoshi">
                  {keyFeatures.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-3.5 flex items-center justify-between gap-4 text-xs sm:text-sm"
                    >
                      <span className="text-neutral-400 font-medium">
                        {item.label}
                      </span>
                      <span className="text-white font-bold text-right">
                        {item.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 2: Technical Specifications */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="bg-[#1C241E] border border-[#2B3B2F] rounded-2xl sm:rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-lg"
            >
              <div>
                <h3 className="text-xs font-bold tracking-widest text-[#4ADE80] uppercase mb-6 font-satoshi">
                  TECHNICAL SPECIFICATIONS
                </h3>

                <div className="divide-y divide-neutral-800/80 font-satoshi">
                  {techSpecs.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-3.5 flex items-center justify-between gap-4 text-xs sm:text-sm"
                    >
                      <span className="text-neutral-400 font-medium">
                        {item.label}
                      </span>
                      <span className="text-white font-bold text-right">
                        {item.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Card: CAPACITY & OPERATING TIME — FULL LINEUP */}
          <motion.div
            variants={itemVariants}
            className="bg-[#1C241E] border border-[#2B3B2F] rounded-2xl sm:rounded-[24px] p-6 sm:p-8 shadow-lg space-y-6"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-4">
              <h3 className="text-xs font-bold tracking-widest text-[#4ADE80] uppercase font-satoshi">
                CAPACITY & OPERATING TIME — FULL LINEUP
              </h3>
              <p className="text-xs text-[#86AD8C] font-medium font-satoshi">
                17 models · 25 KG to 2500 KG · every size runs a 3–4 hr cycle
              </p>
            </div>

            {/* 18 Capacity Grid Items */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {capacities.map((cap, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, borderColor: "rgba(74, 222, 128, 0.6)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#242F27] border border-[#2F3E33]/70 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-1 shadow-sm cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-satoshi">
                    {cap}
                  </span>
                  <span className="text-[11px] font-bold text-[#4ADE80] tracking-wider uppercase font-satoshi">
                    3–4 HRS
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom Custom Request Note */}
            <div className="pt-2">
              <p className="text-xs sm:text-sm text-neutral-400 font-satoshi">
                Don&apos;t see your site&apos;s volume? We size custom configurations above 2500 KG/day on request.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
