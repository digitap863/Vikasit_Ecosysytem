"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const START_FRAME = 0;
const END_FRAME = 227;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;

export default function BannerScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const scrollBadgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const scale = window.devicePixelRatio || 1;
    const frameState = { frame: 0 };
    const images: HTMLImageElement[] = [];

    const render = () => {
      const img = imagesRef.current[frameState.frame] || images[frameState.frame];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const canvasWidth = canvas.width / scale;
      const canvasHeight = canvas.height / scale;
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let drawX = 0;
      let drawY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvasWidth / imgRatio;
        drawY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        drawX = (canvasWidth - drawWidth) / 2;
      }

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    const updateCanvasSize = () => {
      if (!canvas || !sectionRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      context.scale(scale, scale);
      render();
    };

    for (let i = START_FRAME; i <= END_FRAME; i++) {
      const img = new window.Image();
      const index = i - START_FRAME;
      const frameNum = String(i).padStart(5, "0");
      img.src = `/Banner_frames/Comp 1_${frameNum}.jpg`;

      img.onload = () => {
        if (frameState.frame === index) render();
      };
      img.onerror = () => {
        console.error("Missing banner frame:", img.src);
      };

      images.push(img);
    }
    imagesRef.current = images;

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    if (images[0]) {
      images[0].addEventListener("load", render);
      if (images[0].complete) render();
    }

    // GSAP ScrollTrigger Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=6500",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // 1. Frame progression over 100% of scroll
    tl.to(
      frameState,
      {
        frame: TOTAL_FRAMES - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render,
        duration: 1,
      },
      0
    );

    // 2. Fade out mouse scroll badge on initial scroll
    if (scrollBadgeRef.current) {
      tl.to(
        scrollBadgeRef.current,
        {
          opacity: 0,
          y: -16,
          duration: 0.08,
          ease: "power1.in",
        },
        0
      );
    }

    // 3. Dynamic Title Slides Crossfade Timeline
    const slide1 = textRef.current?.querySelector(".slide-1");
    const slide2 = textRef.current?.querySelector(".slide-2");
    const slide3 = textRef.current?.querySelector(".slide-3");

    if (slide1 && slide2 && slide3) {
      gsap.set(slide1, { opacity: 1, y: 0, pointerEvents: "auto" });
      gsap.set([slide2, slide3], { opacity: 0, y: 25, pointerEvents: "none" });

      // Slide 1 (0% -> 32% Scroll)
      tl.to(slide1, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.1, ease: "power1.out" }, 0.02)
        .to(slide1, { opacity: 0, y: -25, pointerEvents: "none", duration: 0.08, ease: "power1.in" }, 0.30);

      // Slide 2 (36% -> 66% Scroll)
      tl.to(slide2, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.1, ease: "power1.out" }, 0.36)
        .to(slide2, { opacity: 0, y: -25, pointerEvents: "none", duration: 0.08, ease: "power1.in" }, 0.64);

      // Slide 3 (70% -> 100% Scroll)
      tl.to(slide3, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.1, ease: "power1.out" }, 0.70);
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (images[0]) {
        images[0].removeEventListener("load", render);
      }
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#eae4d6]">
      <style>{`
        @keyframes mouse-wheel {
          0%   { transform: translateY(0px); opacity: 1; }
          50%  { transform: translateY(6px); opacity: 0.3; }
          100% { transform: translateY(0px); opacity: 1; }
        }
        .hero-mouse-wheel {
          animation: mouse-wheel 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Canvas container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-hidden origin-center bg-[#eae4d6]"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Full-width Bottom Dark Depth Shadow Overlay */}
        <div className="absolute bottom-0 inset-x-0 h-[38%] bg-gradient-to-t from-[#1c140d]/65 via-[#1c140d]/30 to-transparent pointer-events-none z-[3]" />

        {/* Bottom Centered Animated Mouse Scroll Indicator Only */}
        <div
          ref={scrollBadgeRef}
          className="absolute bottom-8 inset-x-0 z-30 flex justify-center pointer-events-none select-none"
        >
          <div className="bg-black/45 backdrop-blur-md px-3.5 py-3 rounded-full border border-white/20 shadow-xl flex items-center justify-center">
            <div className="w-5 h-8 border-2 border-white/90 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-emerald-400 rounded-full hero-mouse-wheel" />
            </div>
          </div>
        </div>

        {/* Dynamic Multi-Stage Title Overlay Container */}
        <div
          ref={textRef}
          className="absolute inset-0 z-20 flex flex-col justify-center sm:justify-start sm:pt-32 md:justify-center md:pt-0 px-6 sm:px-12 md:px-20 lg:px-32 select-none pointer-events-none"
        >
          <div className="relative max-w-4xl w-full min-h-[380px] flex items-center">
            {/* Title Slide 1: 0% - 32% Scroll */}
            <div className="slide-1 absolute inset-0 flex flex-col justify-center pointer-events-auto opacity-100">
              <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-neutral-900 mb-3 font-farro inline-block bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-black/10 shadow-xs w-fit">
                Regenerative Waste Infrastructure
              </span>
              <h1 className="font-farro text-3xl sm:text-5xl md:text-[62px] font-bold text-[#1b3022] leading-[1.08] mb-4 tracking-tight drop-shadow-xs">
                Turning Today&apos;s<br />
                Waste Into<br />
                Tomorrow&apos;s <span className="text-[#056826]">Soil</span>
              </h1>
              <p className="font-farro text-neutral-800 text-sm sm:text-base md:text-[18px] leading-[1.55] max-w-[620px] mb-6 font-medium drop-shadow-xs">
                Vikasit Ecosystems builds a circular economy for organic waste through proprietary composting technology, end-to-end services and consulting for a cleaner, waste-free India.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-farro w-full sm:w-auto">
                <Button href="/products" variant="dark" showArrow size="lg">
                  Explore Products
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Download Brochure
                </Button>
              </div>
            </div>

            {/* Title Slide 2: 36% - 64% Scroll */}
            <div className="slide-2 absolute inset-0 flex flex-col justify-center pointer-events-none opacity-0 translate-y-6">
              <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-neutral-900 mb-3 font-farro inline-block bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-black/10 shadow-xs w-fit">
                On-Site Composting Automation
              </span>
              <h1 className="font-farro text-3xl sm:text-5xl md:text-[62px] font-bold text-[#1b3022] leading-[1.08] mb-4 tracking-tight drop-shadow-xs">
                High-Capacity<br />
                <span className="text-[#056826]">Soil Maker</span><br />
                Technology
              </h1>
              <p className="font-farro text-neutral-800 text-sm sm:text-base md:text-[18px] leading-[1.55] max-w-[620px] mb-6 font-medium drop-shadow-xs">
                Automated batch cycles converting bulk municipal & commercial wet waste into dark, nutrient-rich organic soil additive directly on site.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-farro w-full sm:w-auto">
                <Button href="/products" variant="dark" showArrow size="lg">
                  View Soil Maker OWC
                </Button>
                <Button href="/services" variant="outline" size="lg">
                  Our Services
                </Button>
              </div>
            </div>

            {/* Title Slide 3: 70% - 100% Scroll */}
            <div className="slide-3 absolute inset-0 flex flex-col justify-center pointer-events-none opacity-0 translate-y-6">
              <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-neutral-900 mb-3 font-farro inline-block bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-black/10 shadow-xs w-fit">
                Zero-Landfill Circular Economy
              </span>
              <h1 className="font-farro text-3xl sm:text-5xl md:text-[62px] font-bold text-[#1b3022] leading-[1.08] mb-4 tracking-tight drop-shadow-xs">
                Building A<br />
                <span className="text-[#056826]">Garbage-Free</span><br />
                Future
              </h1>
              <p className="font-farro text-neutral-800 text-sm sm:text-base md:text-[18px] leading-[1.55] max-w-[620px] mb-6 font-medium drop-shadow-xs">
                Decentralized waste processing infrastructure empowering townships, tech parks, and cities across India to achieve complete waste independence.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-farro w-full sm:w-auto">
                <Button href="/projects" variant="dark" showArrow size="lg">
                  Explore Field Projects
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
