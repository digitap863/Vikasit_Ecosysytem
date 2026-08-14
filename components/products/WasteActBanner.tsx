"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function WasteActBanner() {
  const handleDownloadBrochure = () => {
    const link = document.createElement("a");
    link.href = "/banner/product-page_banner.png";
    link.download = "Vikasit_Soil_Maker_Brochure.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full bg-[#EBE4D5] py-10 sm:py-14 px-6 sm:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[1440px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden min-h-[160px] sm:min-h-[180px] flex items-center p-6 sm:p-10 lg:p-12 shadow-xl border border-neutral-700/30"
      >
        {/* Background Forest Image */}
        <Image
          src="/product/forest_image.png"
          alt="Misty Forest Background"
          fill
          priority
          className="object-cover object-center filter brightness-[0.7] contrast-[1.1]"
        />

        {/* Dark Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/75 z-10" />

        {/* Content Container */}
        <div className="relative z-20 w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Text */}
          <h3
            className="text-white font-medium text-base sm:text-lg lg:text-[21px] xl:text-[23px] tracking-wide leading-snug font-satoshi max-w-[620px]"
            style={{
              textShadow: "0px 3px 10px rgba(0, 0, 0, 0.6), 0px 1px 3px rgba(0, 0, 0, 0.4)",
            }}
          >
            WASTE MANAGEMENT IS A PROBLEM IGNORED AND ORPHANED – WE NEED TO ACT NOW.
          </h3>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 shrink-0">
            {/* Primary Talk to Our Expert Button */}
            <Button href="/contact" variant="primary" showArrow>
              Talk to Our expert
            </Button>

            {/* Secondary Download Brochure Button */}
            <Button onClick={handleDownloadBrochure} variant="outline-emerald" showArrow>
              Download Brochure
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
