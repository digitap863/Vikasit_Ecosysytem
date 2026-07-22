"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiInstagram, 
  FiLinkedin 
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get in touch with you soon.");
  };

  return (
    <footer className="w-full bg-[#131414] text-white font-farro overflow-hidden">
      {/* ================= TOP SECTION: CONTACT FORM & INFO ================= */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-b border-neutral-800/80">
        
        {/* LEFT CARD: Contact Form Container */}
        <div className="lg:col-span-6 bg-[#1a1c1c] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#69BD45] pb-4 mb-6 border-b border-neutral-800/80">
            Get in touch today!
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name and Email side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#131414] border border-neutral-800 focus:border-[#69BD45] rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder=""
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#131414] border border-neutral-800 focus:border-[#69BD45] rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors"
                />
              </div>
            </div>

            {/* Phone / Select */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                PHONE
              </label>
              <select
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#131414] border border-neutral-800 focus:border-[#69BD45] rounded-lg px-4 py-2.5 text-sm text-neutral-300 outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="">All disciplines</option>
                <option value="organic-waste">Organic Waste Composting</option>
                <option value="machinery">Composting Machinery</option>
                <option value="consulting">Waste Management Consulting</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                MESSAGE
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#131414] border border-neutral-800 focus:border-[#69BD45] rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors resize-none"
              />
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={() => setFormData({ name: "", email: "", phone: "", message: "" })}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors px-3 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#69BD45] text-black font-bold text-sm px-7 py-2.5 rounded-lg hover:bg-[#43cd1b] transition-all shadow-md active:scale-95"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Contact Info Details */}
        <div className="lg:col-span-6 space-y-8 pt-2">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FiMapPin className="w-6 h-6 text-[#69BD45]" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#69BD45]">
                Contact Us
              </h2>
            </div>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed pl-9">
              Have questions or need assistance?<br />
              Get in touch with us — we&apos;re here to help!
            </p>
          </div>

          {/* Email & Phone numbers */}
          <div className="space-y-4 text-neutral-300 text-sm sm:text-base pl-1 sm:pl-2">
            <div className="flex items-center gap-3">
              <FiMail className="w-5 h-5 text-[#69BD45] shrink-0" />
              <a href="mailto:sales@vikasiteco.com" className="hover:text-[#69BD45] transition-colors">
                sales@vikasiteco.com
              </a>
            </div>

            <div className="flex items-start gap-3">
              <FiPhone className="w-5 h-5 text-[#69BD45] shrink-0 mt-1" />
              <div className="space-y-1">
                <p>+91 - 96065 96849</p>
                <p>+91 - 7411499299</p>
                <p>+91 - 8848801497</p>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="space-y-5 text-neutral-300 text-sm sm:text-base pl-1 sm:pl-2">
            {/* Registered Office */}
            <div className="flex items-start gap-3">
              <FiMapPin className="w-5 h-5 text-[#69BD45] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-1">Registered Office</h4>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  2-93/4, Kavoor Govt College Road,<br />
                  Shankara Nagara, Mangalore - 575015.
                </p>
              </div>
            </div>

            {/* Manufacturing Unit */}
            <div className="pl-8">
              <h4 className="font-semibold text-white mb-1">Manufacturing Unit</h4>
              <p className="text-neutral-400 leading-relaxed text-sm">
                #32, 3rd cross, Bommasandra Industrial Area,<br />
                Electronicity, Bangalore - 560078
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM SECTION: BRAND & LINKS ================= */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        
        {/* Col 1: Logo & Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/banner/footer_logo.png"
              alt="Vikasit Ecosystems Logo"
              width={210}
              height={55}
              priority
              className="object-contain h-[55px] w-auto"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#69BD45]/90 leading-relaxed max-w-[320px]">
            Vikasit Ecosystems is creating a sustainable ecosystem by transforming waste into a source of life through innovative waste management services.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-base font-bold text-[#69BD45] mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
            {["Home", "About", "Carbon credits", "Services", "Blogs", "Contact Us", "Brochure"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-[#69BD45] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Products */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-base font-bold text-[#69BD45] mb-4">Products</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
            {[
              "Soil Maker",
              "Industrial shredder",
              "Baling Machine",
              "conveyor system",
              "Incinerators",
              "Trommels",
            ].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-[#69BD45] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact Us & Social Icons */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-base font-bold text-[#69BD45] mb-4">Contact Us</h4>
          <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-start gap-2.5">
              <FiMapPin className="w-4 h-4 text-[#69BD45] shrink-0 mt-0.5" />
              <span>2-93/4, Kavoor Govt College Road, Shankara Nagara, Mangalore 575015.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiPhone className="w-4 h-4 text-[#69BD45] shrink-0" />
              <span>+91 - 96065 96849</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiMail className="w-4 h-4 text-[#69BD45] shrink-0" />
              <a href="mailto:contact@vikasiteco.com" className="hover:text-[#69BD45] transition-colors">
                contact@vikasiteco.com
              </a>
            </div>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-4 pt-3 text-[#69BD45]">
            <a href="#" className="hover:scale-110 transition-transform p-1">
              <FiFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform p-1">
              <FiInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform p-1">
              <FaWhatsapp className="w-5 h-5" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform p-1">
              <FiLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* ================= VERY BOTTOM BAR ================= */}
      <div className="border-t border-neutral-800/80 bg-[#0e0f0f] py-6 px-6 lg:px-12 text-xs text-neutral-500">
        <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© Copyright 2026 | Tapclone All Right Reserved</p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-neutral-300 transition-colors">
              FAQ
            </Link>
            <Link href="#" className="hover:text-neutral-300 transition-colors">
              Help
            </Link>
            <Link href="#" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-neutral-300 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
