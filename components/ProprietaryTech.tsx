"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProprietaryTech() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textHeadingRef = useRef<HTMLHeadingElement>(null);
  const textParaRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet (768px and up): Premium GSAP ScrollTrigger Pinned Animation
    mm.add("(min-width: 768px)", () => {
      gsap.set(cardRef.current, {
        width: "40vw",
        height: "50vh",
        borderRadius: "40px",
        overflow: "hidden",
      });

      gsap.set(bgImgRef.current, {
        scale: 1.35,
        transformOrigin: "center center",
      });

      gsap.set(overlayRef.current, {
        opacity: 0,
      });

      const animItems = [
        textHeadingRef.current,
        textParaRef.current,
        badgesRef.current,
      ].filter(Boolean);

      gsap.set(animItems, {
        opacity: 0,
        y: 60,
      });

      // Pinned scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Expand Card Container to 100% width and 580px height
      tl.to(
        cardRef.current,
        {
          width: "100%",
          height: "580px",
          borderRadius: "32px",
          ease: "power2.inOut",
          duration: 0.8,
        },
        0
      );

      // 2. Zoom out background image from 1.35x -> 1.0x
      tl.to(
        bgImgRef.current,
        {
          scale: 1.0,
          ease: "power2.inOut",
          duration: 0.8,
        },
        0
      );

      // 3. Fade in dark overlay gradient
      tl.to(
        overlayRef.current,
        {
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.8,
        },
        0
      );

      // 4. Stagger text & badges in when card expansion is nearly complete
      tl.to(
        animItems,
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: "power2.out",
          duration: 0.35,
        },
        0.72
      );
    });

    // Mobile (below 768px): Clean static card layout without scroll pinning
    mm.add("(max-width: 767px)", () => {
      gsap.set(cardRef.current, { clearProps: "all" });
      gsap.set(bgImgRef.current, { clearProps: "all" });
      gsap.set(overlayRef.current, { opacity: 1 });

      const animItems = [
        textHeadingRef.current,
        textParaRef.current,
        badgesRef.current,
      ].filter(Boolean);

      gsap.set(animItems, {
        opacity: 1,
        y: 0,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="w-full md:h-screen bg-[#eae4d6] py-10 md:py-0 flex items-center justify-center relative overflow-hidden z-10 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-[1320px] w-full mx-auto flex items-center justify-center">
        {/* Banner Card */}
        <div
          ref={cardRef}
          className="relative mx-auto w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl min-h-[500px] sm:min-h-[540px] md:min-h-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16 border border-neutral-800/40"
        >
          {/* Background Image: tree.png */}
          <div ref={bgImgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <Image
              src="/tree.png"
              alt="Smart end-to-end solutions"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Dark Overlay Gradient for maximum contrast */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 z-[1] pointer-events-none"
          />

          {/* Content Box Overlay */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 w-full">
            {/* Left Text Block */}
            <div className="space-y-4">
              <h2
                ref={textHeadingRef}
                className="md:text-5xl sm:text-4xl text-3xl font-farro leading-[1.12] tracking-tight text-white"
              >
                <span className="block font-bold text-[#eae4d6]/90">Smart, end–to–end solutions</span>
                <span className="block font-thin text-[#eae4d6]/90">
                  powered by proprietary technology.
                </span>
              </h2>
              <p
                ref={textParaRef}
                className="md:text-md sm:text-sm text-neutral-300 leading-relaxed font-satoshi max-w-[560px]"
              >
                Smart, end-to-end waste management powered by proprietary technology — from on-site
                processing to large-scale composting systems that close the loop for a circular
                economy.
              </p>
            </div>

            {/* Right Feature Icon Badges */}
            <div
              ref={badgesRef}
              className="flex items-center gap-3 shrink-0 self-start md:self-end"
            >
              {/* Badge 1: Location / Smart Chip */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#eae4d6] flex items-center justify-center text-neutral-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white cursor-pointer">
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.35-7-10a7 7 0 1114 0c0 5.65-7 10-7 10z" />
                  <circle cx="12" cy="11" r="2.5" />
                </svg>
              </div>

              {/* Badge 2: Dark Translucent Speed / Analytics */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-neutral-900/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-neutral-800 cursor-pointer">
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 7 12 12 15 15" />
                </svg>
              </div>

              {/* Badge 3: Ecosystem / Circular Nodes */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#eae4d6] flex items-center justify-center text-neutral-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white cursor-pointer">
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="6" cy="6" r="2" />
                  <circle cx="18" cy="6" r="2" />
                  <circle cx="6" cy="18" r="2" />
                  <circle cx="18" cy="18" r="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
