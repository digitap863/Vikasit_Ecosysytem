"use client";

import { motion } from "framer-motion";

export default function WasteToClimateValueSection() {
  return (
    <section className="w-full bg-[#EBE4D5] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-[1380px] mx-auto"
        >
          {/* Centered Main Title with Figma Text Shadow Effect */}
          <h2
            className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#343433] tracking-tight leading-tight font-farro text-center"
            style={{
              textShadow: "0px 4px 10px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.15)",
            }}
          >
            Waste–To–Climate Value
          </h2>

          {/* Left Aligned Paragraph Content */}
          <div className="space-y-4 text-neutral-700 text-sm sm:text-base lg:text-[16.5px] font-satoshi font-normal leading-relaxed text-left">
            <p>
              Effective solid waste management plays a vital role in mitigating climate change by significantly reducing greenhouse gas (GHG) emissions. Organic waste, when dumped in landfills, decomposes anaerobically and releases methane (CH₄)—a greenhouse gas that is over 25 times more potent than carbon dioxide over a 100-year period.
            </p>
            <p>
              By adopting decentralized organic waste processing systems such as THE SOIL MAKER™ Organic Waste Composting Machine, organic waste is converted into nutrient-rich compost through an aerobic process, preventing methane generation and reducing the overall carbon footprint.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
