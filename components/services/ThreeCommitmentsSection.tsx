"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function ThreeCommitmentsSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
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
    <section className="w-full bg-[#EBE4D5] text-[#1A1A1A] py-14 sm:py-20 overflow-hidden border-t border-[#E0D8C8]/60">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12 sm:space-y-16">
        {/* Section Header with Figma text shadow and exact typography */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="text-center space-y-3.5 max-w-[850px] mx-auto"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs sm:text-sm font-semibold tracking-wider text-[#5A5A5C] uppercase block font-sans"
          >
            WHAT WE DO
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-[52px] xl:text-[56px] font-extrabold text-[#343433] tracking-tight leading-[1.1] font-farro"
            style={{
              textShadow: "0px 4px 10px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.15)",
            }}
          >
            Three Commitments <br />
            Behind Every Install.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-neutral-700 text-sm sm:text-base lg:text-[16.5px] font-satoshi font-normal leading-relaxed max-w-2xl mx-auto pt-1"
          >
            Whichever way you&apos;d rather run it — hand off the whole operation, or bring on-site composting into a facility you already manage — both close the same loop.
          </motion.p>
        </motion.div>

        {/* 2-Card Grid matching Figma specifications (1238 Fill x 374 Hug) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="max-w-[1238px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {/* Card 1: Service / 01 - Waste Management as a Service */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#343433] text-white rounded-[24px] sm:rounded-[28px] p-7 sm:p-9 lg:p-10 min-h-[374px] flex flex-col justify-between overflow-hidden shadow-xl border border-neutral-700/50 group"
          >
            <div className="space-y-4 max-w-[360px] relative z-10">
              {/* Top Tag */}
              <span className="inline-block bg-[#EAE3D2] text-[#1A1A1A] px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold tracking-wide font-sans shadow-sm">
                Service / 01
              </span>

              {/* Card Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-normal font-farro text-[#EAE3D2] tracking-tight leading-snug pt-1">
                Waste Management as a Service
              </h3>

              {/* Card Description mentioning Vikasit Ecosystems */}
              <p className="text-neutral-300 text-xs sm:text-sm  leading-relaxed font-satoshi font-normal">
                A full subscription by Vikasit Ecosystems. Tell us the requirement, we build the process and run it every day — including the problems you didn&apos;t plan for.
              </p>

              {/* Action Link */}
              <div className="pt-3">
                <Link
                  href="/services/wmaas"
                  className="inline-flex items-center gap-2 text-[#EAE3D2] hover:text-[#76C893] font-normal text-xs sm:text-sm transition-colors group/link cursor-pointer font-sans"
                >
                  <span>Explore WMAAS</span>
                  <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Bottom Right Card Illustration: Vikasit Branded Waste Truck & Bins */}
            <div className="absolute right-0 bottom-0 w-[240px] sm:w-[295px] h-[195px] sm:h-[235px] pointer-events-none z-0 transition-transform duration-300 group-hover:scale-[1.03]">
              <Image
                src="/Services/service1_truck.webp"
                alt="Vikasit Ecosystems Waste Management Truck"
                fill
                priority
                className="object-contain object-bottom-right"
              />
            </div>
          </motion.div>

          {/* Card 2: Service / 02 - Compost Value Chain */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#343433] text-white rounded-[24px] sm:rounded-[28px] p-7 sm:p-9 lg:p-10 min-h-[374px] flex flex-col justify-between overflow-hidden shadow-xl border border-neutral-700/50 group"
          >
            <div className="space-y-4 max-w-[360px] relative z-10">
              {/* Top Tag */}
              <span className="inline-block bg-[#EAE3D2] text-[#1A1A1A] px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold tracking-wide font-sans shadow-sm">
                Service / 02
              </span>

              {/* Card Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-normal font-farro text-[#EAE3D2] tracking-tight leading-snug pt-1">
                Compost Value Chain
              </h3>

              {/* Card Description mentioning Vikasit Ecosystems */}
              <p className="text-neutral-300 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed font-sans font-normal">
                From Waste to Wealth — Building a Circular Carbon Economy with Vikasit Ecosystems.
              </p>

              {/* Action Link */}
              <div className="pt-3">
                <Link
                  href="/services/compost"
                  className="inline-flex items-center gap-2 text-[#EAE3D2] hover:text-[#76C893] font-normal text-xs sm:text-sm transition-colors group/link cursor-pointer font-sans"
                >
                  <span>Explore Compost</span>
                  <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Bottom Right Card Illustration: Vikasit Compost Jute Bags */}
            <div className="absolute right-0 bottom-0 w-[240px] sm:w-[290px] h-[195px] sm:h-[235px] pointer-events-none z-0 transition-transform duration-300 group-hover:scale-[1.03]">
              <Image
                src="/Services/service2_bag.webp"
                alt="Vikasit Ecosystems Compost Value Chain Bags"
                fill
                priority
                className="object-contain object-bottom-right"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
