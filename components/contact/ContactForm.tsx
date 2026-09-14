"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import ScrollAnimation from "@/components/ui/ScrollAnimation";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (productParam) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi Vikasit Ecosystems team, I am interested in ${productParam}. Please send me detailed specifications, pricing, and availability for my site.`,
      }));
    }
  }, [productParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          newsletter,
          product: productParam || "",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send inquiry. Please try again.");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setNewsletter(false);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollAnimation variant="fade-up" className="h-full">
      <div className="bg-[#E6E1D5] p-8 sm:p-12 lg:p-14 flex flex-col justify-center font-sans h-full">
        {/* Title with Green Underline under "Get in" */}
        <div className="mb-8">
          <h2 className="text-4xl sm:text-[46px] font-extrabold text-[#161616] tracking-tight font-sans">
            Get in <span className="font-normal">touch</span>
          </h2>
          {/* Green Underline Bar under "Get in" */}
          <div className="h-[4px] bg-[#056826] w-[115px] mt-1.5 rounded-full" />
        </div>

        {productParam && (
          <div className="mb-4 p-3 bg-[#056826]/10 border border-[#056826]/30 rounded-lg text-xs text-[#056826] font-bold">
            Inquiry for: {productParam}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-100 border border-red-300 text-red-700 text-xs font-semibold rounded-lg flex items-center gap-2">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
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
              Your message has been sent successfully and recorded. Our team will get back to
              you shortly!
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="mt-4 text-xs font-bold text-[#056826] underline hover:text-[#044c1c]"
            >
              Send another inquiry
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <input
                type="text"
                required
                disabled={isSubmitting}
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-[#353738] text-[#EAE3D2] placeholder-[#C0C0C0] px-4 py-3.5 text-sm font-normal rounded-[3px] border-none focus:outline-none focus:ring-1 focus:ring-[#056826] transition-all disabled:opacity-50"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                required
                disabled={isSubmitting}
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#353738] text-[#EAE3D2] placeholder-[#C0C0C0] px-4 py-3.5 text-sm font-normal rounded-[3px] border-none focus:outline-none focus:ring-1 focus:ring-[#056826] transition-all disabled:opacity-50"
              />
            </div>

            {/* Phone Input */}
            <div>
              <input
                type="tel"
                disabled={isSubmitting}
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-[#353738] text-[#EAE3D2] placeholder-[#C0C0C0] px-4 py-3.5 text-sm font-normal rounded-[3px] border-none focus:outline-none focus:ring-1 focus:ring-[#056826] transition-all disabled:opacity-50"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                rows={4}
                required
                disabled={isSubmitting}
                placeholder="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-[#353738] text-[#EAE3D2] placeholder-[#C0C0C0] px-4 py-3.5 text-sm font-normal rounded-[3px] border-none focus:outline-none focus:ring-1 focus:ring-[#056826] resize-none transition-all disabled:opacity-50"
              />
            </div>

            {/* Newsletter Checkbox */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="newsletter"
                disabled={isSubmitting}
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
              <Button
                type="submit"
                variant="dark"
                fullWidth
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SENDING INQUIRY..." : "SUBMIT INQUIRY"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </ScrollAnimation>
  );
}
