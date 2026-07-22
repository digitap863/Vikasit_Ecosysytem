"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const companies = [
  {
    name: "eco-collab",
    src: "/companies/eco-collab.png",
    width: 140,
    height: 48,
  },
  {
    name: "Biesse",
    src: "/companies/Biesse.png",
    width: 130,
    height: 40,
  },
  {
    name: "Cii",
    src: "/companies/Cii.png",
    width: 130,
    height: 44,
  },
  {
    name: "sobha",
    src: "/companies/sobha.png",
    width: 100,
    height: 52,
  },
  {
    name: "brigade",
    src: "/companies/brigade.png",
    width: 120,
    height: 48,
  },
  {
    name: "manipal",
    src: "/companies/manipal.png",
    width: 150,
    height: 44,
  },
];

export default function TrustedBy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full bg-[#eae4d6] py-16 md:py-24 border-t border-neutral-300/40 relative z-10">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col items-center justify-center text-center space-y-12 md:space-y-16"
        >
          {/* Section Header */}
          <motion.h2
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base font-bold tracking-[0.15em] uppercase text-neutral-800 font-farro max-w-[80%] leading-relaxed"
          >
            TRUSTED BY TEAMS BUILDING WASTE-FREE COMMUNITIES
          </motion.h2>

          {/* Logo Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 w-full items-center justify-items-center"
          >
            {companies.map((company) => (
              <motion.div
                key={company.name}
                className="relative flex items-center justify-center w-full h-[52px] group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="relative w-full h-full flex items-center justify-center opacity-75 grayscale contrast-[0.85] brightness-[0.95] group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-300 ease-out">
                  <Image
                    src={company.src}
                    alt={`${company.name} Logo`}
                    width={company.width}
                    height={company.height}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
