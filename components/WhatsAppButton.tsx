"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const WHATSAPP_API_URL =
  "https://api.whatsapp.com/send/?phone=919606596849&text=Hi+Vikasit+Ecosystems+%EF%BF%BD%2C%0D%0A%0D%0AI%E2%80%99m+interested+in+learning+more+about+your+waste+management+services.+Could+you+please+provide+more+details%3F%0D%0A%0D%0AThank+you%21&type=phone_number&app_absent=0";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group">
      {/* Optional Tooltip Bubble */}
      {showTooltip && (
        <div className="relative mb-3 bg-neutral-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-2xl border border-neutral-800 flex items-center gap-3 animate-bounce max-w-[240px] sm:max-w-xs">
          <span>Chat with us on WhatsApp 👋</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white p-0.5 rounded-full transition-colors cursor-pointer"
            aria-label="Close tooltip"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
          {/* Arrow pointing down */}
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-neutral-900 border-r border-b border-neutral-800 rotate-45" />
        </div>
      )}

      {/* Main Floating WhatsApp Button */}
      <a
        href={WHATSAPP_API_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {/* Animated Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <FaWhatsapp className="w-8 h-8 sm:w-9 sm:h-9 relative z-10" />
      </a>
    </div>
  );
}
