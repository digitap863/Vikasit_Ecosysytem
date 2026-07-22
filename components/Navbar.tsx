"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Home", "About", "Products", "Services"];

  return (
    <>
      <header className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[80px] px-6 sm:px-8 flex items-center justify-between z-30">
        {/* Left: Logo */}
        <div className="flex items-center h-full relative z-40">
          <Link href="/">
            <Image
              src="/banner/vikasit-logo-black 2.png"
              alt="Vikasit Ecosystems Logo"
              width={160}
              height={42}
              priority
              className="object-contain h-[42px] sm:h-[52px] w-auto transition-all"
            />
          </Link>
        </div>

        {/* Center: Inverted Tab Container - Hidden on mobile/tablet */}
        <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 items-center justify-center h-[72px] w-[600px] z-10">
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
          <nav className="relative z-20 flex items-center justify-center gap-10 pt-2 pb-1">
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

        {/* Right: Contact Us Button - Hidden on mobile/tablet */}
        <div className="hidden lg:flex items-center h-full relative z-20">
          <button className="px-7 py-2.5 rounded-full border border-gray-800 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all text-base shadow-sm">
            Contact Us
          </button>
        </div>

        {/* Hamburger Icon - Visible on mobile/tablet */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-full border border-neutral-300/60 bg-[#F0EFEF]/80 hover:bg-[#F0EFEF] active:scale-95 transition-all shadow-sm z-40 relative"
        >
          <span className={`h-[2px] w-5 rounded bg-neutral-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`h-[2px] w-5 rounded bg-neutral-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-[2px] w-5 rounded bg-neutral-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click-away blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            />
            {/* Mobile menu content container */}
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute top-0 left-0 w-full bg-[#eae4d6] border-b border-neutral-300/60 shadow-xl pt-24 pb-8 px-6 flex flex-col space-y-6 lg:hidden z-25"
            >
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => {
                  const isActive = activeTab === item;
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveTab(item);
                        setIsOpen(false);
                      }}
                      className={`text-left text-lg font-bold py-2 border-b border-neutral-300/40 transition-colors ${
                        isActive ? "text-neutral-950 border-neutral-500" : "text-neutral-600 hover:text-neutral-800"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </nav>
              <button className="w-full py-3.5 rounded-full border border-gray-800 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all text-base shadow-sm">
                Contact Us
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
