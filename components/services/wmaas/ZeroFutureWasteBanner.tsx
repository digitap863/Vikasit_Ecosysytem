"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function ZeroFutureWasteBanner() {
  const handleDownloadBrochure = () => {
    const link = document.createElement("a");
    link.href = "/banner/product-page_banner.png";
    link.download = "Vikasit_Soil_Maker_Brochure.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full bg-[#EBE4D5] py-3 sm:py-8 px-3 sm:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[1440px] mx-auto rounded-[20px] sm:rounded-[32px] overflow-hidden p-4 sm:p-10 lg:p-12 shadow-xl border border-neutral-700/30"
      >
        {/* Background Forest Image */}
        <Image
          src="/Services/wmas3.png"
          alt="Misty Forest Background"
          fill
          priority
          className="object-cover object-center filter brightness-[0.75] contrast-[1.1]"
        />

        {/* Dark Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/75 z-10" />

        {/* Content Container - Flex row layout for text and buttons in same row across screen sizes */}
        <div className="relative z-20 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-8 text-left">
          {/* Left Text Block */}
          <div className="space-y-1.5 sm:space-y-2 flex-1 max-w-[720px]">
            <h3 className="text-white font-semibold text-xs sm:text-xl lg:text-[22px] tracking-wide leading-snug font-satoshi uppercase">
              READY TO BUILD A ZERO – WASTE FUTURE?
            </h3>
            <p className="text-white/85 font-normal text-[11px] sm:text-sm lg:text-base leading-relaxed font-satoshi">
              Partner with Vikasit Ecosystems and discover how WMAAS™ can help your organization reduce costs, recover resources, comply with environmental regulations, and create measurable sustainability impact.
            </p>
          </div>

          {/* Right Action Buttons in a Flex Row */}
          <div className="flex flex-row items-center gap-2 sm:gap-4 shrink-0 w-full md:w-auto justify-start md:justify-end pt-1 md:pt-0">
            {/* Primary Get in Touch Button */}
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-2.5 bg-[#00c853] hover:bg-[#00b248] text-white px-3.5 sm:px-7 py-2 sm:py-3.5 rounded-lg sm:rounded-[14px] font-medium text-[11px] sm:text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer font-satoshi whitespace-nowrap"
            >
              <span>Get in Touch</span>
              <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Download Brochure Button */}
            <button
              onClick={handleDownloadBrochure}
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-2.5 border border-[#00c853]/70 bg-black/40 hover:bg-black/60 text-white px-3.5 sm:px-7 py-2 sm:py-3.5 rounded-lg sm:rounded-[14px] font-medium text-[11px] sm:text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer font-satoshi whitespace-nowrap"
            >
              <span>Download Brochure</span>
              <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
