"use client";

import { motion } from "framer-motion";

export default function AboutVideoSection() {
  return (
    <section className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-12 my-12 select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#1a1a1a] border border-[#2d2d2d]/20 shadow-2xl aspect-video md:aspect-[21/9]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-3xl sm:rounded-[36px]"
        >
          <source src="/you_are_missing_the_side_porti.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Subtle Ambient Overlay Shadow for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
      </motion.div>
    </section>
  );
}
