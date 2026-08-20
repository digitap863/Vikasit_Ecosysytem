"use client";

import { useState, useRef, useEffect } from "react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import VideoModal from "@/components/VideoModal";

export interface VideoCampaign {
  id: string;
  title: string;
  videoUrl: string;
  tag?: string;
}

const defaultVideos: VideoCampaign[] = [
  {
    id: "1",
    title: "Organic Waste Processing & Biomass Transformation",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.27.23 PM.mp4",
    tag: "Campaign 01",
  },
  {
    id: "2",
    title: "Decentralized Composting & Resource Recovery",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.27.23 PM (1).mp4",
    tag: "Campaign 02",
  },
  {
    id: "3",
    title: "On-Site Waste Segregation & Tech Automation",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.27.23 PM (2).mp4",
    tag: "Campaign 03",
  },
  {
    id: "4",
    title: "Sustainable Municipal & Institutional Impact",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.45.24 PM.mp4",
    tag: "Campaign 04",
  },
  {
    id: "5",
    title: "Biomass Resource Conversion & Operations",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.45.41 PM.mp4",
    tag: "Campaign 05",
  },
  {
    id: "6",
    title: "Circular Organic Waste Ecosystem",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.46.19 PM.mp4",
    tag: "Campaign 06",
  },
];

interface CampaignsProps {
  videos?: VideoCampaign[];
  autoPlayInterval?: number; // Default 3500ms
}

export default function Campaigns({
  videos = defaultVideos,
  autoPlayInterval = 3500,
}: CampaignsProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoCampaign | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto swiping timer effect (Pauses on hover or when modal is open)
  useEffect(() => {
    if (isHovered || selectedVideo !== null || videos.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIdx = (prev + 1) % videos.length;
        if (scrollRef.current) {
          const firstChild = scrollRef.current.firstElementChild as HTMLElement;
          if (firstChild) {
            const cardWidth = firstChild.offsetWidth + 24; // 24px gap
            scrollRef.current.scrollTo({
              left: cardWidth * nextIdx,
              behavior: "smooth",
            });
          }
        }
        return nextIdx;
      });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isHovered, selectedVideo, videos.length, autoPlayInterval]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const firstChild = scrollRef.current.firstElementChild as HTMLElement;
    if (firstChild) {
      const cardWidth = firstChild.offsetWidth + 24; // 24px gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, index), videos.length - 1));
    }
  };

  const scrollToSlide = (idx: number) => {
    const targetIdx = Math.min(Math.max(0, idx), videos.length - 1);
    setActiveIndex(targetIdx);
    if (!scrollRef.current) return;
    const firstChild = scrollRef.current.firstElementChild as HTMLElement;
    if (firstChild) {
      const cardWidth = firstChild.offsetWidth + 24;
      scrollRef.current.scrollTo({
        left: cardWidth * targetIdx,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    scrollToSlide(activeIndex === 0 ? videos.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    scrollToSlide((activeIndex + 1) % videos.length);
  };

  return (
    <section
      id="campaigns"
      className="w-full bg-[#ffff] py-10 sm:py-14 md:py-20 relative overflow-hidden select-none"
    >
      <ScrollAnimation
        variant="fade-up"
        className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-12"
      >
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-row items-end justify-between gap-4 mb-8 sm:mb-10 md:mb-12">
          <div>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider font-farro text-[#2a2d2a]/70 block mb-1">
              Field Stories & Action
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-farro text-[#2a2d2a] tracking-tight">
              Our Project Videos
            </h2>
          </div>

          {/* Navigation Controls (Left/Right Arrows) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous video"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#2a2d2a]/30 flex items-center justify-center transition-all duration-300 hover:bg-[#2a2d2a] hover:text-white hover:border-[#2a2d2a] text-[#2a2d2a] shadow-sm hover:scale-105"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next video"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#2a2d2a]/30 flex items-center justify-center transition-all duration-300 hover:bg-[#2a2d2a] hover:text-white hover:border-[#2a2d2a] text-[#2a2d2a] shadow-sm hover:scale-105"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop & Mobile Swiper Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-2 pb-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-12 lg:px-12"
        >
          {videos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedVideo(item)}
              className="group relative rounded-[22px] overflow-hidden shadow-md border border-black/10 bg-neutral-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer shrink-0 w-[82vw] sm:w-[320px] md:w-[340px] lg:w-[360px] snap-start aspect-[4/5] flex flex-col justify-between"
            >
              {/* Background Video Frame Preview */}
              <video
                src={item.videoUrl}
                preload="metadata"
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 pointer-events-none"
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 transition-opacity duration-300 pointer-events-none" />

              {/* Top Tag Badge */}
              {/* <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                {item.tag && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase font-farro text-white bg-black/40 backdrop-blur-md border border-white/20">
                    {item.tag}
                  </span>
                )}
              </div> */}

              {/* Center Play Icon Overlay */}
              <div className="relative z-10 flex items-center justify-center pointer-events-none my-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-lg">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 translate-x-0.5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Bottom Title Details */}
              <div className="relative z-10 p-5 sm:p-6">
                <h3 className="text-white text-base sm:text-lg font-bold font-farro leading-snug drop-shadow-sm line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Swiper Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to video slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-6 bg-[#2a2d2a]"
                  : "w-2 bg-neutral-400/50 hover:bg-neutral-600"
              }`}
            />
          ))}
        </div>
      </ScrollAnimation>

      {/* Video Modal Component */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl || null}
        title={selectedVideo?.title}
      />
    </section>
  );
}
