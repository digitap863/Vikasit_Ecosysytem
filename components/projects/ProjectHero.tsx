"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const titles = [
  {
    line1: "Transforming Organic Waste",
    line2: "Into Working Infrastructure",
    sub: "Converting municipal waste into high-value biomass and organic compost.",
    badge: "Field Innovation",
  },
  {
    line1: "Zero-Odor Tech &",
    line2: "Circular Ecosystems",
    sub: "Automated and scalable decentralized composting hubs operating at scale.",
    badge: "Circular Tech",
  },
  {
    line1: "Empowering Green Cities",
    line2: "With Zero-Waste Solutions",
    sub: "Partnering with urban local bodies for sustainable waste diversion.",
    badge: "Impact at Scale",
  },
  {
    line1: "Real-World Impact &",
    line2: "Field Action Stories",
    sub: "Explore live field projects, processing hubs, and community stories.",
    badge: "Our Projects",
  },
];

export default function ProjectHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollToVideos = () => {
    const elem = document.getElementById("video-grid");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[650px] overflow-hidden bg-neutral-950 flex items-center justify-center select-none">
      {/* Background Video */}
      <video
        src="/banner/WhatsApp Video 2026-08-18 at 3.46.29 PM.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 transition-transform duration-1000"
      />

      {/* Top Transparent Light Ambient Effect */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/15 via-white/5 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-[-60px] left-[15%] w-[450px] h-[300px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none z-10" />
      <div className="absolute top-[-40px] right-[15%] w-[400px] h-[280px] bg-amber-100/15 rounded-full blur-[100px] pointer-events-none z-10" />

      {/* Bottom Soft Gradient Fade Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />

      {/* Center Dynamic Content */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 text-center text-white flex flex-col items-center justify-center pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -25, filter: "blur(4px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            {/* Top Badge */}
            {/* <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-semibold tracking-wider uppercase font-farro text-emerald-300 mb-5 shadow-lg">
              {titles[currentIndex].badge}
            </span> */}

            {/* Main Changing Title (Splitted into 2 Lines) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-farro leading-[1.18] tracking-tight max-w-4xl text-white drop-shadow-md">
              <span className="block">{titles[currentIndex].line1}</span>
              <span className="block text-emerald-300 mt-1">{titles[currentIndex].line2}</span>
            </h1>

            {/* Subtitle */}
            {/* <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
              {titles[currentIndex].sub}
            </p> */}
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        {/* <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToVideos}
            className="px-7 py-3.5 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-semibold font-farro text-sm sm:text-base shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            Explore All Project Videos
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
          <Link
            href="/contact"
            className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-semibold font-farro text-sm sm:text-base transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Contact Us
          </Link>
        </div> */}

        {/* Title Carousel Indicators */}
        {/* <div className="flex items-center gap-2 mt-8 sm:mt-12">
          {titles.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Switch hero title to ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-emerald-400"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div> */}
      </div>

      {/* Mouse Scroll Down Indicator */}
      <button
        onClick={scrollToVideos}
        aria-label="Scroll down to project videos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/70 group-hover:text-emerald-300 font-farro transition-colors">
          Scroll Down
        </span>
        {/* Animated Mouse Icon */}
        <div className="w-6 h-10 rounded-full border-2 border-white/40 group-hover:border-emerald-400 flex justify-center pt-2 transition-all backdrop-blur-sm bg-black/20 shadow-lg">
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-2.5 rounded-full bg-emerald-400"
          />
        </div>
        {/* Down Arrow */}
        <motion.svg
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4 text-white/80 group-hover:text-emerald-300 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>
    </section>
  );
}
