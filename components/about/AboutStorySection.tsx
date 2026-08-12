"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

export default function AboutStorySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative w-full bg-[#eae4d6] py-16 sm:py-24 overflow-hidden z-10">
      {/* Background Map - High Visibility Map */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <div className="absolute inset-0 opacity-85 mix-blend-multiply z-10">
          <Image
            src="/about_page_map.png"
            alt="World Map Background"
            fill
            priority
            className="object-contain object-center"
          />
        </div>
      </div>

      {/* Centered Story Content */}
      <div className="max-w-[860px] mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="space-y-6 flex flex-col items-center"
        >
          {/* Subheader Tag */}
          <motion.span
            variants={itemVariants}
            className="text-xs sm:text-sm font-normal tracking-widest text-neutral-500 uppercase block font-sans"
          >
            OUR STORY
          </motion.span>

          {/* Main Title */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-[46px] text-[#2d2f2f] tracking-tight leading-[1.15] font-farro max-w-[760px]"
          >
            <span className="font-extrabold block drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]">Building A Cleaner, Greener</span>
            <span className="font-normal text-[#3d3f3d] block mt-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]">Future Through Innovation.</span>
          </motion.h2>

          {/* Body Paragraph 1 */}
          <motion.p
            variants={itemVariants}
            className="text-neutral-700 text-sm sm:text-sm leading-relaxed font-sans max-w-[780px] pt-2"
          >
            Vikasit Ecosystems is building a bubble of life through waste management. Our ecosystem is a circular-economy channel that turns today&apos;s waste into tomorrow&apos;s raw material. We use proprietary tools and technology to transform waste management and close the loop, creating an essential circular economy for organic waste.
          </motion.p>

          {/* Body Paragraph 2 */}
          <motion.p
            variants={itemVariants}
            className="text-neutral-600 text-xs sm:text-sm  leading-relaxed font-sans max-w-[760px]"
          >
            From on-site processing to large-scale composting systems, every service we run — Waste Management as a Service, The Soil Maker equipment, and waste management consulting — is built around the same idea: waste isn&apos;t the problem, the way we handle it is
          </motion.p>

          {/* Bottom Achievement Badge */}
          <motion.div
            variants={itemVariants}
            className="pt-4"
          >
            <div className="inline-flex items-center gap-3.5  backdrop-blur-md  px-6 py-3 text-left max-w-[640px]">
              <div className="w-9 h-9 rounded-full bg-white border border-[#056826] text-[#056826] flex items-center justify-center shrink-0 shadow-xs">
                <FiStar className="w-4 h-4 fill-[#056826]/20" />
              </div>
              <span className="text-sm sm:text-md font-bold text-[#056826] leading-tight font-sans">
                Ranked In The Top 10 Of 200+ New Waste-Management Equipment Companies By StartUs Insights.
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
