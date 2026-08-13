"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CoreEngineeringDiagramSection() {
  return (
    <section className="w-full bg-[#EBE4D5] text-[#1A1A1A] py-8 sm:py-12">
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="bg-[#FAF6EE] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-md border border-neutral-300/50 overflow-hidden flex flex-col items-center justify-center"
        >
          <Image
            src="/Services/wmas_coreEngineering.png"
            alt="Core Engineering & Operational Highlights"
            width={1100}
            height={600}
            priority
            className="w-full h-auto object-contain rounded-[18px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
