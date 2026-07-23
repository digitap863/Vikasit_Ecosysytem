"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

export interface Campaign {
  id: string;
  title: string;
  date: string;
  image: string;
  readUrl: string;
}

// Temporary static campaigns data (ready for backend API integration)
const defaultCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Green Communities Start With Smart Waste Management",
    date: "July 31, 2026",
    image: "/campaigns/Rectangle 4011.png",
    readUrl: "#",
  },
  {
    id: "2",
    title: "Experience The Soil Maker Live",
    date: "August 1, 2026",
    image: "/campaigns/cmapaign2.png",
    readUrl: "#",
  },
  {
    id: "3",
    title: "CSR for Sustainable Waste Management",
    date: "August 3, 2026",
    image: "/campaigns/campaign3.png",
    readUrl: "#",
  },
];

interface CampaignsProps {
  campaigns?: Campaign[];
}

export default function Campaigns({ campaigns = defaultCampaigns }: CampaignsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / (clientWidth * 0.82));
      setActiveIndex(Math.min(index, campaigns.length - 1));
    }
  };

  const scrollToSlide = (idx: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.82;
    scrollRef.current.scrollTo({
      left: cardWidth * idx,
      behavior: "smooth",
    });
    setActiveIndex(idx);
  };

  return (
    <section className="w-full bg-[#eae4d6] py-8 md:py-24 relative overflow-hidden z-10">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-[700px] space-y-3">
            {/* Tagline */}
            <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-neutral-500 font-farro">
              OUR CAMPAIGNS
            </span>
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-farro leading-[1.12] text-[#2a2d2a]">
              Creating A Waste–Free Future,
              <br />
              <span className="font-normal">One Community At A Time</span>
            </h2>
            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-satoshi pt-1 max-w-[580px]">
              Every campaign is designed to educate, inspire, and empower communities to transform
              organic waste into valuable resources. Join us in building a cleaner, greener, and more
              sustainable India.
            </p>
          </div>

          {/* View All Button — Desktop top right only */}
          <div className="hidden md:block shrink-0 pt-2 md:pt-0">
            <Link
              href="#"
              className="group relative inline-flex items-center gap-2.5 border border-[#2a2d2a]/80 rounded-full px-6 py-2.5 text-xs sm:text-sm  font-farro text-[#2a2d2a] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Animated Fill Background */}
              <span className="absolute inset-0 bg-[#2a2d2a] -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out rounded-full" />

              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                View All Campaigns
              </span>
              <span className="relative z-10 text-base leading-none transition-all duration-300 group-hover:text-white group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Campaign Cards Container — Swiper on mobile (< md), 3-Column Grid on desktop (>= md) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory py-2 pb-4 md:py-0 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0"
        >
          {campaigns.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col rounded-2xl overflow-hidden shadow-md border border-[#c4beaf]/40 bg-[#eae4d6] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl shrink-0 w-[86vw] max-w-[370px] md:w-auto snap-center"
            >
              {/* Card Image */}
              <div className="relative w-full h-[195px] sm:h-[190px] overflow-hidden bg-neutral-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title Section (Dark Green Banner) */}
              <div className="bg-[#045922] px-4.5 py-3.5 sm:px-5 sm:py-4 min-h-[82px] sm:min-h-[88px] flex items-center">
                <h3 className="text-white font-thin text-sm sm:text-base md:text-[17px] leading-snug font-farro line-clamp-2">
                  {item.title}
                </h3>
              </div>

              {/* Card Footer */}
              <div className="px-4.5 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between bg-[#eae4d6] border-t border-[#045922]/10 mt-auto">
                <span className="text-xs sm:text-[13px] text-neutral-600 font-farro">
                  {item.date}
                </span>
                <Link
                  href={item.readUrl}
                  className="text-xs sm:text-[13px] font-semibold text-[#3b66d4] hover:underline font-farro"
                >
                  Read
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swiper Pagination Indicators */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-4">
          {campaigns.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to campaign slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-6 bg-[#045922]" : "w-2 bg-neutral-400/50"
              }`}
            />
          ))}
        </div>

        {/* View All Button — Mobile bottom centered only */}
        <div className="flex md:hidden justify-center mt-6">
          <Link
            href="#"
            className="group relative inline-flex items-center gap-2.5 border border-[#2a2d2a]/80 rounded-full px-6 py-2.5 text-xs  font-farro text-[#2a2d2a] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {/* Animated Fill Background */}
            <span className="absolute inset-0 bg-[#2a2d2a] -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out rounded-full" />

            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              View All Campaigns
            </span>
            <span className="relative z-10 text-base leading-none transition-all duration-300 group-hover:text-white group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
