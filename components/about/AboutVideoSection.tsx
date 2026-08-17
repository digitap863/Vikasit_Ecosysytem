"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutVideoSection() {
  return (
    <section className="w-full max-w-[960px] mx-auto px-2 sm:px-6 my-6 sm:my-10 select-none flex justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex items-center justify-center"
      >
        <Image
          src="/about_page_workflow_ebe4d5.png"
          alt="Vikasit Ecosystems Workflow Diagram"
          width={1200}
          height={1200}
          priority
          className="w-full max-w-full h-auto object-contain"
        />
      </motion.div>
    </section>
  );
}
