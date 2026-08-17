"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  formatThousands?: boolean;
  label: string;
}

const missionStats: StatItem[] = [
  {
    id: "orgs",
    value: 50,
    suffix: "+",
    label: "Organisations onboarded",
  },
  {
    id: "converted",
    value: 10000,
    suffix: "T+",
    formatThousands: true,
    label: "Waste converted to compost",
  },
  {
    id: "projects",
    value: 25,
    suffix: "+",
    label: "Sustainable projects completed",
  },
];

// Helper to ease out count up animation
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

function AnimatedCounter({
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

export default function AboutMissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="w-full bg-[#353433] text-white py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-24 select-none relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12"
        >
          {/* Top Text Content - Left Aligned & Perfectly Formatted */}
          <div className="max-w-[1000px] space-y-2">
            {/* Subheader Tag */}
            <span className="text-xs sm:text-[13px] font-normal tracking-widest text-neutral-400 uppercase block font-sans">
              OUR MISSION
            </span>

            {/* Mission Statement */}
            <h2
              style={{ textShadow: "0px 3px 8px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.15)" }}
              className="text-lg sm:text-xl md:text-2xl lg:text-[24px] font-normal leading-[1.45] text-[#EAE3D2] font-satoshi tracking-tight"
            >
              Bring Technology, People, And Process Together To Build Waste Management That Lasts. Waste Isn&apos;t The Problem — The Way We Handle It Is. As Long As There Is Life, There Will Be Waste. The Least We Owe Future Generations Is To Make That Handling Robust And Sustainable.
            </h2>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-6 pt-3 font-sans">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#056826] hover:bg-[#04521e] text-white px-6 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <span>Get In Touch</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>

              <span className=" text-xs sm:text-sm font-sans text-[#EAE3D2]">
                - We&apos;re building it now.
              </span>
            </div>
          </div>

          {/* Bottom Running Values Stats Grid */}
          <div className="pt-10 border-t border-neutral-700/60">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-center">
              {missionStats.map((stat, idx) => (
                <div
                  key={stat.id}
                  className={`flex flex-col items-center text-center md:px-8 ${
                    idx !== missionStats.length - 1 ? "md:border-r md:border-neutral-700/60" : ""
                  }`}
                >
                  {/* Counter Value */}
                  <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight font-satoshi leading-none mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      formatThousands={stat.formatThousands}
                      inView={isInView}
                    />
                  </h3>

                  {/* Counter Label */}
                  <p className="text-xs sm:text-[13px] font-sans">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
