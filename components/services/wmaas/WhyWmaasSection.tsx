"use client";

import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";

export default function WhyWmaasSection() {
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
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="space-y-6 sm:space-y-12"
        >
          {/* Top Row: 2-Column Header & Traditional Waste Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            {/* Top Left: Header Block */}
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="text-xs sm:text-sm font-normal tracking-widest text-[#5A5A5C] uppercase block font-sans">
                WHY WMAAS™
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#343433] tracking-tight leading-[1.12] font-farro">
                A Smarter Way{" "}
                <br className="hidden sm:inline" />
                <span className="font-normal text-[#343433]">
                  To Manage Waste.
                </span>
              </h2>

              <p className="text-neutral-700 text-sm sm:text-base lg:text-[16px] font-satoshi font-normal leading-relaxed pt-2 max-w-xl">
                Traditional waste management is expensive, labour-intensive, and
                dependent on transporting waste to distant disposal sites. WMAAS™
                changes the model — we process waste where it&apos;s generated,
                recovering valuable resources through a decentralized circular
                economy approach.
              </p>
            </motion.div>

            {/* Top Right: Traditional Waste Management Block */}
            <motion.div
              variants={itemVariants}
              className="space-y-5 px-2 sm:px-4 pt-1 sm:pt-2"
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#343433] font-farro tracking-tight">
                Traditional waste management
              </h3>

              <ul className="space-y-3.5 text-sm sm:text-base font-normal text-[#343433] font-satoshi pl-2">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#343433] shrink-0" />
                  <span>Waste Generation</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#343433] shrink-0" />
                  <span>Collection</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#343433] shrink-0" />
                  <span>Transportation</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#343433] shrink-0" />
                  <span>Landfill</span>
                </li>
              </ul>

              <div className="pt-4 max-w-[280px]">
                <div className="w-full h-[1px] bg-neutral-400/40 mb-3" />
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#343433] font-satoshi">
                  <FiZap className="w-4 h-4 text-[#343433]" />
                  <span>A Loop That Feeds Itself.</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: 2 Perfectly Aligned Equal Height Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-stretch">
            {/* Bottom Left: Core Engineering Diagram Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#ede3d3] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-md border border-neutral-300/50 overflow-hidden flex flex-col items-center justify-center sm:min-h-[440px] sm:min-h-[480px] h-full"
            >
              <video
                src="/video/wmas.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain rounded-[18px]"
              />
            </motion.div>

            {/* Bottom Right: WMAAS by Vikasit Ecosystems Dark Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#2B2B2C] text-white rounded-[24px] sm:rounded-[28px] p-8 sm:p-10 shadow-xl border border-neutral-700/40 flex flex-col items-center justify-between text-center min-h-[440px] sm:min-h-[480px] h-full space-y-6"
            >
              <h3 className="text-2xl sm:text-3xl font-medium text-[#EAE3D2] font-farro tracking-tight">
                WMAAS™ by Vikasit Ecosystems
              </h3>

              {/* Flow Steps */}
              <div className="flex flex-col items-center space-y-2.5 text-xs sm:text-sm font-normal text-neutral-200 font-satoshi">
                <span>Waste Generation</span>
                <span className="text-[#00c853] text-sm font-bold">↓</span>

                <span>Source Segregation</span>
                <span className="text-[#00c853] text-sm font-bold">↓</span>

                <span>On-Site Processing With THE SOIL MAKER™</span>
                <span className="text-[#00c853] text-sm font-bold">↓</span>

                <span>Compost & Resource Recovery</span>
                <span className="text-[#00c853] text-sm font-bold">↓</span>

                <span>Circular Economy</span>
              </div>

              {/* Bottom Divider & Highlighted Tagline */}
              <div className="w-full pt-2">
                <div className="w-full max-w-[280px] mx-auto h-[1px] bg-neutral-600/60 mb-4" />
                <div className="flex items-center justify-center gap-2 text-[#00c853] text-sm sm:text-base font-normal font-satoshi">
                  <FiZap className="w-4 h-4 text-[#00c853] fill-current" />
                  <span>A Loop That Feeds Itself.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
