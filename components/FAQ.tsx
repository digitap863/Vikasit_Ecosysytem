"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  number: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ number, question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-[#c4beaf]/50 py-5 sm:py-7">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group select-none cursor-pointer focus:outline-none"
      >
        <div className="flex items-center">
          {/* Item Number */}
          <span className="text-sm sm:text-lg text-neutral-400 font-farro mr-6 sm:mr-10 font-light select-none">
            {number}
          </span>
          {/* Question Text */}
          <span className="text-sm sm:text-lg md:text-[20px] font-medium text-[#2d2f2f] font-farro group-hover:text-neutral-900 transition-colors">
            {question}
          </span>
        </div>

        {/* Rotating Plus Icon */}
        <motion.span
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" as const }}
          className="text-xl sm:text-2xl text-neutral-800 font-light pr-2 select-none"
        >
          +
        </motion.span>
      </button>

      {/* Accordion Expandable Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { height: { duration: 0.3 }, opacity: { duration: 0.25, delay: 0.05 } }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { height: { duration: 0.3 }, opacity: { duration: 0.15 } }
            }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-2 pl-12 sm:pl-[64px] text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed font-farro max-w-[720px]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      number: "01",
      question: "What is Vikasit Ecosystems?",
      answer: "Vikasit Ecosystems is a leading environmental solutions provider in India. We build state-of-the-art waste processing machinery and offer end-to-end consulting services to help residential communities, corporate campuses, and municipalities manage organic waste sustainably and create high-grade compost.",
    },
    {
      number: "02",
      question: "What types of waste can your machines process?",
      answer: "Our machinery is specifically optimized for organic and wet waste. This includes household food waste, kitchen scraps, horticultural waste (like dry leaves, grass clippings, and twigs), and organic commercial waste. It is designed to separate and compost these materials efficiently while minimizing odor.",
    },
    {
      number: "03",
      question: "How does the Soil Maker machine work?",
      answer: "The Soil Maker machine is our proprietary high-efficiency organic waste composter. It uses automated mechanical agitation, temperature controls, and optimized microbial aeration to accelerate the natural composting process. In just a short cycle, it transforms raw organic wet waste into stable, nutrient-dense organic soil/compost ready for agricultural and landscaping use.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#eae4d6] py-10 md:py-14 relative z-10">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* Title */}
        <h2 className="text-4xl sm:text-[46px] font-normal text-center text-[#2d2f2f] font-farro mb-12 md:mb-16">
          FAQ
        </h2>

        {/* FAQ Accordion List */}
        <div className="max-w-[850px] mx-auto border-t border-[#c4beaf]/50">
          {faqData.map((item, index) => (
            <FAQItem
              key={item.number}
              number={item.number}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
