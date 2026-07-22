"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stage {
  id: string;
  title: string;
  desc: string;
  top: string;
  left: string;
}

const stages: Stage[] = [
  {
    id: "01",
    title: "Waste Collection",
    desc: "Efficiently collecting dry & organic waste at source from communities and corporate campuses.",
    top: "54px",
    left: "472px",
  },
  {
    id: "02",
    title: "Segregation",
    desc: "Automated and manual sorting to isolate organic components and remove recyclables.",
    top: "177px",
    left: "654px",
  },
  {
    id: "03",
    title: "Processing",
    desc: "Shredding and preparation for accelerated, odor-controlled decomposition.",
    top: "376px",
    left: "689px",
  },
  {
    id: "04",
    title: "Composting",
    desc: "High-efficiency aerobic composting transforming raw organic waste into stabilized material.",
    top: "554px",
    left: "560px",
  },
  {
    id: "05",
    title: "Healthy Soil",
    desc: "Refining and curing stable, nutrient-dense organic compost ready for farming.",
    top: "554px",
    left: "290px",
  },
  {
    id: "06",
    title: "Safe ecosystem",
    desc: "Preventing methane release, reducing landfills, and lowering overall carbon footprint.",
    top: "376px",
    left: "161px",
  },
  {
    id: "07",
    title: "Back to waste",
    desc: "Closing the loops of the circular economy by converting endpoints into new beginnings.",
    top: "129px",
    left: "234px",
  },
];

// Geometry derived from the card top/left values above (each is already a center point,
// since cards use -translate-x/y-1/2). Center of the arrangement is (425, 320), and the
// cards sit on the same radius as the existing 520px ring (radius 260).
const LOOP_CENTER = { x: 425, y: 320 };
const LOOP_RADIUS = 260;

// Bearings (degrees, clockwise from top) for each stage's position on the loop.
const STAGE_BEARINGS = [10, 58, 102, 150, 210, 258, 315];

// Midpoint bearings between consecutive stages, for small directional chevrons on the ring.
const ARROW_BEARINGS = STAGE_BEARINGS.map((b, i) => {
  const next = STAGE_BEARINGS[(i + 1) % STAGE_BEARINGS.length] + (i === STAGE_BEARINGS.length - 1 ? 360 : 0);
  return (b + next) / 2;
});

function pointOnLoop(bearingDeg: number, radius = LOOP_RADIUS) {
  const rad = (bearingDeg * Math.PI) / 180;
  return {
    x: LOOP_CENTER.x + radius * Math.sin(rad),
    y: LOOP_CENTER.y - radius * Math.cos(rad),
  };
}

const AUTO_ADVANCE_MS = 2600;

export default function CircularFlow() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth continuous circular movement (orbit) for cards and chevrons
  useEffect(() => {
    if (!mounted || hoveredIndex !== null) return; // Smoothly pause rotation when a card is hovered

    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      // Orbit at 7 degrees per second
      setRotationAngle((prev) => (prev + delta * 7) % 360);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [mounted, hoveredIndex]);

  // Auto-loop the highlighted stage index, pausing while a card is hovered
  useEffect(() => {
    if (hoveredIndex !== null) return;
    const id = setInterval(() => {
      setAutoIndex((i) => (i + 1) % stages.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [hoveredIndex]);

  const glowIndex = hoveredIndex ?? autoIndex;

  const getCenterText = () => {
    if (hoveredIndex === null) {
      return {
        title: "One machine,",
        subtitle: "one cycle,",
        desc: "closed loop",
      };
    }
    const activeStage = stages[hoveredIndex];
    return {
      title: `Stage ${activeStage.id}`,
      subtitle: activeStage.title,
      desc: activeStage.desc,
    };
  };

  const centerText = getCenterText();

  return (
    <section className="w-full bg-[#eae4d6] py-16 md:py-24 relative overflow-hidden z-10">
      {/* Background: centered world map + white center spotlight + warm corner glows */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none overflow-hidden">
        {/* Full width centered world map */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-75">
          <Image
            src="/map2.png"
            alt="World Map Background"
            fill
            priority
            className="object-contain object-center"
          />
        </div>
        {/* Soft center white radial spotlight glow behind the circular flow rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] bg-white/70 rounded-full blur-[80px] z-10" />

        {/* Soft peach glow, top-left corner */}
        {/* <div className="absolute -top-20 -left-20 w-[450px] h-[400px] bg-[#eab89a]/35 rounded-full blur-[100px] z-10" /> */}
        {/* Soft peach glow, bottom-right corner */}
        <div className="absolute -bottom-24 -right-16 w-[480px] h-[420px] bg-[#eab89a]/35 rounded-full blur-[100px] z-10" />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section — centered */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-[680px] mx-auto mb-10">
          {/* Label */}
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500 font-farro">
            THE CIRCULAR FLOW
          </span>
          {/* Heading: bold first line, normal second line */}
          <h2 className="font-farro leading-[1.08] tracking-tight text-[#2a2d2a]">
            <span className="block text-4xl sm:text-5xl md:text-[54px] font-bold">
              A Closed Loop That Turns
            </span>
            <span className="block text-4xl sm:text-5xl md:text-[54px] font-normal">
              Endings Into Beginnings.
            </span>
          </h2>
          {/* Subtitle */}
          <p className="text-sm text-neutral-500 leading-relaxed font-farro max-w-[520px] pt-1">
            Hover any stage to see how it feeds the next. Every step is instrumented, measured and optimised.
          </p>
        </div>

        {/* Circular Loop Section Layout (lg screens only) */}
        <div className="hidden lg:block w-[850px] h-[640px] relative mx-auto select-none mt-6">
          {/* Concentric Rings — unchanged, exactly as in the reference */}
          <div className="w-[160px] h-[160px] top-[240px] left-[345px] border border-neutral-400/15 rounded-full absolute pointer-events-none" />
          <div className="w-[280px] h-[280px] top-[180px] left-[285px] border border-neutral-400/15 rounded-full absolute pointer-events-none" />
          <div className="w-[400px] h-[400px] top-[120px] left-[225px] border border-neutral-400/15 rounded-full absolute pointer-events-none" />
          <div className="w-[520px] h-[520px] top-[60px] left-[165px] border border-neutral-400/15 rounded-full absolute pointer-events-none" />
          <div className="w-[640px] h-[640px] top-[0px] left-[105px] border border-neutral-400/15 rounded-full absolute pointer-events-none" />

          {/* Loop direction: small chevrons riding on the existing 520px ring */}
          <svg
            className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible"
            viewBox="0 0 850 640"
          >
            {ARROW_BEARINGS.map((bearing, i) => {
              const currentBearing = (bearing + rotationAngle) % 360;
              const { x, y } = pointOnLoop(currentBearing);
              return (
                <path
                  key={i}
                  d="M -5 -3.5 L 5 0 L -5 3.5 Z"
                  fill="#a3a3a3"
                  fillOpacity={0.45}
                  transform={`translate(${x} ${y}) rotate(${currentBearing})`}
                />
              );
            })}
          </svg>

          {/* Central Loop Badge Container (Floating Flat Vector Hexagon Ribbon — Seamless Color Binding, No White Lines) */}
          <div className="absolute top-[320px] left-[425px] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative w-[210px] h-[210px] flex items-center justify-center select-none">
              {/* SVG 6-Segment Hexagon Ribbon Loop */}
              <svg viewBox="0 0 220 220" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Central White Hexagon Background Cutout */}
                <polygon points="137.5,62.37 165,110 137.5,157.63 82.5,157.63 55,110 82.5,62.37" fill="#ffffff" />

                <g strokeLinejoin="round" strokeLinecap="round">
                  {/* Segment 1: Top (Lime Green) */}
                  <polygon points="62.5,27.73 157.5,27.73 137.5,62.37 82.5,62.37" fill="#a1cc3a" stroke="#a1cc3a" strokeWidth="0.8" />
                  {/* Segment 2: Right (Vibrant Green) */}
                  <polygon points="157.5,27.73 205,110 165,110 137.5,62.37" fill="#4cb848" stroke="#4cb848" strokeWidth="0.8" />
                  {/* Segment 3: Bottom Right (Medium Green) */}
                  <polygon points="205,110 157.5,192.27 137.5,157.63 165,110" fill="#2f8634" stroke="#2f8634" strokeWidth="0.8" />
                  {/* Segment 4: Bottom Left (Dark Forest Green) */}
                  <polygon points="157.5,192.27 62.5,192.27 82.5,157.63 137.5,157.63" fill="#175122" stroke="#175122" strokeWidth="0.8" />
                  {/* Segment 5: Left (Charcoal) */}
                  <polygon points="62.5,192.27 15,110 55,110 82.5,157.63" fill="#292d2a" stroke="#292d2a" strokeWidth="0.8" />
                  {/* Segment 6: Top Left (Dark Grey) */}
                  <polygon points="15,110 62.5,27.73 82.5,62.37 55,110" fill="#363936" stroke="#363936" strokeWidth="0.8" />
                </g>
              </svg>

              {/* Center Text inside the white hexagon cutout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-2 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredIndex ?? "default"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-center justify-center max-w-[88px]"
                  >
                    <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 leading-snug font-farro">
                      {centerText.title}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#156c2d] leading-snug font-farro">
                      {centerText.subtitle}
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-neutral-600 leading-tight font-farro mt-0.5 px-0.5 line-clamp-3">
                      {centerText.desc}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* absolute Polar Coordinate Cards (Moving Circularly) */}
          {stages.map((stage, index) => {
            const isHovered = hoveredIndex === index;
            const isGlowing = glowIndex === index && hoveredIndex === null;
            const currentBearing = (STAGE_BEARINGS[index] + rotationAngle) % 360;
            const { x, y } = pointOnLoop(currentBearing);

            return (
              <div
                key={stage.id}
                style={{
                  top: `${y}px`,
                  left: `${x}px`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div
                  className={`flex items-center gap-3 backdrop-blur-md border rounded-full p-2 pr-4 shadow-[0_4px_15px_rgba(0,0,0,0.04)] cursor-pointer select-none transition-all duration-300 ${
                    isHovered
                      ? "bg-gradient-to-r from-[#0BDB51] to-[#A1CC3A] border-transparent scale-105 shadow-[0_8px_20px_-4px_rgba(11,219,81,0.25)] text-neutral-900 font-bold"
                      : isGlowing
                      ? "bg-gradient-to-r from-[#0BDB51]/25 to-[#A1CC3A]/25 border-[#c4beaf]/60 text-neutral-800"
                      : "bg-gradient-to-r from-[#0BDB51]/15 to-[#A1CC3A]/15 border-[#c4beaf]/60 text-neutral-800"
                  }`}
                >
                  {/* Number Badge */}
                  <div
                    className={`rounded-full h-8 px-2.5 flex items-center justify-center text-xs font-bold font-farro border transition-all duration-300 ${
                      isHovered
                        ? "bg-white border-transparent text-[#125824]"
                        : "bg-white/80 border-[#0BDB51]/30 text-[#125824]"
                    }`}
                  >
                    {stage.id}
                  </div>
                  {/* Title */}
                  <span className="text-xs sm:text-sm font-semibold font-farro whitespace-nowrap">
                    {stage.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Fallback Layout (Inline Grid List) */}
        <div className="lg:hidden w-full max-w-[650px] mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="flex flex-col gap-2 bg-gradient-to-r from-[#0BDB51]/10 to-[#A1CC3A]/10 border border-[#c4beaf]/50 rounded-2xl p-4 shadow-sm hover:from-[#0BDB51]/20 hover:to-[#A1CC3A]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                {/* Number Badge */}
                <div className="rounded-full h-8 px-2.5 flex items-center justify-center text-xs font-bold font-farro bg-white border border-[#0BDB51]/30 text-[#125824]">
                  {stage.id}
                </div>
                {/* Title */}
                <h3 className="text-sm font-bold text-neutral-800 font-farro">
                  {stage.title}
                </h3>
              </div>
              {/* Description */}
              <p className="text-xs text-neutral-600 leading-relaxed font-farro mt-1 pl-1">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}