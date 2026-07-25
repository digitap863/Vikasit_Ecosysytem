"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = ["Home", "About", "Products", "Services"];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Hide on scroll down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Show on back scroll (scroll up)
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (item: string) => {
    setActiveTab(item);
    setIsOpen(false);

    if (item === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = item.toLowerCase();
    const elem = document.getElementById(targetId);
    if (elem) {
      const yOffset = -80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out bg-transparent ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-[80px] px-6 sm:px-8 flex items-center justify-between relative">
          {/* Left: Logo - Shown only at top of page */}
          <div className={`flex items-center h-full relative z-40 transition-all duration-300 ${!isScrolled ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveTab("Home");
              }}
            >
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

          {/* Center: Inverted Tab Container - Navlink Section */}
          <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 items-center justify-center h-[72px] w-[600px] z-10">
            {/* SVG Tab Background with Ambient Shadow */}
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
                    onClick={() => handleNavClick(item)}
                    className={`text-[15px] font-semibold transition-all relative py-1.5 px-1 cursor-pointer ${
                      isActive
                        ? "text-neutral-950 font-bold"
                        : "text-neutral-700 hover:text-neutral-950"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Contact Us Button - Shown only at top of page */}
          <div className={`hidden lg:flex items-center h-full relative z-20 transition-all duration-300 ${!isScrolled ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <button
              onClick={() => {
                const elem = document.getElementById("footer");
                if (elem) {
                  elem.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                }
              }}
              className="group relative px-7 py-2.5 rounded-full border border-gray-800 text-gray-900 font-semibold overflow-hidden transition-all text-base shadow-sm hover:shadow-md cursor-pointer"
            >
              {/* Animated Fill Background */}
              <span className="absolute inset-0 bg-gray-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out rounded-full" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Contact Us
              </span>
            </button>
          </div>

          {/* Hamburger Icon - Visible on mobile/tablet */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-full border border-neutral-300/60 bg-[#F0EFEF]/80 hover:bg-[#F0EFEF] active:scale-95 transition-all shadow-sm z-50 relative cursor-pointer"
          >
            <span className={`h-[2px] w-5 rounded bg-neutral-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`h-[2px] w-5 rounded bg-neutral-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-5 rounded bg-neutral-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            />
            {/* Mobile menu content container */}
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="fixed top-0 left-0 w-full bg-[#eae4d6] border-b border-neutral-300/60 shadow-2xl pt-24 pb-8 px-6 flex flex-col space-y-6 lg:hidden z-40"
            >
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => {
                  const isActive = activeTab === item;
                  return (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      className={`text-left text-lg font-bold py-2 transition-colors cursor-pointer ${
                        isActive ? "text-neutral-950" : "text-neutral-600 hover:text-neutral-800"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </nav>
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                }}
                className="group relative w-full py-3.5 rounded-full border border-gray-800 text-gray-900 font-bold overflow-hidden transition-all text-base shadow-sm hover:shadow-md cursor-pointer"
              >
                {/* Animated Fill Background */}
                <span className="absolute inset-0 bg-gray-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out rounded-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Contact Us
                </span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
