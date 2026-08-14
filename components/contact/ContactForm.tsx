"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  return (
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
  );
}
