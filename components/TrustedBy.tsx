"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const companies = [
  { name: "MCF", src: "/companies/MCF.webp", width: 150, height: 52 },
  { name: "Manipal", src: "/companies/Manipal.webp", width: 180, height: 54 },
  { name: "SJR", src: "/companies/SJR_Logo_white_Horizontal-removebg-preview.png", width: 150, height: 52 },
  { name: "SAS", src: "/companies/Sas-logo-blue-removebg-preview.png", width: 140, height: 52 },
  { name: "aroha", src: "/companies/aroha-removebg-preview.png", width: 140, height: 52 },
  { name: "bbmp", src: "/companies/bbmp-removebg-preview.webp", width: 130, height: 52 },
  { name: "biess", src: "/companies/biess-removebg-preview.png", width: 140, height: 46 },
  { name: "brigade", src: "/companies/brigade.webp", width: 140, height: 56 },
  { name: "century", src: "/companies/century-removebg-preview.png", width: 140, height: 52 },
  { name: "dish", src: "/companies/dish-removebg-preview.png", width: 130, height: 46 },
  { name: "eco-collab", src: "/companies/eco-collab.webp", width: 170, height: 58 },
  { name: "enviro", src: "/companies/enviro-removebg-preview.webp", width: 140, height: 52 },
  { name: "evo-homes", src: "/companies/evo-homes-removebg-preview.webp", width: 140, height: 52 },
  { name: "fiest-homes", src: "/companies/fiest-homes.webp", width: 140, height: 52 },
  { name: "hilite", src: "/companies/hilite.png", width: 140, height: 52 },
  { name: "isha", src: "/companies/isha.webp", width: 140, height: 52 },
  { name: "kerala", src: "/companies/kerala-removebg-preview.png", width: 150, height: 52 },
  { name: "manipal-hospitals", src: "/companies/manipal-hospitals.webp", width: 180, height: 54 },
  { name: "mjr", src: "/companies/mjr-removebg-preview.webp", width: 130, height: 46 },
  { name: "nitte", src: "/companies/nitte-removebg-preview.webp", width: 130, height: 46 },
  { name: "northern-sky-new", src: "/companies/northern-sky-new.webp", width: 160, height: 52 },
  { name: "nothing-Waste", src: "/companies/nothing-Waste.webp", width: 150, height: 52 },
  { name: "oceanus", src: "/companies/oceanus-removebg-preview.webp", width: 140, height: 52 },
  { name: "provident", src: "/companies/provident-removebg-preview.webp", width: 140, height: 52 },
  { name: "purva", src: "/companies/purva-removebg-preview.webp", width: 140, height: 52 },
  { name: "resource", src: "/companies/resource-removebg-preview.png", width: 150, height: 52 },
  { name: "rohan-corporation", src: "/companies/rohan-corporation-removebg-preview.webp", width: 160, height: 52 },
  { name: "sobha-1", src: "/companies/sobha-1.webp", width: 120, height: 64 },
  { name: "sumadhura", src: "/companies/sumadhura-removebg-preview.webp", width: 150, height: 52 },
  { name: "technopark", src: "/companies/technopark-removebg-preview.webp", width: 140, height: 52 },
  { name: "the-emep", src: "/companies/the_emep-removebg-preview.png", width: 150, height: 52 },
  { name: "puravankara", src: "/companies/purvankara-logo.svg", width: 160, height: 52 },
];

// Double the companies list to guarantee a seamless looping track
const duplicatedCompanies = [
  ...companies,
  ...companies,
];

export default function TrustedBy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scroll = () => {
      // Auto scroll only if not mouse-dragging and not mouse-hovering
      if (!isDown && !isHovered) {
        container.scrollLeft += 0.8; // scroll speed (pixels per frame)

        // Reset scroll position seamlessly when reaching half of duplicated list
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isDown, isHovered]);

  // Mouse Drag Events
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDown(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    container.scrollLeft = scrollLeftState - walk;

    // Loop bounds check while dragging
    const halfWidth = container.scrollWidth / 2;
    if (container.scrollLeft >= halfWidth) {
      container.scrollLeft -= halfWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += halfWidth;
    }
  };

  // Keyboard Arrow Key Events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const step = 60; // scroll step on key press
    const halfWidth = container.scrollWidth / 2;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      container.scrollLeft += step;
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      container.scrollLeft -= step;
      if (container.scrollLeft <= 0) {
        container.scrollLeft += halfWidth;
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="w-full bg-[#eae4d6] py-8 md:py-12  relative z-10 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col items-center justify-center text-center space-y-6"
        >
          {/* Section Header */}
          <h2 className="text-sm md:text-2xl  font-bold tracking-[0.18em] uppercase text-neutral-800 font-farro max-w-[80%] leading-relaxed select-none">
            TRUSTED BY TEAMS BUILDING WASTE-FREE COMMUNITIES
          </h2>
        </motion.div>
      </div>

      {/* Interactive Marquee Container */}
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        className="relative w-full mt-6 md:mt-8 flex gap-6 sm:gap-10 items-center overflow-x-auto whitespace-nowrap scrollbar-none select-none outline-none cursor-grab active:cursor-grabbing py-2 z-10"
      >
        {/* Soft edge blur vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#eae4d6] via-[#eae4d6]/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#eae4d6] via-[#eae4d6]/60 to-transparent z-20 pointer-events-none" />

        {/* Scroll track items */}
        {duplicatedCompanies.map((company, index) => (
          <div
            key={`${company.name}-${index}`}
            className="relative flex items-center justify-center shrink-0 w-[180px] sm:w-[240px] h-[70px] sm:h-[90px] group transition-transform duration-300 hover:scale-105 pointer-events-none"
          >
            <div className="relative w-full h-full flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-300">
              <Image
                src={company.src}
                alt={`${company.name} Logo`}
                width={company.width}
                height={company.height}
                className="object-contain max-h-full max-w-full select-none"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
