"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  formatThousands?: boolean;
  label: string;
}

const statsData: StatItem[] = [
  {
    id: "orgs",
    value: 500,
    suffix: "+",
    label: "Organisations",
  },
  {
    id: "converted",
    value: 10000,
    suffix: " T",
    formatThousands: true,
    label: "Converted",
  },
  {
    id: "sustainable",
    value: 250,
    suffix: "+",
    label: "Sustainable projects",
  },
];

// Helper to ease out count up animation
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  formatThousands = false,
  duration = 2200,
  inView = false,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  formatThousands?: boolean;
  duration?: number;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.floor(easedProgress * value);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [inView, value, duration]);

  const formattedNumber = formatThousands
    ? displayValue.toLocaleString("en-US")
    : displayValue.toString();

  return (
    <span>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#eae4d6] py-10 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden select-none"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Layout: Inverted Triangle on Mobile (2 top, 1 centered bottom), 3-Column on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 sm:gap-6 md:gap-8 lg:gap-16 items-center justify-center">
          {statsData.map((item, index) => {
            const isConverted = item.id === "converted";
            const isLastMobileItem = index === 2; // Sustainable projects item forms the bottom vertex of inverted triangle on mobile

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.18,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className={`relative flex flex-col items-center justify-center text-center py-4 sm:py-8 min-h-[120px] sm:min-h-[160px] ${
                  isLastMobileItem ? "col-span-2 sm:col-span-1" : "col-span-1"
                }`}
              >
                {/* Background Geometric Watermark Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] pointer-events-none select-none mix-blend-multiply">
                  <Image
                    src="/stats_vector.png"
                    alt="Stats Vector Watermark"
                    width={170}
                    height={170}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>

                {/* Counter Value */}
                <h3
                  className={`relative top-0 sm:top-3 z-10 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal tracking-tight text-[#1c1917] font-satoshi leading-none mb-1 sm:mb-3 ${
                    isConverted
                      ? "left-10 sm:left-10 md:left-[125px]"
                      : "left-10 sm:left-12 md:left-20"
                  }`}
                >
                  <AnimatedNumber
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    formatThousands={item.formatThousands}
                    inView={isInView}
                  />
                </h3>

                {/* Subtitle / Label */}
                <p
                  className={`relative z-10 text-xs sm:text-xs md:text-sm font-medium tracking-wide text-[#383531] font-satoshi ${
                    isConverted
                      ? "left-10 sm:left-[90px] md:left-[145px]"
                      : "left-10 sm:left-12 md:left-20"
                  }`}
                >
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
