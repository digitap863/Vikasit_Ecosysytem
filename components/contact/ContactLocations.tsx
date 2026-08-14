"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiMapPin } from "react-icons/fi";

export default function ContactLocations() {
  const [activeMapTab, setActiveMapTab] = useState<"office" | "factory">("office");

  // Google Maps embed URLs for both locations
  const mapsEmbed = {
    office:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.752399120612!2d74.8465983!3d12.9236111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4d468172c7%3A0x6b63d2dd962df3e2!2sKavoor%20Govt%20College%20Rd%2C%20Mangaluru%2C%20Karnataka%20575015!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    factory:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.316886861537!2d77.6775618!3d12.8228399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c62788e0a6d%3A0x8e8eb4b5b736b7ef!2sBommasandra%20Industrial%20Area%2C%20Bengaluru%2C%20Karnataka%20560078!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  };

  const mapsDirect = {
    office:
      "https://maps.google.com/?q=Kavoor+Govt+College+Road+Mangalore+575015",
    factory:
      "https://maps.google.com/?q=Bommasandra+Industrial+Area+Electronic+City+Bangalore+560078",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#E5DFD3] border border-[#2d2d2d]/30 rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-2xl p-6 sm:p-10 space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2d2d2d]/20 pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161616] font-farro">
            Our Locations
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 font-sans">
            Visit our Registered Office in Mangalore or Manufacturing Unit in Bangalore.
          </p>
        </div>

        {/* Toggle Tab */}
        <div className="flex items-center bg-[#D8D0C0] p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveMapTab("office")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMapTab === "office"
                ? "bg-[#161616] text-white shadow-sm"
                : "text-neutral-700 hover:text-black"
            }`}
          >
            Registered Office
          </button>
          <button
            onClick={() => setActiveMapTab("factory")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMapTab === "factory"
                ? "bg-[#161616] text-white shadow-sm"
                : "text-neutral-700 hover:text-black"
            }`}
          >
            Manufacturing Unit
          </button>
        </div>
      </div>

      {/* Map View & Address Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 h-[340px] sm:h-[400px] rounded-2xl overflow-hidden shadow-md border border-neutral-700/20 relative">
          <iframe
            src={mapsEmbed[activeMapTab]}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={
              activeMapTab === "office"
                ? "Vikasit Office Map"
                : "Vikasit Factory Map"
            }
          />
        </div>

        <div className="lg:col-span-4 bg-[#161616] text-white p-6 rounded-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#056826]/30 text-[#4ADE80] rounded-full text-xs font-bold">
              <FiMapPin className="w-3.5 h-3.5" />
              <span>
                {activeMapTab === "office"
                  ? "Registered Office"
                  : "Manufacturing Unit"}
              </span>
            </div>

            <h3 className="text-xl font-bold font-farro text-[#EAE3D2]">
              {activeMapTab === "office"
                ? "Mangalore Headquarters"
                : "Bangalore Factory"}
            </h3>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {activeMapTab === "office"
                ? "2- 93/ 4 , Kavoor Govt College Road, Shankara Nagara, Mangalore - 575015."
                : "#32, 3rd cross, Bommasandra Industrial Area, Electronicity Bangalore - 560078"}
            </p>
          </div>

          <a
            href={mapsDirect[activeMapTab]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#056826] hover:bg-[#04521e] text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition-all"
          >
            <span>Get Directions</span>
            <FiExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
