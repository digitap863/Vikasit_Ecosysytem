"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FiCheckCircle, FiExternalLink, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeMapTab, setActiveMapTab] = useState<"office" | "factory">("office");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  // Google Maps embed URLs for both locations
  const mapsEmbed = {
    office: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.752399120612!2d74.8465983!3d12.9236111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4d468172c7%3A0x6b63d2dd962df3e2!2sKavoor%20Govt%20College%20Rd%2C%20Mangaluru%2C%20Karnataka%20575015!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    factory: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.316886861537!2d77.6775618!3d12.8228399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c62788e0a6d%3A0x8e8eb4b5b736b7ef!2sBommasandra%20Industrial%20Area%2C%20Bengaluru%2C%20Karnataka%20560078!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  };

  const mapsDirect = {
    office: "https://maps.google.com/?q=Kavoor+Govt+College+Road+Mangalore+575015",
    factory: "https://maps.google.com/?q=Bommasandra+Industrial+Area+Electronic+City+Bangalore+560078",
  };

  return (
    <main className="relative w-full overflow-x-hidden bg-[#eae4d6] min-h-screen flex flex-col justify-between font-farro">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Page Content Wrapper */}
      <div className="pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1320px] mx-auto w-full space-y-10 sm:space-y-14 flex-1">
        
        {/* ================= TOP SECTION: EXACT CONTACT CARD ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full bg-[#E5DFD3] border border-[#2d2d2d]/30 rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 min-h-[580px]"
        >
          
          {/* LEFT COLUMN: Contact Information (Solid Black/Dark Charcoal) */}
          <div className="bg-[#161616] p-8 sm:p-12 lg:p-14 text-[#EAE3D2] flex flex-col justify-between space-y-10">
            {/* Title and Subtext */}
            <div className="space-y-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#EAE3D2] uppercase leading-[1.15] font-sans">
                CONTACT<br />INFORMATION
              </h1>
              
              <p className="text-[#EAE3D2] text-xs sm:text-sm leading-relaxed font-sans max-w-[360px]">
                Whether you need a quote, have questions about our services, or want to discuss an upcoming project, our team is ready to help.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-6 font-sans">
              {/* Phone */}
              <a 
                href="tel:+919606596849" 
                className="flex items-center gap-3.5 group cursor-pointer w-fit"
              >
                <FaPhoneAlt className="w-4 h-4 text-[#056826] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[#EAE3D2] group-hover:text-[#056826] font-semibold text-sm sm:text-base transition-colors">
                  +91 - 96065 96849
                </span>
              </a>

              {/* Email */}
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@vikasiteco.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 group cursor-pointer w-fit"
              >
                <FaEnvelope className="w-4 h-4 text-[#056826] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[#EAE3D2] group-hover:text-[#056826] font-medium text-sm sm:text-base transition-colors">
                  contact@vikasiteco.com
                </span>
              </a>

              {/* Registered Office */}
              <div className="flex items-start gap-3.5 pt-1">
                <FaMapMarkerAlt className="w-4 h-4 text-[#056826] shrink-0 mt-1" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-[#EAE3D2] text-base">
                    Registered Office
                  </h3>
                  <p className="text-[#C8C8C8] text-xs sm:text-sm leading-relaxed max-w-[340px]">
                    2- 93/ 4 , Kavoor Govt College Road,<br />
                    Shankara Nagara, Mangalore - 575015.
                  </p>
                </div>
              </div>

              {/* Manufacturing Unit */}
              <div className="pl-7 space-y-1 pt-1">
                <h3 className="font-semibold text-[#EAE3D2] text-base">
                  Manufacturing Unit
                </h3>
                <p className="text-[#EAE3D2] text-xs sm:text-sm leading-relaxed max-w-[340px]">
                  #32, 3rd cross, Bommasandra Industrial<br />
                  Area, Electronicity Bangalore - 560078
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Get in touch Form (Warm Beige Theme) */}
          <div className="bg-[#E6E1D5] p-8 sm:p-12 lg:p-14 flex flex-col justify-center font-sans">
            
            {/* Title with Green Underline under "Get in" */}
            <div className="mb-8">
              <h2 className="text-4xl sm:text-[46px] font-extrabold text-[#161616] tracking-tight font-sans">
                Get in <span className="font-bold">touch</span>
              </h2>
              {/* Green Underline Bar under "Get in" */}
              <div className="h-[4px] bg-[#056826] w-[115px] mt-1.5 rounded-full" />
            </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#056826]/10 border border-[#056826]/30 rounded-xl p-8 text-center space-y-3"
              >
                <FiCheckCircle className="w-12 h-12 text-[#056826] mx-auto" />
                <h3 className="text-2xl font-bold text-neutral-900">Thank You!</h3>
                <p className="text-neutral-700 text-sm max-w-[360px] mx-auto">
                  Your message has been sent successfully. Our team will get back to you shortly!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#353738] text-[#EAE3D2] placeholder-[#C0C0C0] px-4 py-3.5 text-sm font-normal rounded-[3px] border-none focus:outline-none focus:ring-1 focus:ring-[#056826] transition-all"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#353738] text-[#EAE3D2] placeholder-[#C0C0C0] px-4 py-3.5 text-sm font-normal rounded-[3px] border-none focus:outline-none focus:ring-1 focus:ring-[#056826] transition-all"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    rows={5}
                    required
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#353738] text-[#EAE3D2] placeholder-[#C0C0C0] px-4 py-3.5 text-sm font-normal rounded-[3px] border-none focus:outline-none focus:ring-1 focus:ring-[#056826] resize-none transition-all"
                  />
                </div>

                {/* Newsletter Checkbox */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="w-4 h-4 rounded-[2px] border border-neutral-500 accent-[#056826] cursor-pointer"
                  />
                  <label htmlFor="newsletter" className="text-xs text-[#444444] font-normal cursor-pointer select-none">
                    I would like to receive the newsletter.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#056826] hover:bg-[#04521e] text-[#EAE3D2] font-bold text-sm px-8 py-2.5 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>


        {/* ================= BOTTOM SECTION: MAP PREVIEW & PINS ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="w-full bg-[#E5DFD3] border border-[#2d2d2d]/30 rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-2xl relative"
        >
          {/* Map Header bar with Tab selection */}
          <div className="p-4 sm:p-6 bg-[#E0D8C8] border-b border-[#d2ca90]/50 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <div className="flex items-center gap-2">
              <FiMapPin className="w-5 h-5 text-[#056826]" />
              <h3 className="text-lg font-bold text-neutral-900">
                Locate Our Centers
              </h3>
            </div>

            {/* Location Switcher Tabs */}
            <div className="flex items-center bg-[#D4CCA8]/50 p-1 rounded-xl border border-[#c4bc98]/60 text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setActiveMapTab("office")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  activeMapTab === "office"
                    ? "bg-[#056826] text-[#EAE3D2] shadow-sm font-bold"
                    : "text-neutral-700 hover:text-neutral-900"
                }`}
              >
                Registered Office (Mangalore)
              </button>
              <button
                onClick={() => setActiveMapTab("factory")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  activeMapTab === "factory"
                    ? "bg-[#056826] text-[#EAE3D2] shadow-sm font-bold"
                    : "text-neutral-700 hover:text-neutral-900"
                }`}
              >
                Manufacturing Unit (Bangalore)
              </button>
            </div>
          </div>

          {/* Interactive Map Embed Container */}
          <div className="relative w-full h-[380px] sm:h-[460px]">
            <iframe
              src={mapsEmbed[activeMapTab]}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
              className="w-full h-full grayscale-[15%] contrast-[105%]"
            />

            {/* Floating Location Card Badges Overlaid on Map */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pointer-events-auto max-w-[280px] sm:max-w-[320px]">
              <div className="bg-[#E6E1D5]/95 backdrop-blur-md border border-neutral-400/80 rounded-2xl p-4 shadow-xl text-neutral-800 space-y-2 font-sans">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[#056826] text-sm sm:text-base">
                    {activeMapTab === "office" ? "Office" : "Manufacturing unit"}
                  </span>
                  <a
                    href={mapsDirect[activeMapTab]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#056826] hover:underline font-semibold flex items-center gap-1"
                  >
                    Directions <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs sm:text-sm leading-snug text-neutral-700 font-medium">
                  {activeMapTab === "office"
                    ? "2- 93/ 4 , Kavoor Govt College Road, Shankara Nagara, Mangalore - 575015"
                    : "#32, 3rd cross, Bommasandra Industrial Area, Electronic City, Bangalore - 560078"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Footer Component */}
      <Footer />
    </main>
  );
}
