"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = ["Home", "About", "Products", "Services"];

  return (
    <header className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] max-w-[95vw] h-[80px] px-8 flex items-center justify-between z-20">
      {/* Left: Logo */}
      <div className="flex items-center h-full">
        <Link href="/">
          <Image
            src="/banner/vikasit-logo-black 2.png"
            alt="Vikasit Ecosystems Logo"
            width={195}
            height={52}
            priority
            className="object-contain h-[52px] w-auto"
          />
        </Link>
      </div>

      {/* Center: Inverted Tab Container Flush to Top (y=0) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center h-[72px] w-[600px]">
        {/* SVG Tab Background with Enhanced Ambient Shadow */}
        <svg
          className="absolute top-0 left-0 w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.14)] drop-shadow-[0_4px_12px_rgba(180,100,50,0.12)]"
          viewBox="0 0 560 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 0 C 35 0, 48 72, 90 72 L 470 72 C 512 72, 525 0, 560 0 Z"
            fill="#F0EFEF"
          />
        </svg>

        {/* Nav Links */}
        <nav className="relative z-10 flex items-center justify-center gap-10 pt-2 pb-1">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`text-[15px] font-semibold transition-all relative py-1.5 px-1 ${
                  isActive
                    ? "text-neutral-900"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-neutral-800 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: Contact Us Button */}
      <div className="flex items-center h-full">
        <button className="px-7 py-2.5 rounded-full border border-gray-800 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all text-base shadow-sm">
          Contact Us
        </button>
      </div>
    </header>
  );
}
