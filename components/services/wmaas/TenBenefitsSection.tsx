"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export default function TenBenefitsSection() {
  const [showAllMobile, setShowAllMobile] = useState(false);

  const benefits = [
    {
      num: "01",
      title: "End-to-End Waste Management",
      desc: "From waste audits and source segregation to scientific processing, recycling, reporting, and continuous operational support — we manage your complete waste ecosystem.",
    },
    {
      num: "02",
      title: "Zero CAPEX Investment",
      desc: "Our trained professionals operate, monitor, maintain, and optimize your waste management system every day, ensuring reliable, hassle-free operations.",
    },
    {
      num: "03",
      title: "Powered by THE SOIL MAKER™",
      desc: "Our proven decentralized Organic Waste Processing System rapidly converts food and organic waste into nutrient-rich compost using our proprietary microbial bioculture.",
    },
    {
      num: "04",
      title: "Complete Operational Ownership",
      desc: "Our trained professionals operate, monitor, maintain, and optimize your waste management system every day, ensuring reliable, hassle-free operations.",
    },
    {
      num: "05",
      title: "Smart Digital Monitoring",
      desc: "Access real-time waste analytics, sustainability dashboards, processing reports, and ESG metrics for complete visibility into your environmental performance.",
    },
    {
      num: "06",
      title: "Resource Recovery",
      desc: "Organic waste becomes premium compost, while recyclable materials are recovered through authorized recycling partners, maximizing resource value.",
    },
    {
      num: "07",
      title: "Regulatory Compliance",
      desc: "Our operations support compliance with the Solid Waste Management Rules 2016, State Pollution Control Board requirements, and National Green Tribunal guidelines.",
    },
    {
      num: "08",
      title: "Sustainability & Carbon Reduction",
      desc: "Processing waste at source significantly reduces transportation emissions, landfill dependency, and methane generation — supporting Zero Waste to Landfill goals.",
    },
    {
      num: "09",
      title: "Reduced Transportation & Landfill Costs",
      desc: "On-site processing cuts the cost and emissions of hauling waste to distant disposal sites, batch after batch, year-round.",
    },
    {
      num: "10",
      title: "Scalable for Every Organization",
      desc: "From a single apartment block to a multi-tonne industrial campus, WMAAS™ scales to fit the site — not the other way around.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
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
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  };

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
            className="text-xs sm:text-sm font-semibold tracking-widest text-[#343433] uppercase block font-sans"
          >
            WHAT WE DELIVER
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#343433] tracking-tight leading-[1.12] font-farro"
          >
            Ten Benefits,
            <br />
            <span className="font-normal text-[#343433]">
              One Subscription.
            </span>
          </motion.h2>
        </motion.div>

        {/* Main White Card Container - Exact Figma 1170px Grid Sizing */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="max-w-[1240px] mx-auto bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 border border-neutral-200/60"
        >
          {/* 10 Benefits Grid */}
          <div className="max-w-[1170px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-16 xl:gap-x-[100px] gap-y-5 lg:gap-y-[20px]">
            {benefits.map((benefit, idx) => {
              const isHiddenOnMobile = !showAllMobile && idx >= 3;

              return (
                <motion.div
                  key={benefit.num}
                  variants={itemVariants}
                  className={`items-start gap-3.5 sm:gap-4 ${
                    isHiddenOnMobile ? "hidden sm:flex" : "flex"
                  }`}
                >
                  {/* Dark Square Number Badge */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#2B2B2C] text-white flex items-center justify-center font-extrabold text-xs sm:text-sm shrink-0 shadow-sm font-sans mt-0.5">
                    {benefit.num}
                  </div>

                  {/* Content */}
                  <div className="space-y-1 font-sans">
                    <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A] font-farro leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile View More / View Less Toggle Button */}
          <div className="sm:hidden pt-6 flex justify-center border-t border-neutral-100 mt-5">
            <button
              onClick={() => setShowAllMobile((prev) => !prev)}
              className="inline-flex items-center gap-2 bg-[#343433] text-white hover:bg-black px-6 py-2.5 rounded-full text-xs font-bold font-sans transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
            >
              <span>{showAllMobile ? "View Less" : "View More"}</span>
              <FiChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAllMobile ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
