"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiUser, FiBox, FiHome } from "react-icons/fi";

interface JoinUsItem {
  id: string;
  icon: typeof FiUser;
  title: string;
  desc: string;
  actionText: string;
  link: string;
}

const joinUsData: JoinUsItem[] = [
  {
    id: "01",
    icon: FiUser,
    title: "Individuals",
    desc: "Take the pledge to segregate at source and keep organic waste out of landfills.",
    actionText: "Take the Pledge",
    link: "/contact",
  },
  {
    id: "02",
    icon: FiBox,
    title: "Corporates",
    desc: "Partner with us on CSR-backed waste management and legacy waste remediation.",
    actionText: "Partner With Us",
    link: "/contact",
  },
  {
    id: "03",
    icon: FiHome,
    title: "Communities",
    desc: "Build cleaner neighbourhoods with on-site Soil Maker installs for RWAs and campuses.",
    actionText: "Explore Products",
    link: "/services",
  },
];

export default function JoinUsSection() {
  const [desktopActive, setDesktopActive] = useState(1);
  const [mobileActive, setMobileActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setMobileActive((prev) => {
        const nextIdx = (prev + 1) % joinUsData.length;
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
      setMobileActive(Math.min(Math.max(0, idx), joinUsData.length - 1));
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
    <section className="w-full bg-[#eae4d6] py-10 sm:py-14 px-4 sm:px-6 lg:px-12 relative overflow-hidden z-10 select-none">
      <div className="max-w-[1320px] mx-auto space-y-10">
        
        {/* Header Content */}
        <div className="space-y-3 max-w-[840px]">
          <span className="text-xs sm:text-[13px] font-semibold tracking-wider font-satoshi uppercase text-neutral-600 block">
            JOIN US
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-farro font-extrabold text-[#1a1a1a] tracking-tight leading-[1.15]">
            Our Leadership Shows Up For One Goal<br />
            <span className="font-normal text-[#2d2d2d]">— Resource Value Up, Environmental</span><br />
            <span className="font-normal text-[#2d2d2d]">Impact Down.</span>
          </h2>

          <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans pt-1 max-w-[580px]">
            The same principles run through the Soil Maker, our WMaaS contracts, and every consulting engagement we take on.
          </p>
        </div>

        {/* Desktop Cards Grid (>= 768px) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-center py-4 min-h-[380px]">
          {joinUsData.map((item, index) => {
            const isFeatured = index === desktopActive;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => setDesktopActive(index)}
                className={`group flex flex-col justify-between text-left rounded-[20px] transition-all duration-300 cursor-pointer ${
                  isFeatured
                    ? "bg-[#333333] text-white shadow-2xl min-h-[280px] p-8 sm:p-10 z-20 border border-neutral-700/50"
                    : "bg-transparent text-[#1a1a1a] min-h-[230px] p-8 border border-[#2d2d2d]/30 hover:border-[#2d2d2d]/60 hover:shadow-lg z-10"
                }`}
              >
                <div className="space-y-5">
                  {/* Icon Badge Container */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105 ${
                      isFeatured ? "bg-[#eae4d6] text-[#1a1a1a]" : "bg-[#2a2d2a] text-white"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3
                      className={`text-2xl sm:text-[26px] font-satoshi  leading-tight ${
                        isFeatured ? "text-white" : "text-[#1a1a1a]"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-sans ${
                        isFeatured ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-6">
                  <Link
                    href={item.link}
                    className={`inline-flex items-center gap-2 text-xs sm:text-sm  font-sans transition-all duration-300 hover:gap-3 cursor-pointer ${
                      isFeatured ? "text-white hover:text-neutral-200" : "text-[#1a1a1a] hover:text-[#056826]"
                    }`}
                  >
                    <span>{item.actionText}</span>
                    <span className="text-base leading-none">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View (< 768px) */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="md:hidden flex flex-col"
        >
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:-mx-6 sm:px-6"
          >
            {joinUsData.map((item, index) => {
              const isMobileFeatured = index === mobileActive;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => scrollToMobileSlide(index)}
                  className={`group flex flex-col justify-between text-left rounded-[20px] transition-all duration-300 cursor-pointer shrink-0 w-[86vw] max-w-[350px] snap-center ${
                    isMobileFeatured
                      ? "bg-[#333333] text-white shadow-xl min-h-[360px] p-8 border border-neutral-700/50"
                      : "bg-transparent text-[#1a1a1a] min-h-[310px] p-8 border border-[#2d2d2d]/30"
                  }`}
                >
                  <div className="space-y-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs ${
                        isMobileFeatured ? "bg-[#eae4d6] text-[#1a1a1a]" : "bg-[#2a2d2a] text-white"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                      <h3
                        className={`text-2xl font-satoshi font-bold leading-tight ${
                          isMobileFeatured ? "text-white" : "text-[#1a1a1a]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed font-sans ${
                          isMobileFeatured ? "text-neutral-300" : "text-neutral-600"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={item.link}
                      className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-sans ${
                        isMobileFeatured ? "text-white" : "text-[#1a1a1a]"
                      }`}
                    >
                      <span>{item.actionText}</span>
                      <span className="text-base leading-none">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-2 mt-6">
            {joinUsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToMobileSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  mobileActive === idx ? "w-6 bg-[#333333]" : "w-2 bg-neutral-400/50"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
