"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function OperationalBurdenBanner() {
  return (
    <section className="w-full bg-[#EBE4D5] py-6 sm:py-8 px-6 sm:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-[1240px] mx-auto min-h-[440px] sm:min-h-[480px] lg:min-h-[523px] rounded-[24px] sm:rounded-[32px] overflow-hidden flex items-center justify-center p-8 sm:p-12 lg:p-16 text-center shadow-xl border border-neutral-700/30"
      >
        {/* Background Aerial Forest Image */}
        <Image
          src="/Services/wmas3.png"
          alt="Aerial Forest Background"
          fill
          priority
          className="object-cover object-center filter brightness-[0.75] contrast-[1.1]"
        />

        {/* Dark Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/75 z-10" />

        {/* Content Container */}
        <div className="relative z-20 max-w-[920px] mx-auto  text-center">
          {/* Sub-tag */}
          <span className="text-[#00C52B] text-xs sm:text-sm font-normal tracking-widest uppercase font-satoshi block">
            ONE PARTNER. ONE SERVICE.
          </span>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-medium text-[#EBE4D5] leading-[1.15] font-farro tracking-tight drop-shadow-md">
            Complete Waste Management, Without
            <br className="hidden sm:inline" /> The Operational Burden.
          </h2>

          {/* Body Description Paragraph */}
          <p className="pt-5 text-neutral-200/90 text-xs sm:text-sm lg:text-[15px] font-satoshi font-normal leading-relaxed max-w-[860px] mx-auto text-left">
            WMAAS™ transforms waste into valuable resources through a Zero CAPEX, Pay-as-You-Go service model.
            We take complete ownership of your waste management operations — from source segregation and
            scientific processing to recycling, compliance, reporting, and continuous operational support. The result is a
            smarter, cleaner, fully managed waste ecosystem that reduces costs, ensures regulatory compliance,
            supports ESG goals, and creates lasting environmental value.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
