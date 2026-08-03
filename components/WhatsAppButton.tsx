"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall, FiMail, FiX, FiMessageSquare } from "react-icons/fi";

const WHATSAPP_API_URL =
  "https://api.whatsapp.com/send/?phone=919606596849&text=Hi+Vikasit+Ecosystems+%EF%BF%BD%2C%0D%0A%0D%0AI%E2%80%99m+interested+in+learning+more+about+your+waste+management+services.+Could+you+please+provide+more+details%3F%0D%0A%0D%0AThank+you%21&type=phone_number&app_absent=0";

const PHONE_TEL = "tel:+919606596849";
const EMAIL_GMAIL = "https://mail.google.com/mail/?view=cm&fs=1&to=contact@vikasiteco.com";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close speed dial when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center font-farro select-none"
      ref={containerRef}
    >
      {/* Pop-up Stack of Contact Buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-center gap-3.5 mb-3.5">
            {/* 1. WhatsApp Button (Green) */}
            <motion.a
              href={WHATSAPP_API_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: 20, scale: 0.4 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.4 }}
              transition={{ duration: 0.22, delay: 0.1 }}
              className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Contact via WhatsApp"
            >
              <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />

              {/* Hover Tooltip Label */}
              <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-neutral-900/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
                WhatsApp Us
              </span>
            </motion.a>

            {/* 2. Direct Call Button (Blue) */}
            <motion.a
              href={PHONE_TEL}
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: 20, scale: 0.4 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.4 }}
              transition={{ duration: 0.22, delay: 0.05 }}
              className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1D70B8] text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Call Us"
            >
              <FiPhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />

              {/* Hover Tooltip Label */}
              <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-neutral-900/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
                Call Us (+91 96065 96849)
              </span>
            </motion.a>

            {/* 3. Email Button (Orange) */}
            <motion.a
              href={EMAIL_GMAIL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: 20, scale: 0.4 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.4 }}
              transition={{ duration: 0.22, delay: 0 }}
              className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F59E0B] text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Send Email"
            >
              <FiMail className="w-5 h-5 sm:w-6 sm:h-6" />

              {/* Hover Tooltip Label */}
              <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-neutral-900/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
                Email Us
              </span>
            </motion.a>
          </div>
        )}
      </AnimatePresence>

      {/* Main Bottom Trigger Button (Dark Slate with White Ring Border) */}
      <button
        onClick={toggleModal}
        aria-label="Toggle contact options"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#182232] text-white border-2 border-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {/* Animated Pulse Ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#182232] opacity-40 animate-ping pointer-events-none" />
        )}

        {/* Dynamic Icon Toggle (X when open, Message/Contact icon when closed) */}
        {isOpen ? (
          <FiX className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-transform duration-300" />
        ) : (
          <FiMessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
}
