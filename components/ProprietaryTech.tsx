"use client";

import Image from "next/image";

export default function ProprietaryTech() {
  return (
    <section id="products" className="w-full bg-[#eae4d6] py-6 md:py-10 px-4 sm:px-6 lg:px-12 relative overflow-hidden z-10">
      <div className="max-w-[1320px] mx-auto">
        {/* Banner Card */}
        <div className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-none min-h-[480px] sm:min-h-[540px] md:min-h-[580px] flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16 border border-neutral-800/40">
          {/* Background Image: tree.png */}
          <Image
            src="/tree.png"
            alt="Smart end-to-end solutions"
            fill
            priority
            className="object-cover object-center pointer-events-none z-0"
          />

          {/* Dark Overlay Gradient for maximum contrast */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-[1] pointer-events-none" /> */}

          {/* Content Box Overlay */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 w-full">
            {/* Left Text Block */}
            <div className=" space-y-4">
              <h2 className="md:text-5xl sm:text-4xl  font-farro leading-[1.12] tracking-tight text-white">
                <span className="block font-bold text-[#eae4d6]/90">Smart, end–to–end solutions</span>
                <span className="block font-thin  text-[#eae4d6]/90">
                  powered by proprietary technology.
                </span>
              </h2>
              <p className="md:text-md sm:text-sm text-neutral-300 leading-relaxed font-satoshi max-w-[560px]">
                Smart, end-to-end waste management powered by proprietary technology — from on-site
                processing to large-scale composting systems that close the loop for a circular
                economy.
              </p>
            </div>

            {/* Right Feature Icon Badges */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
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
