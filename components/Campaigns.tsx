"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

export interface CampaignStat {
  value: string;
  label: string;
}

export interface Campaign {
  id: string;
  title: string;
  location: string;
  image: string;
  readUrl?: string;
  stats: CampaignStat[];
  hasArrow?: boolean;
}

const defaultCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Municipal Academy",
    location: "Place, District",
    image: "/campaigns/Rectangle 4011.png",
    readUrl: "#",
    hasArrow: true,
    stats: [
      { value: "120 Tons", label: "Food waste saved" },
      { value: "40 Tons", label: "Food waste saved" },
    ],
  },
  {
    id: "2",
    title: "ABC Group",
    location: "Bangalore",
    image: "/campaigns/cmapaign2.png",
    readUrl: "#",
    stats: [{ value: "90%", label: "Landfill Waste Reduced" }],
  },
  {
    id: "3",
    title: "Green Campus Initiative",
    location: "Bangalore",
    image: "/campaigns/campaign3.png",
    readUrl: "#",
    stats: [{ value: "250+", label: "Communities Impacted" }],
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
    <section className="w-full bg-[#ffff] py-8 sm:py-12 md:py-16 relative overflow-hidden select-none">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-farro text-[#2a2d2a] tracking-tight">
              Our Impact
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-satoshi mt-1.5 sm:mt-2">
              Real impact, Healthier communities
            </p>
          </div>

          <Link
            href="#"
            className="group relative inline-flex items-center gap-2 border border-[#2a2d2a]/80 rounded-full px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-farro text-[#2a2d2a] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md shrink-0"
          >
            {/* Animated Fill Background */}
            <span className="absolute inset-0 bg-[#2a2d2a] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full" />

            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              View All
            </span>
            <span className="relative z-10 text-base leading-none transition-all duration-300 group-hover:text-white group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Cards Grid / Swiper */}
        <div
          ref={scrollRef}
          onScroll={handleScroll} 
          className="flex md:grid md:grid-cols-3 gap-5 lg:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory py-2 pb-4 md:py-0 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0"
        >
          {campaigns.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-[22px] overflow-hidden shadow-md border border-black/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl shrink-0 w-[85vw] max-w-[380px] md:w-auto snap-center h-[150px] sm:h-[125px] md:h-[150px]"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30 transition-opacity duration-300 group-hover:from-black/90" />

              {/* Card Header Content (Title & Location) */}
              <div className="absolute top-0 inset-x-0 p-5 sm:p-6 z-10">
                <h3 className="text-white  text-base sm:text-lg md:text-[19px] font-farro leading-snug drop-shadow-sm">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm font-satoshi mt-1">
                  <svg
                    className="w-3.5 h-3.5 fill-current shrink-0 text-white/80"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Card Bottom Stats */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10">
                {item.hasArrow && item.stats.length === 2 ? (
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div>
                      <div className="text-xl sm:text-2xl md:text-[26px]  text-white font-farro leading-none drop-shadow-sm">
                        {item.stats[0].value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-white/80 font-satoshi mt-1">
                        {item.stats[0].label}
                      </div>
                    </div>

                    <svg
                      className="w-5 h-5 text-white/90 shrink-0 mt-[-10px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>

                    <div>
                      <div className="text-xl sm:text-2xl md:text-[26px]  text-white font-farro leading-none drop-shadow-sm">
                        {item.stats[1].value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-white/80 font-satoshi mt-1">
                        {item.stats[1].label}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-[32px]  text-white font-farro leading-none drop-shadow-sm">
                      {item.stats[0].value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-white/80 font-satoshi mt-1">
                      {item.stats[0].label}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Indicators */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-4">
          {campaigns.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to impact slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-6 bg-[#2a2d2a]" : "w-2 bg-neutral-400/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

