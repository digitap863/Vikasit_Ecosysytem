"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SuccessStoryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  linkUrl: string;
  hasPlayIcon?: boolean;
  badge?: string;
}

export interface SuccessStoriesProps {
  tagline?: string;
  heading?: string;
  description?: string;
  stories?: SuccessStoryItem[];
  autoPlayInterval?: number;
}

const defaultStories: SuccessStoryItem[] = [
  {
    id: "1",
    title: "See The Soil Maker in Action",
    description:
      "Watch how food waste is converted into nutrient-rich compost in just 3 hours during a live installation at a client facility.",
    image: "/project1.png",
    buttonText: "Explore Project →",
    linkUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    hasPlayIcon: false,
    badge: "LIVE DEMO",
  },
  {
    id: "2",
    title: "Manipal University Food Waste Management",
    description:
      "Discover how The Soil Maker helped reduce daily food waste while producing high-quality compost for campus landscaping.",
    image: "/project2.png",
    buttonText: "View Story →",
    linkUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    hasPlayIcon: true,
    badge: "CASE STUDY",
  },
  {
    id: "3",
    title: "Residential Society Organic Waste Solution",
    description:
      "Transforming community wet waste into zero-landfill organic fertilizer right on site with zero odor emission.",
    image: "/project3.png",
    buttonText: "Read Story →",
    linkUrl: "/projects/residential-waste",
    hasPlayIcon: false,
    badge: "COMMUNITY",
  },
];

export default function SuccessStories({
  tagline = "SUCCESS STORY",
  heading = "Real Projects.\nReal Results.",
  description = "Explore how The Soil Maker and our waste management solutions are helping apartments, hotels, industries, institutions, and communities transform organic waste into valuable resources.",
  stories = defaultStories,
  autoPlayInterval = 4000,
}: SuccessStoriesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = stories.length;
  const leftStory = stories[activeIndex];
  const rightIndex = (activeIndex + 1) % total;
  const rightStory = stories[rightIndex];

  // Auto-changing slider effect (pauses on hover)
  useEffect(() => {
    if (isHovered || total <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [activeIndex, isHovered, total, autoPlayInterval]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Direct redirection on link click
  const handleActionClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (!url || url === "#") return;

    if (url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  // Touch Swipe Gesture Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) handleNext(); // Swiped Left
    if (distance < -40) handlePrev(); // Swiped Right
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="w-full bg-[#eae4d6] py-8 sm:py-10 md:py-12 relative overflow-hidden select-none"
    >
      {/* Container matching site standard max-width (1320px) */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="mb-2 sm:mb-3 max-w-[650px]">
          {/* Tagline */}
          <span className="text-[11px] sm:text-xs tracking-[0.2em] font-medium uppercase text-neutral-500 font-farro block mb-1.5">
            {tagline}
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-semibold text-[#2d2f2f] font-farro leading-[1.1] tracking-tight">
            {heading.split("\n").map((part, idx) => (
              <span key={idx}>
                {part}
                {idx < heading.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-satoshi mt-2.5 max-w-[580px]">
            {description}
          </p>
        </div>

        {/* Section Cards Area with Top Right Chevrons */}
        <div className="relative">
          {/* Top Right Navigation Controls */}
          <div className="flex items-center justify-end gap-4 mb-2 pr-2">
            <button
              onClick={handlePrev}
              aria-label="Previous story"
              className="p-1 text-neutral-600 hover:text-neutral-950 transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next story"
              className="p-1 text-neutral-600 hover:text-neutral-950 transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Main Grid: Left Card (Big) + Right Card (Short, Bottom-Aligned) */}
          <div className="flex flex-col md:flex-row items-stretch md:items-end gap-6 lg:gap-8">
            <AnimatePresence mode="wait">
              {/* LEFT CARD (FEATURED) */}
              <motion.div
                key={`left-${leftStory.id}`}
                initial={{ opacity: 0.4, x: -12, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full md:w-[58%] lg:w-[58%] bg-[#e3dcd0] rounded-[22px] sm:rounded-[28px] overflow-hidden flex flex-col justify-between shadow-xs border border-[#d8d0c2]/60 shrink-0"
              >
                {/* Image Section */}
                <div
                  onClick={(e) => handleActionClick(e, leftStory.linkUrl)}
                  className="relative w-full h-[210px] sm:h-[260px] md:h-[285px] bg-neutral-200 cursor-pointer overflow-hidden group"
                >
                  <Image
                    src={leftStory.image}
                    alt={leftStory.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {leftStory.hasPlayIcon && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-[#045922] shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 pl-0.5">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Text Content */}
                <div className="p-5 sm:p-6 md:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <h3
                      onClick={(e) => handleActionClick(e, leftStory.linkUrl)}
                      className="text-xl sm:text-2xl md:text-[23px] font-semibold font-farro text-[#2d2f2f] leading-snug tracking-tight mb-2.5 cursor-pointer hover:text-[#045922] transition-colors"
                    >
                      {leftStory.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-600 font-satoshi leading-relaxed mb-5 max-w-[480px]">
                      {leftStory.description}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={(e) => handleActionClick(e, leftStory.linkUrl)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold font-farro text-[#2d2f2f] hover:text-[#045922] transition-colors cursor-pointer"
                    >
                      <span>{leftStory.buttonText}</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT CARD (SHORTER & BOTTOM-ALIGNED) */}
              <motion.div
                key={`right-${rightStory.id}`}
                initial={{ opacity: 0.4, x: 12, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={handleNext}
                className="w-full md:w-[39%] lg:w-[39%] bg-[#e3dcd0] rounded-[18px] sm:rounded-[22px] overflow-hidden flex flex-col justify-between shadow-xs border border-[#d8d0c2]/60 cursor-pointer group shrink-0"
              >
                {/* Image Section */}
                <div className="relative w-full h-[140px] sm:h-[165px] md:h-[175px] bg-neutral-200 overflow-hidden">
                  <Image
                    src={rightStory.image}
                    alt={rightStory.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {rightStory.hasPlayIcon && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md text-[#045922] shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 pl-0.5">
                        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Text Content */}
                <div className="p-4 sm:p-4.5 md:p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-sm sm:text-base md:text-[17px] font-semibold font-farro text-[#2d2f2f] leading-snug tracking-tight mb-2 line-clamp-2 group-hover:text-[#045922] transition-colors">
                      {rightStory.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-600 font-satoshi leading-relaxed mb-4 line-clamp-2">
                      {rightStory.description}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={(e) => handleActionClick(e, rightStory.linkUrl)}
                      className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold font-farro text-[#2d2f2f] hover:text-[#045922] transition-colors cursor-pointer"
                    >
                      <span>{rightStory.buttonText}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
