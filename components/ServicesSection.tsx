"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  desc: string;
  link: string;
}

const services: ServiceItem[] = [
  {
    id: "01",
    tag: "01/ WMaaS",
    title: "Waste Management as a Service",
    desc: "Outsource your waste management on a subscription model. Tell us the requirement, we build the process and run it — every day, including the problems you didn't plan for.",
    link: "#",
  },
  {
    id: "02",
    tag: "02/ Products",
    title: "The Soil Maker & Equipment",
    desc: "Our flagship composting machine converts organic waste into usable compost in 3—4 hours, built for real estate, facility managers and RWAs at any scale.",
    link: "#",
  },
  {
    id: "03",
    tag: "03/ Consulting",
    title: "Waste Management Consulting",
    desc: "Waste audits for government and corporates, CSR project implementation, and bio-mining & legacy waste remediation.",
    link: "#",
  },
];

export default function ServicesSection() {
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
        const nextIdx = (prev + 1) % services.length;
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
      setMobileActive(Math.min(Math.max(0, idx), services.length - 1));
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
    <section id="services" className="w-full bg-[#eae4d6] py-10 md:py-14 px-4 sm:px-6 lg:px-12 relative overflow-hidden z-10 select-none">
      <div className="max-w-[1320px] mx-auto">

        {/* ==================== DESKTOP VIEW (>= 768px) ==================== */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {services.map((item, index) => {
            const isFeatured = index === desktopActive;

            return (
              <div
                key={item.id}
                onClick={() => setDesktopActive(index)}
                className={`group flex flex-col items-center text-center rounded-[24px] p-8 sm:p-10 lg:p-12 transition-all duration-300 cursor-pointer min-h-[460px] justify-between ${isFeatured
                    ? "bg-[#353433] text-white shadow-2xl scale-[1.03] z-20 border border-neutral-700/50"
                    : "bg-transparent text-[#2a2d2a] border border-[#2a2d2a]/30 hover:border-[#2a2d2a]/60 hover:shadow-lg z-10"
                  }`}
              >
                <div>
                  {/* Icon Badge */}
                  <div
                    className={`w-13 h-13 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform duration-300 group-hover:scale-110 ${isFeatured ? "bg-[#eae4d6] text-[#2a2d2a]" : "bg-[#2a2d2a] text-white"
                      }`}
                  >
                    <Image
                      src="/ar_stickers.webp"
                      alt="Service Icon"
                      width={22}
                      height={22}
                      className={`object-contain ${isFeatured ? "" : "invert"}`}
                    />
                  </div>

                  {/* Sub-header Tag */}
                  <span
                    className={`text-xs sm:text-[13px] font-semibold tracking-wider font-satoshi mb-3 block ${isFeatured ? "text-neutral-400" : "text-neutral-600"
                      }`}
                  >
                    {item.tag}
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-2xl sm:text-[26px] font-satoshi leading-tight mb-4 min-h-[64px] flex items-center justify-center ${isFeatured ? "text-[#EAE3D2]" : "text-[#2a2d2a]"
                      }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed font-satoshi max-w-[340px] mx-auto ${isFeatured ? "text-neutral-300" : "text-neutral-600"
                      }`}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6">
                  {isFeatured ? (
                    <Link
                      href={item.link}
                      className="group/btn relative inline-flex items-center gap-2 bg-[#eae4d6] text-[#2a2d2a] rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold font-satoshi overflow-hidden transition-all duration-300 shadow-md hover:bg-white cursor-pointer"
                    >
                      <span className="relative z-10">Know more</span>
                      <span className="relative z-10 text-base leading-none transition-transform duration-300 group-hover/btn:translate-x-1">
                        →
                      </span>
                    </Link>
                  ) : (
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold font-satoshi text-[#2a2d2a] hover:gap-3 transition-all duration-300 cursor-pointer"
                    >
                      <span>Know more</span>
                      <span className="text-base leading-none">→</span>
                    </Link>
                  )}
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
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-2 pb-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:-mx-6 sm:px-6"
          >
            {services.map((item, index) => {
              const isMobileFeatured = index === mobileActive;

              return (
                <div
                  key={item.id}
                  onClick={() => scrollToMobileSlide(index)}
                  className={`group flex flex-col items-center text-center rounded-[24px] p-8 sm:p-10 transition-colors duration-500 cursor-pointer min-h-[440px] justify-between shrink-0 w-[86vw] max-w-[350px] snap-center ${
                    isMobileFeatured
                      ? "bg-[#353433] text-white shadow-xl border border-neutral-700/50"
                      : "bg-transparent text-[#2a2d2a] border border-[#2a2d2a]/30"
                  }`}
                >
                  <div>
                    {/* Icon Badge */}
                    <div
                      className={`w-13 h-13 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm ${
                        isMobileFeatured ? "bg-[#eae4d6] text-[#2a2d2a]" : "bg-[#2a2d2a] text-white"
                      }`}
                    >
                      <Image
                        src="/leaf_icon.webp"
                        alt="Service Icon"
                        width={22}
                        height={22}
                        className={`object-contain ${isMobileFeatured ? "" : "invert"}`}
                      />
                    </div>

                    {/* Sub-header Tag */}
                    <span
                      className={`text-xs font-semibold tracking-wider font-satoshi mb-3 block ${
                        isMobileFeatured ? "text-neutral-400" : "text-neutral-600"
                      }`}
                    >
                      {item.tag}
                    </span>

                    {/* Title */}
                    <h3
                      className={`text-2xl font-satoshi leading-tight mb-4 min-h-[64px] flex items-center justify-center ${
                        isMobileFeatured ? "text-[#EAE3D2]" : "text-[#2a2d2a]"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-satoshi max-w-[320px] mx-auto ${
                        isMobileFeatured ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="pt-6">
                    {isMobileFeatured ? (
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-2 bg-[#eae4d6] text-[#2a2d2a] rounded-full px-6 py-2.5 text-xs font-semibold font-satoshi shadow-md cursor-pointer"
                      >
                        <span>Know more</span>
                        <span className="text-base leading-none">→</span>
                      </Link>
                    ) : (
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-2 text-xs font-semibold font-satoshi text-[#2a2d2a] cursor-pointer"
                      >
                        <span>Know more</span>
                        <span className="text-base leading-none">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Pagination Indicators */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToMobileSlide(idx)}
                aria-label={`Go to service slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  mobileActive === idx ? "w-6 bg-[#353433]" : "w-2 bg-neutral-400/50"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
