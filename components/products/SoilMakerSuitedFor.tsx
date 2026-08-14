"use client";

import { motion } from "framer-motion";

export default function SoilMakerSuitedFor() {
  const categories = [
    {
      id: "government",
      label: "Government",
      icon: (
        <svg
          className="w-11 h-11 text-[#E0D8C8] group-hover:text-white transition-colors duration-300"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Flag at top */}
          <path d="M24 5v5M24 5l6 3-6 3" />
          {/* Dome */}
          <path d="M16 18c0-4.418 3.582-8 8-8s8 3.582 8 8" />
          {/* Roof Base */}
          <path d="M11 18h26v4H11z" />
          {/* Columns */}
          <path d="M14 22v11M20 22v11M28 22v11M34 22v11" />
          {/* Bottom Steps & Base */}
          <path d="M10 33h28v4H10z" />
          <path d="M7 37h34" />
        </svg>
      ),
    },
    {
      id: "apartments",
      label: "Appartments",
      icon: (
        <svg
          className="w-11 h-11 text-[#E0D8C8] group-hover:text-white transition-colors duration-300"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Main Building Structure */}
          <rect x="13" y="9" width="22" height="30" rx="1.5" />
          {/* Windows Grid */}
          <rect x="17" y="13" width="4" height="4" rx="0.5" />
          <rect x="27" y="13" width="4" height="4" rx="0.5" />
          <rect x="17" y="20" width="4" height="4" rx="0.5" />
          <rect x="27" y="20" width="4" height="4" rx="0.5" />
          <rect x="17" y="27" width="4" height="4" rx="0.5" />
          <rect x="27" y="27" width="4" height="4" rx="0.5" />
          {/* Entrance Door */}
          <path d="M21 39v-5h6v5" />
          {/* Base Line */}
          <path d="M7 39h34" />
        </svg>
      ),
    },
    {
      id: "malls",
      label: "Malls",
      icon: (
        <svg
          className="w-11 h-11 text-[#E0D8C8] group-hover:text-white transition-colors duration-300"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Central Commercial Tower */}
          <path d="M17 11h14v28H17z" />
          {/* Left Wing */}
          <path d="M8 19h9v20H8z" />
          {/* Right Wing */}
          <path d="M31 19h9v20h-9z" />
          {/* Glass Door & Windows */}
          <path d="M21 39v-6h6v6" />
          <path d="M11 24h3v11h-3zM34 24h3v11h-3z" />
          <rect x="20" y="15" width="8" height="4" rx="0.5" />
          <rect x="20" y="22" width="8" height="4" rx="0.5" />
          {/* Base Line */}
          <path d="M6 39h36" />
        </svg>
      ),
    },
    {
      id: "industries",
      label: "Industries",
      icon: (
        <svg
          className="w-11 h-11 text-[#E0D8C8] group-hover:text-white transition-colors duration-300"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Smoke Trails */}
          <path d="M13 6c-1.2 2 0.8 3.2 0 5M18 8c-1.2 1.8 0.8 2.8 0 4.5" />
          {/* Factory Chimneys */}
          <path d="M11 12h4v8h-4zM16 14h4v6h-4z" />
          {/* Sawtooth Industrial Factory Building */}
          <path d="M7 39V23l8-5v5l8-5v5l8-5v16H7z" />
          {/* Factory Windows */}
          <rect x="11" y="29" width="3.5" height="4" rx="0.5" />
          <rect x="19" y="29" width="3.5" height="4" rx="0.5" />
          <rect x="27" y="29" width="3.5" height="4" rx="0.5" />
          {/* Base Line */}
          <path d="M5 39h38" />
        </svg>
      ),
    },
    {
      id: "hospitals",
      label: "Hospitals",
      icon: (
        <svg
          className="w-11 h-11 text-[#E0D8C8] group-hover:text-white transition-colors duration-300"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Hospital Building Body */}
          <rect x="12" y="10" width="24" height="29" rx="1.5" />
          {/* Medical Cross Emblem (+) */}
          <path d="M24 15v8M20 19h8" strokeWidth="2.5" />
          {/* Windows */}
          <rect x="16" y="26" width="4" height="4" rx="0.5" />
          <rect x="28" y="26" width="4" height="4" rx="0.5" />
          {/* Hospital Entrance */}
          <path d="M21 39v-5h6v5" />
          {/* Base Line */}
          <path d="M7 39h34" />
        </svg>
      ),
    },
    {
      id: "schools",
      label: "School/Colleges",
      icon: (
        <svg
          className="w-11 h-11 text-[#E0D8C8] group-hover:text-white transition-colors duration-300"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Graduation Cap Mortarboard at Top */}
          <path d="M24 5l12 6-12 6-12-6 12-6z" />
          <path d="M16 13v5c0 2 3.58 3.5 8 3.5s8-1.5 8-3.5v-5" />
          <path d="M34 11v8" />
          {/* Academy Main Building */}
          <path d="M10 24.5h28v14.5H10z" />
          {/* Pillars & Doors */}
          <path d="M14 28.5v6.5M20 28.5v6.5M28 28.5v6.5M34 28.5v6.5" />
          <path d="M21 39v-4h6v4" />
          {/* Base Line */}
          <path d="M6 39h36" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
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
    <section className="w-full bg-[#EBE4D5] text-[#1A1A1A] py-12 sm:py-16 lg:py-20 border-t border-[#E0D8C8]/60">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="space-y-8 sm:space-y-10"
        >
          {/* Section Header */}
          <div className="space-y-3 max-w-[900px]">
            <motion.span
              variants={itemVariants}
              className="text-xs sm:text-sm font-bold tracking-widest text-[#343433] uppercase block font-sans"
            >
              PERFECT FOR BULK WASTE GENERATIONS
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#343433] tracking-tight leading-[1.15] font-farro"
              style={{
                textShadow: "0px 3px 8px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              Soil Maker Is Ideally Suited For
              <br />
              <span className="font-normal text-[#343433]">
                Wherever Organic Waste Is Generated.
              </span>
            </motion.h2>
          </div>

          {/* 6 Industry Category Cards Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6 pt-2"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className="group relative bg-[#2B2B2C] text-white p-6 sm:p-7 rounded-2xl sm:rounded-[22px] flex flex-col items-start justify-start text-left gap-4 shadow-md hover:shadow-2xl cursor-pointer border border-neutral-700/40"
              >
                <div className="p-1 flex items-start justify-start">
                  {cat.icon}
                </div>
                <p className="text-xs sm:text-sm font-normal text-white tracking-wide font-sans leading-tight">
                  {cat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
