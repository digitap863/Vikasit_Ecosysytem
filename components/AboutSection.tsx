"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiUserCheck, FiBriefcase, FiHome } from "react-icons/fi";

export default function AboutSection() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="w-full bg-[#eae4d6] py-10 md:py-18 relative overflow-hidden z-10">
      {/* Background Map - Faded Left Portion */}
      <div className="absolute top-0 left-0 w-full lg:w-[70%] h-full pointer-events-none z-0 select-none">
        {/* Top-Left Ambient White Radial Glow behind the map (round shaped spotlight with top margin separation) */}
        <div className="absolute top-[80px] left-[-80px] w-[500px] h-[300px] bg-white/95 rounded-full blur-[60px] z-0" />

        {/* Map Image (blended to make white background transparent, full opacity for high visibility) */}
        <div className="absolute inset-0 opacity-100 mix-blend-multiply z-10">
          <Image
            src="/map.png"
            alt="World Map Background"
            fill
            priority
            className="object-contain object-left"
          />
        </div>
        {/* Soft fade transition on the right side only to blend into the main background */}
        <div className="absolute inset-y-0 right-0 w-[45%] bg-gradient-to-r from-transparent to-[#eae4d6] z-20" />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Info Text */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            <span className="text-xs sm:text-sm font-md font-satoshi tracking-wider uppercase text-neutral-600 font-farro block">
              ABOUT VIKASIT ECOSYSTEMS
            </span>

            <h2 className="text-[#2d2f2f] leading-[1.12] font-farro tracking-tight">
              <span className="text-3xl sm:text-4xl md:text-[50px] font-bold">Building A Cleaner, Greener
              </span><br />
              <span className="text-3xl sm:text-4xl md:text-[50px] font-md">Future Through Innovation</span>
            </h2>

            <div className="space-y-6 text-[#2d2f2f]/85 text-sm sm:text-base leading-relaxed font-farro max-w-[640px]">
              <p>
                Vikasit Ecosystems is building a bubble of life through waste management services.
                Our ecosystem is a circular economy channel that turns today&apos;s waste into
                tomorrow&apos;s raw material. We use proprietary tools and technology to
                transform waste management and close the loop, creating an essential circular economy.
              </p>
              <p className="text-neutral-700  font-medium pt-2 border-l-2 border-neutral-400/35 pl-4">
                Listed in the Top 10 out of 800+ new waste management equipment companies as per
                Start Us Insights.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Card & Avatars */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col space-y-8">
            {/* Frosted Glass-morphic CTA Card */}
            <div className="w-full max-w-[480px] bg-gradient-to-b from-[#f2ece0] via-[#eae4d6] to-[#3a3833] backdrop-blur-md border border-[#a8a294]/90 rounded-2xl p-6 sm:p-8 shadow-[0_28px_56px_-12px_rgba(0,0,0,0.2),_0_12px_24px_-16px_rgba(0,0,0,0.25)] relative overflow-hidden flex flex-col">
              <span className="text-[10px] sm:text-xs  uppercase tracking-[0.12em] text-neutral-600 mb-2 font-farro">
                JOIN THE MOVEMENT
              </span>

              <h3 className="text-2xl sm:text-2xl  text-neutral-800 leading-tight font-farro">
                <span className="font-bold"> Be A Part Of The</span><br />
                <span className="text-[#156c2d] block mt-1">Waste-Free India Mission.</span>
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-farro mt-3">
                Every kilogram of waste delivered from landfills creates cleaner cities, healthier soil
                and a greener tomorrow.
              </p>

              {/* Green Pill Button */}
              <button className="ml-auto mt-7 w-50 bg-[#125824] hover:bg-[#0c3f18] text-white  text-xs sm:text-sm py-3.5 px-6 rounded-full shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95">
                Join the Movement &rarr;
              </button>

              {/* Card Footer: Three Columns of Actions */}
              <div className="mt-8 pt-6  grid grid-cols-3 gap-2 text-center">
                {/* Column 1 */}
                <div className="flex flex-col items-center space-y-1.5">
                  <div className="h-9 w-9 rounded-full bg-white border border-[#125824] flex items-center justify-center text-[#125824] shadow-sm">
                    <FiUserCheck className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white text-[11px] sm:text-xs font-farro block">
                    Individuals
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-neutral-300 font-farro block leading-tight">
                    Take the pledge
                  </span>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col items-center space-y-1.5">
                  <div className="h-9 w-9 rounded-full bg-white border border-[#125824] flex items-center justify-center text-[#125824] shadow-sm">
                    <FiBriefcase className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white text-[11px] sm:text-xs font-farro block">
                    Corporates
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-neutral-300 font-farro block leading-tight">
                    Partner with us
                  </span>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col items-center space-y-1.5">
                  <div className="h-9 w-9 rounded-full bg-white border border-[#125824] flex items-center justify-center text-[#125824] shadow-sm">
                    <FiHome className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white text-[11px] sm:text-xs font-farro block">
                    Communities
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-neutral-300 font-farro block leading-tight">
                    Build Cleaner Neighbourhoods
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping Team Avatars & Descriptive Text */}
            <div className="flex items-center gap-4 justify-start max-w-[480px] w-full pl-2">
              <div className="flex -space-x-3 overflow-hidden shrink-0">
                <Image
                  src="/avatar1.png"
                  alt="Team Avatar 1"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#eae4d6] object-cover"
                />
                <Image
                  src="/avatar2.png"
                  alt="Team Avatar 2"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#eae4d6] object-cover"
                />
                <Image
                  src="/avatar3.png"
                  alt="Team Avatar 3"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#eae4d6] object-cover"
                />
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-[#eae4d6] bg-[#125824] text-white font-bold text-xs select-none">
                  +
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700  leading-tight font-farro max-w-[220px]">
                Leading the Way in Eco-Friendly Innovations
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
