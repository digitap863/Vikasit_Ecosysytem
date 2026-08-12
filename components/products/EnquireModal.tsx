"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle, FiSend } from "react-icons/fi";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  productImage?: string;
  productNumTag?: string;
}

export default function EnquireModal({
  isOpen,
  onClose,
  productTitle,
  productImage = "/product/Trommels.png",
  productNumTag,
}: EnquireModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Automatically update pre-filled message whenever productTitle changes or modal opens
  useEffect(() => {
    if (productTitle) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi Vikasit Ecosystems team, I am interested in ${productTitle}. Please send me detailed specifications, pricing, and availability for my site.`,
      }));
    }
  }, [productTitle, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Click-Away Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative z-50 w-full max-w-[620px] bg-[#1A1A1C] text-white border border-neutral-700/60 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              /* Success Confirmation View */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4 font-sans"
              >
                <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center mx-auto">
                  <FiCheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-white font-farro">
                  Inquiry Submitted!
                </h3>
                <p className="text-neutral-300 text-sm max-w-[420px] mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-white">{formData.name || "Customer"}</span>! Your inquiry for{" "}
                  <span className="font-bold text-[#4ADE80]">{productTitle}</span> has been received. Our technical team will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              /* Inquiry Form View */
              <div className="space-y-6">
                {/* Product Preview Card Header */}
                <div className="flex items-center gap-4 p-3.5 bg-[#252528] rounded-2xl border border-neutral-700/50">
                  <div className="relative w-16 h-14 sm:w-20 sm:h-16 shrink-0 rounded-xl overflow-hidden bg-[#18181A] p-1 flex items-center justify-center">
                    <Image
                      src={productImage}
                      alt={productTitle}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="font-sans">
                    {productNumTag && (
                      <span className="text-[11px] font-extrabold tracking-widest text-[#22C55E] uppercase block">
                        {productNumTag}
                      </span>
                    )}
                    <h4 className="text-base sm:text-lg font-extrabold text-white font-farro">
                      {productTitle}
                    </h4>
                    <p className="text-xs text-neutral-400 font-medium">
                      Direct Manufacturer Inquiry
                    </p>
                  </div>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Full Name <span className="text-[#22C55E]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#252528] border border-neutral-700 focus:border-[#22C55E] text-white px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Email Address <span className="text-[#22C55E]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-[#252528] border border-neutral-700 focus:border-[#22C55E] text-white px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Phone Number <span className="text-[#22C55E]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 - 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-[#252528] border border-neutral-700 focus:border-[#22C55E] text-white px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Pre-filled Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Inquiry Message (Auto-Filled) <span className="text-[#22C55E]">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-[#252528] border border-neutral-700 focus:border-[#22C55E] text-white px-4 py-3 rounded-xl text-sm outline-none transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Direct Contact Quick Links */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 pt-1 pb-1">
                    <span className="flex items-center gap-1.5">
                      <FaPhoneAlt className="w-3 h-3 text-[#22C55E]" />
                      +91 - 96065 96849
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaEnvelope className="w-3 h-3 text-[#22C55E]" />
                      contact@vikasiteco.com
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#00c853] hover:bg-[#00b248] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <span>Send Product Inquiry</span>
                    <FiSend className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
