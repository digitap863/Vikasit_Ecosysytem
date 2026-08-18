"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ScrollAnimation from "@/components/ui/ScrollAnimation";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "RAMESH SHETTY",
    role: "FACILITY MANAGER, MANIPAL ACADEMY",
    quote:
      "The Soil maker machine has been a game-changer for our waste management process. It efficiently converts wet waste into nutrient-rich soil, helping us maintain a cleaner and greener campus.",
    avatar: "/avatar1.webp",
  },
  {
    id: 2,
    name: "ANITA DESAI",
    role: "SUSTAINABILITY HEAD, BRIGADE GROUP",
    quote:
      "Partnering with Vikasit Ecosystems eliminated our legacy waste issues. Their automated WMaaS subscription keeps our premises 100% eco-compliant effortlessly day in and day out.",
    avatar: "/avatar2.webp",
  },
  {
    id: 3,
    name: "VIKRAM MALHOTRA",
    role: "OPERATIONS DIRECTOR, SOBHA DEVELOPERS",
    quote:
      "Outstanding engineering and fast turnaround. The organic compost produced right on site has transformed our community landscaping while reducing landfill dumping to zero.",
    avatar: "/avatar3.webp",
  },
  {
    id: 4,
    name: "RAMESH",
    role: "FACILITY MANAGER, MANIPAL ACADEMY",
    quote:
      "The Soil maker machine has been a game-changer for our waste management process. It efficiently converts wet waste into nutrient-rich soil, helping us maintain a cleaner and greener campus.",
    avatar: "/avatar1.webp",
  },
  {
    id: 5,
    name: "ANITA",
    role: "SUSTAINABILITY HEAD, BRIGADE GROUP",
    quote:
      "Partnering with Vikasit Ecosystems eliminated our legacy waste issues. Their automated WMaaS subscription keeps our premises 100% eco-compliant effortlessly day in and day out.",
    avatar: "/avatar2.webp",
  },
  {
    id: 6,
    name: "VIKRAM",
    role: "OPERATIONS DIRECTOR, SOBHA DEVELOPERS",
    quote:
      "Outstanding engineering and fast turnaround. The organic compost produced right on site has transformed our community landscaping while reducing landfill dumping to zero.",
    avatar: "/avatar3.webp",
  },
];

interface ClientTestimonialsProps {
  autoPlayInterval?: number; // default 5000ms
}

export default function ClientTestimonials({ autoPlayInterval = 3000 }: ClientTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = testimonials.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Autoplay Effect (Pauses on hover)
  useEffect(() => {
    if (isHovered || total <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [activeIndex, isHovered, total, autoPlayInterval]);

  // Touch Swipe Handlers for mobile & desktop drag
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
      className="w-full bg-[#eae4d6] px-3 sm:px-6 lg:px-12 relative overflow-hidden select-none py-6 sm:py-10"
    >
      <ScrollAnimation variant="fade-up" className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <h2 className="text-2xl sm:text-4xl md:text-[44px] font-bold text-center text-[#2d2f2f] font-ferro mb-6 sm:mb-14 tracking-tight">
          What Our Clients Say.
        </h2>

        {/* 3D Carousel Container */}
        <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[390px] md:min-h-[440px] overflow-hidden py-2 sm:py-4">
          {testimonials.map((item, index) => {
            // Calculate relative offset from active index
            let position = index - activeIndex;
            if (position < -1) position += total;
            if (position > 1) position -= total;

            const isActive = position === 0;
            const isLeft = position === -1 || (activeIndex === 0 && index === total - 1);
            const isRight = position === 1 || (activeIndex === total - 1 && index === 0);

            // 3D positioning classes
            let transformClass = "scale-90 opacity-0 pointer-events-none blur-none";
            if (isActive) {
              transformClass = "scale-100 opacity-100 z-20 shadow-2xl translate-x-0 blur-none filter-none";
            } else if (isLeft) {
              transformClass =
                "scale-90 opacity-25 z-10 -translate-x-[65%] sm:-translate-x-[55%] md:-translate-x-[50%] blur-[2px] cursor-pointer hover:opacity-40";
            } else if (isRight) {
              transformClass =
                "scale-90 opacity-25 z-10 translate-x-[65%] sm:translate-x-[55%] md:translate-x-[50%] blur-[2px] cursor-pointer hover:opacity-40";
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                }}
                className={`absolute transition-all duration-500 ease-out w-[92%] sm:w-[90%] max-w-[340px] sm:max-w-[580px] md:max-w-[680px] h-[280px] sm:h-[380px] md:h-[430px] rounded-[18px] sm:rounded-[24px] overflow-hidden ${transformClass}`}
              >
                {/* Background Image */}
                <Image
                  src="/client_bg.webp"
                  alt="Client Background"
                  fill
                  className={`object-cover ${isActive ? "blur-none brightness-100" : "blur-[1px]"}`}
                  priority={isActive}
                />

                {/* White Speech Bubble Container */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-5 sm:left-6 sm:right-6 bg-white rounded-[14px] sm:rounded-[20px] pt-5 sm:pt-9 pb-3.5 sm:pb-6 px-3 sm:px-8 text-center shadow-xl">
                  {/* Avatar */}
                  <div className="absolute -top-5 sm:-top-8 left-1/2 -translate-x-1/2 w-11 h-11 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-white overflow-hidden shadow-md bg-neutral-200">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Quote Body */}
                  <p className="italic text-[11px] sm:text-sm md:text-[14px] leading-snug sm:leading-relaxed text-neutral-700 font-satoshi max-w-[520px] mx-auto mb-1.5 sm:mb-3">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Author Name */}
                  <h4 className="font-bold text-[11px] sm:text-sm tracking-wider text-[#1e7e34] uppercase font-satoshi">
                    {item.name}
                  </h4>

                  {/* Author Role */}
                  <p className="text-[9px] sm:text-[11px] font-semibold text-neutral-500 tracking-wider uppercase font-satoshi mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Chevron Controls */}
        <div className="flex items-center justify-center gap-8 mt-6 sm:mt-8">
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="p-2 text-neutral-700 hover:text-neutral-950 transition-colors duration-200 cursor-pointer focus:outline-none"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="p-2 text-neutral-700 hover:text-neutral-950 transition-colors duration-200 cursor-pointer focus:outline-none"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </ScrollAnimation>
    </section>
  );
}
