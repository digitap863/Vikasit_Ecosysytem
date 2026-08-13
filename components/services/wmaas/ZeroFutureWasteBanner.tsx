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
        <section className="w-full bg-[#EBE4D5] py-3 sm:py-8 px-4 sm:px-10 lg:px-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-[1440px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden p-8 sm:p-10 lg:p-12 shadow-xl border border-neutral-700/30"
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/60 z-10" />

                {/* Content Container */}
                <div className="relative z-20 w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    {/* Left Text Block */}
                    <div className="space-y-2 max-w-[680px]">
                        <h3 className="text-white font-medium text-lg sm:text-xl lg:text-[22px] tracking-wide leading-snug font-satoshi uppercase">
                            READY TO BUILD A ZERO – WASTE FUTURE?
                        </h3>
                        <p className="text-left text-white/80 font-normal text-sm sm:text-md lg:text-base  font-satoshi">
                            Partner with Vikasit Ecosystems and discover how WMAAS™ can help your organization reduce costs, recover resources, comply with environmental regulations, and create measurable sustainability impact.
                        </p>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 shrink-0">
                        {/* Primary Get in Touch Button */}
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2.5 bg-[#00c853] hover:bg-[#00b248] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-[14px] font-normal text-xs sm:text-sm shadow-lg transition-all duration-300 hover:scale-[1.03] cursor-pointer font-satoshi"
                        >
                            <span>Get in Touch</span>
                            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        {/* Secondary Download Brochure Button */}
                        <button
                            onClick={handleDownloadBrochure}
                            className="group inline-flex items-center gap-2.5 border border-[#00c853]/70 bg-black/40 hover:bg-black/60 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-[14px] font-normal text-xs sm:text-sm transition-all duration-300 hover:scale-[1.03] cursor-pointer font-satoshi"
                        >
                            <span>Download Brochure</span>
                            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
