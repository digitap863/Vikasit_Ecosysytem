"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface CommitmentItem {
  id: string;
  tag: string;
  title: string;
  desc: string;
}

const commitments: CommitmentItem[] = [
  {
    id: "01",
    tag: "01 / Technology",
    title: "Proprietary, not borrowed.",
    desc: "We build our own composting technology in-house, so every machine we ship is tuned for real-world waste, not a lab sample.",
  },
  {
    id: "02",
    tag: "02 / People",
    title: "Run by engineers who stay.",
    desc: "Our field and engineering teams support every site after installation — including the problems no one planned for.",
  },
  {
    id: "03",
    tag: "03 / Process",
    title: "Measured at every stage.",
    desc: "Collection, segregation, processing, composting — every step in the loop is instrumented, measured, and optimised.",
  },
];

export default function CommitmentsSection() {
  // Desktop state: Card 02 (index 1) is active featured card by default
  const [desktopActive, setDesktopActive] = useState(1);

  // Mobile state: Auto-scrolling swiper
  const [mobileActive, setMobileActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mobile auto-advance slider every 3.5 seconds
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setMobileActive((prev) => {
        const nextIdx = (prev + 1) % commitments.length;
        if (scrollRef.current && window.innerWidth < 768) {
          const cardWidth = scrollRef.current.clientWidth * 0.86;
          scrollRef.current.scrollTo({
            left: cardWidth * nextIdx,
            behavior: "smooth",
          });
        }
        return nextIdx;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleMobileScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(scrollLeft / (clientWidth * 0.86));
      setMobileActive(Math.min(Math.max(0, idx), commitments.length - 1));
    }
  };

  const scrollToMobileSlide = (idx: number) => {
    setMobileActive(idx);
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth * 0.86;
      scrollRef.current.scrollTo({
        left: cardWidth * idx,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#eae4d6] py-8 md:py-10 px-4 sm:px-6 lg:px-12 relative overflow-hidden z-10 select-none">
      <div className="max-w-[1320px] mx-auto">
        
        {/* ==================== HEADER ROW ==================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div className="space-y-2 max-w-[620px]">
            <span className="text-xs sm:text-[13px] font-semibold tracking-wider font-farro uppercase text-neutral-600 block">
              HOW WE WORK
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-farro font-extrabold text-[#1a1a1a] tracking-tight leading-[1.1]">
              Three Commitments<br />
              <span className="font-normal text-[#2d2d2d]">Behind Every Install.</span>
            </h2>

            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans pt-0.5">
              The same principles run through the Soil Maker, our WMaaS contracts, and every consulting engagement we take on.
            </p>
          </div>

          <div>
            <Link
              href="/#campaigns"
              className="inline-flex items-center gap-2 border border-[#2a2d2a]/40 hover:border-[#2a2d2a] text-[#2a2d2a] hover:bg-[#2a2d2a] hover:text-white px-5 py-2 rounded-full text-xs sm:text-sm font-medium font-satoshi transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span>View All Campaigns</span>
              <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* ==================== DESKTOP VIEW (>= 768px) ==================== */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-center py-2 min-h-[380px]">
          {commitments.map((item, index) => {
            const isFeatured = index === desktopActive;

            return (
              <div
                key={item.id}
                onClick={() => setDesktopActive(index)}
                className={`group flex flex-col items-center text-center rounded-[20px] transition-all duration-300 cursor-pointer justify-center ${
                  isFeatured
                    ? "bg-[#313030] text-white shadow-xl min-h-[380px] py-9 px-6 sm:px-8 z-20 border border-neutral-700/50"
                    : "bg-transparent text-[#1a1a1a] min-h-[310px] py-7 px-6 border border-[#2d2d2d]/35 hover:border-[#2d2d2d]/70 hover:shadow-md z-10"
                }`}
              >
                <div className="space-y-3 max-w-[320px]">
                  {/* Sub-header Tag */}
                  <span
                    className={`text-xs sm:text-sm font-medium tracking-wide font-farro block ${
                      isFeatured ? "text-neutral-400" : "text-neutral-600"
                    }`}
                  >
                    {item.tag}
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-xl sm:text-[22px] lg:text-[24px] font-satoshi leading-[1.25] ${
                      isFeatured ? "text-white " : "text-[#1a1a1a] "
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed font-satoshi ${
                      isFeatured ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================== MOBILE VIEW (< 768px) ==================== */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="md:hidden flex flex-col"
        >
          {/* Swiper Slider */}
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:-mx-6 sm:px-6"
          >
            {commitments.map((item, index) => {
              const isMobileFeatured = index === mobileActive;

              return (
                <div
                  key={item.id}
                  onClick={() => scrollToMobileSlide(index)}
                  className={`group flex flex-col items-center text-center rounded-[20px] transition-all duration-300 cursor-pointer justify-center shrink-0 w-[86vw] max-w-[350px] snap-center ${
                    isMobileFeatured
                      ? "bg-[#313030] text-white shadow-xl min-h-[420px] py-12 px-8 border border-neutral-700/50"
                      : "bg-transparent text-[#1a1a1a] min-h-[350px] py-10 px-8 border border-[#2d2d2d]/35"
                  }`}
                >
                  <div className="space-y-4 max-w-[320px]">
                    {/* Sub-header Tag */}
                    <span
                      className={`text-xs sm:text-sm font-medium tracking-wide font-farro block ${
                        isMobileFeatured ? "text-neutral-400" : "text-neutral-600"
                      }`}
                    >
                      {item.tag}
                    </span>

                    {/* Title */}
                    <h3
                      className={`text-2xl sm:text-[26px] font-farro leading-tight ${
                        isMobileFeatured ? "text-white font-bold" : "text-[#1a1a1a] font-bold"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-sans ${
                        isMobileFeatured ? "text-neutral-300" : "text-neutral-700"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Pagination Indicators */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {commitments.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToMobileSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  mobileActive === idx ? "w-6 bg-[#313030]" : "w-2 bg-neutral-400/50"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
