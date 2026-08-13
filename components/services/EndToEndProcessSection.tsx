"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function EndToEndProcessSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      id: "01",
      title: "Waste Assessment",
      description: "We analyse your waste generation, site and requirements.",
    },
    {
      id: "02",
      title: "Site Planning & System Design",
      description: "Custom solution design for your specific needs.",
    },
    {
      id: "03",
      title: "Equipment Installation",
      description: "We initial advanced composting equipment with mineral disruption.",
    },
    {
      id: "04",
      title: "Daily Waste Collection & Segregation",
      description: "Organic waste is collected and segregated properly.",
    },
    {
      id: "05",
      title: "Compost Processing",
      description: "Waste is converted into nutrient-rich component using our technology.",
    },
    {
      id: "06",
      title: "Monitoring & Maintenance",
      description: "Regular monitoring, maintenance & performance reports.",
    },
    {
      id: "07",
      title: "Compost Utilization",
      description: "Compost is used for landscaping, farming or gardening.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.04,
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
    <section className="w-full bg-[#2C2C2C] text-white py-16 sm:py-24 px-6 sm:px-10 lg:px-12 overflow-hidden border-t border-neutral-800">
      <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 max-w-[800px] mx-auto"
        >
          <span className="text-xs sm:text-sm font-normal tracking-widest text-[#69BD45] uppercase block font-satoshi">
            OUR PROCESS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#FAF6EE] tracking-tight leading-tight font-satoshi">
            Our End-To-End Process
          </h2>
        </motion.div>

        {/* 7-Step Columns Grid (2 items per row on mobile, 7 items on desktop) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 lg:gap-0 gap-y-2 sm:gap-y-6 lg:gap-y-0 max-w-[1380px] mx-auto"
        >
          {steps.map((step, idx) => {
            const isHovered = hoveredStep === idx;
            const isLast = idx === steps.length - 1;

            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" as const }}
                className={`relative p-3.5 sm:p-6 flex flex-col items-center text-center justify-between min-h-[195px] sm:min-h-[300px] cursor-pointer transition-all duration-300 z-10 ${
                  isHovered
                    ? "border-l-2 border-r-2 border-[#69BD45] border-t-0 border-b-0 rounded-[20px] sm:rounded-[24px] bg-[#2C2C2C]"
                    : `${!isLast ? "lg:border-r lg:border-neutral-600/70 lg:rounded-r-[24px]" : ""} border-t-0 border-b-0 border-l-0`
                }`}
              >
                {/* Top Step Number Badge */}
                <div className="w-full flex justify-center mb-6 relative z-10">
                  <div
                    className={`px-3.5 py-1.5 rounded-lg text-sm sm:text-base font-extrabold font-sans transition-all duration-300 ${
                      isHovered
                        ? "bg-[#69BD45] text-white scale-105"
                        : "bg-[#FAF6EE] text-[#1A1A1A]"
                    }`}
                  >
                    {step.id}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 flex flex-col items-center justify-start space-y-3 relative z-10">
                  {/* Step Title */}
                  <h3
                    className={`text-xs sm:text-sm lg:text-[14.5px] font-bold font-satoshi tracking-tight leading-snug transition-colors duration-300 min-h-[42px] flex items-center justify-center text-center ${
                      isHovered ? "text-[#69BD45]" : "text-[#FAF6EE]"
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-[11.5px] sm:text-xs text-neutral-400 font-satoshi leading-relaxed font-normal text-center max-w-[170px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
