"use client";

import { motion } from "framer-motion";

export default function ClimateValueSection() {
  const cards = [
    {
      num: "01",
      title: "Avoided Landfill Methane",
      desc: "Landfilled organic waste decomposes anaerobically and generates methane. Processing at source avoids these emissions entirely.",
    },
    {
      num: "02",
      title: "Reduced Transportation Emissions",
      desc: "Decentralized processing removes the need for long-distance waste hauling, lowering fuel use and associated carbon output.",
    },
    {
      num: "03",
      title: "Carbon Storage in Soil",
      desc: "Quality compost applied to land increases soil organic carbon, improves soil structure, and supports long-term sequestration.",
    },
    {
      num: "04",
      title: "Data-Driven Carbon Accounting",
      desc: "WMAAS™ digital monitoring tracks waste processed, waste diverted, compost produced, and emission-reduction potential — the foundation for certification.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="w-full bg-[#2B2B2C] text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="text-center space-y-3 max-w-3xl mx-auto"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs sm:text-sm font-semibold tracking-wider text-[#00C853] uppercase block font-sans"
          >
            FROM COMPOST TO CARBON CREDITS
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.12] font-farro drop-shadow-md"
          >
            Creating Measurable Climate Value.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-neutral-300/90 text-sm sm:text-base lg:text-[16px] font-satoshi font-normal leading-relaxed pt-1 max-w-2xl mx-auto"
          >
            By diverting organic waste from landfills and converting it into stable compost through THE SOIL MAKER™, the system contributes to greenhouse gas reduction in four ways.
          </motion.p>
        </motion.div>

        {/* 4 Cards Grid - Professional Clean Hover & Border Transition */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {cards.map((card) => (
            <motion.div
              key={card.num}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group relative bg-[#343433]/70 hover:bg-[#383837] border border-[#EAE3D2]/40 hover:border-[#00C853] rounded-[16px] p-6 flex flex-col justify-between min-h-[313px] transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl"
            >
              <div className="space-y-4">
                {/* Number Badge (Smooth Green fill transition on hover) */}
                <div className="inline-block">
                  <span className="w-10 h-8 rounded-md bg-white text-[#2B2B2C] group-hover:bg-[#00C853] group-hover:text-white font-extrabold text-sm flex items-center justify-center transition-colors duration-300 font-sans shadow-sm">
                    {card.num}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-[19px] font-bold text-white leading-snug font-farro transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-[13px] text-neutral-300/80 font-satoshi font-normal leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
