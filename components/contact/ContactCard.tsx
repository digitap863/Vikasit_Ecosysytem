"use client";

import { motion } from "framer-motion";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-[#E5DFD3] border border-[#2d2d2d]/30 rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 min-h-[580px]"
    >
      <ContactInfo />
      <ContactForm />
    </motion.div>
  );
}
