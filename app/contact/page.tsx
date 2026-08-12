"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FiCheckCircle, FiExternalLink, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeMapTab, setActiveMapTab] = useState<"office" | "factory">("office");

  useEffect(() => {
    if (productParam) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi Vikasit Ecosystems team, I am interested in ${productParam}. Please send me detailed specifications, pricing, and availability for my site.`,
      }));
    }
  }, [productParam]);

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
              CONTACT
              <br />
              INFORMATION
            </h1>

            <p className="text-[#EAE3D2] text-xs sm:text-sm leading-relaxed font-sans max-w-[360px]">
              Whether you need a quote, have questions about our services, or
              want to discuss an upcoming project, our team is ready to help.
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
                  2- 93/ 4 , Kavoor Govt College Road,
                  <br />
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
                #32, 3rd cross, Bommasandra Industrial
                <br />
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

          {productParam && (
            <div className="mb-4 p-3 bg-[#056826]/10 border border-[#056826]/30 rounded-lg text-xs text-[#056826] font-bold">
              Inquiry for: {productParam}
            </div>
          )}

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#056826]/10 border border-[#056826]/30 rounded-xl p-8 text-center space-y-3"
            >
              <FiCheckCircle className="w-12 h-12 text-[#056826] mx-auto" />
              <h3 className="text-2xl font-bold text-neutral-900">Thank You!</h3>
              <p className="text-neutral-700 text-sm max-w-[360px] mx-auto">
                Your message has been sent successfully. Our team will get back to
                you shortly!
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
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
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
                <label
                  htmlFor="newsletter"
                  className="text-xs text-[#444444] font-normal cursor-pointer select-none"
                >
                  I would like to receive the newsletter.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#161616] hover:bg-black text-[#EAE3D2] font-semibold text-sm tracking-wide py-4 px-6 rounded-[3px] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                >
                  SUBMIT INQUIRY
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>

      {/* ================= BOTTOM SECTION: DUAL GOOGLE MAPS LOCATIONS ================= */}
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
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#eae4d6] min-h-screen flex flex-col justify-between font-farro">
      {/* Header Navigation */}
      <Navbar />

      <Suspense fallback={<div className="py-40 text-center text-neutral-600">Loading Contact Form...</div>}>
        <ContactFormInner />
      </Suspense>

      <Footer />
    </main>
  );
}
