"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function RestOfTheLoop() {
  const products = [
    {
      id: "shredders",
      numTag: "01 / SHREDDERS",
      title: "Industrial Shredders",
      description:
        "Our industrial-grade shredders are designed to handle a wide variety of waste materials with efficiency and reliability. Built with robust cutting mechanisms, these machines can process coconut shells, tree branches, wood, paper, and other organic waste into smaller, manageable pieces, making recycling and disposal easier. Shredders not only reduce the volume of waste but also help in preparing materials for further treatment or reuse. With low maintenance needs, high durability, and customizable configurations, our shredders provide an effective solution for industries, businesses, and organizations looking to optimize their waste management processes.",
      image: "/product/Shedders.png",
      alt: "Industrial Shredders Machine",
      imageOnRight: false,
    },
    {
      id: "baling",
      numTag: "02 / BALING MACHINE",
      title: "Bailing Machine",
      description:
        "A Bailing Machine is a mechanical device designed to compress waste or scrap materials into compact, manageable bundles or bales. This equipment is commonly used in recycling facilities, manufacturing units, and waste management operations to reduce the volume of materials such as paper, plastic, metal, or textile waste. By transforming loose waste into tightly packed bales, the bailing machine not only makes storage and transportation more efficient but also supports easier handling and better organization of recyclable materials. Its operation significantly contributes to streamlined waste processing and enhanced sustainability efforts.",
      image: "/product/Bailing_machine.png",
      alt: "Bailing Machine",
      imageOnRight: true,
    },
    {
      id: "conveyors",
      numTag: "03 / CONVEYORS",
      title: "Conveyor Systems",
      description:
        "Our conveyor systems are designed to seamlessly transport waste materials across various stages of processing, sorting, and disposal. Built with heavy-duty frames and high-traction belts, these systems enhance workflow automation in recycling centers, composting plants, and industrial waste facilities. By optimizing material flow, reducing manual handling, and supporting continuous operations, conveyor systems improve overall plant efficiency, safety, and productivity.",
      image: "/product/conveyors.png",
      alt: "Conveyor Systems",
      imageOnRight: false,
    },
    {
      id: "incinerators",
      numTag: "04 / INCINERATORS",
      title: "Incinerators",
      description:
        "Our incinerators are specially designed for the safe and hygienic disposal of sanitary pads and other similar waste. By using high-temperature combustion, they effectively reduce the waste to sterile ash, ensuring zero contamination and no harmful impact on the surroundings. Compact, efficient, and easy to operate, these incinerators provide a sustainable solution for schools, colleges, offices, hospitals, and public facilities. They help maintain cleanliness, promote hygiene, and offer a responsible way to manage sanitary waste in an eco-friendly manner.",
      image: "/product/Incinerators.png",
      alt: "Incinerators",
      imageOnRight: true,
    },
    {
      id: "trommels",
      numTag: "05 / TROMMELS",
      title: "TROMMELS",
      description:
        "Trommels are rotating cylindrical sieves used to wash and sort waste into manageable categories based on size and type. They help separate materials efficiently, improving the recycling and disposal process. Trommels are ideal for handling mixed waste, making sorting faster and more accurate. We offer them in a range of sizes—small, big, bigger, and biggest—to suit various operational needs.",
      image: "/product/Trommels.png",
      alt: "Trommels Machine",
      imageOnRight: false,
    },
    {
      id: "soil-enricher",
      numTag: "06 / VIKASIT CHAKRA",
      title: "Soil Enricher For Healthy Plants",
      description:
        "VIKASIT CHAKRA is a premium organic soil enricher that improves soil fertility and promotes healthier plant growth naturally. Made from eco-friendly organic ingredients, it enhances nutrient absorption, strengthens roots, and supports sustainable farming. Ideal for home gardens, farms, and landscaping, it helps cultivate greener, healthier, and more productive plants.",
      image: "/product/vikasit_chakra.png",
      alt: "Soil Enricher Vikasit Chakra",
      imageOnRight: true,
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative w-full bg-[#EBE4D5] text-[#1A1A1A] overflow-hidden py-16 sm:py-20 lg:py-24 border-t border-[#E0D8C8]/60">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-20">
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={headerVariants}
            className="space-y-3 max-w-[850px]"
          >
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#2E7D32] uppercase block font-sans">
              OTHER PRODUCTS
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-extrabold text-[#1A1A1A] tracking-tight leading-[1.1] font-farro"
              style={{
                textShadow: "0px 3px 8px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              The Rest Of The Loop.
            </h2>

            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-sans">
              Proprietary tools and technology that support the Soil Maker across
              collection, sorting and disposal.
            </p>
          </motion.div>

          {/* Product Items List with Scroll Reveal Animations */}
          <div className="space-y-10 sm:space-y-14 lg:space-y-18">
            {products.map((prod, idx) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" as const }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Product Image Column */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3 }}
                  className={`lg:col-span-5 flex items-center justify-center ${
                    prod.imageOnRight ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] flex items-center justify-center p-2">
                    <Image
                      src={prod.image}
                      alt={prod.alt}
                      fill
                      className="object-contain object-center drop-shadow-2xl transition-transform duration-300"
                    />
                  </div>
                </motion.div>

                {/* Product Text Column */}
                <div
                  className={`lg:col-span-7 space-y-4 ${
                    prod.imageOnRight ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Number & Category Tag */}
                  <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#2E7D32] uppercase block font-sans">
                    {prod.numTag}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#1A1A1A] tracking-tight leading-tight font-farro"
                    style={{
                      textShadow: "0px 2px 6px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    {prod.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-700 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed font-sans max-w-[640px]">
                    {prod.description}
                  </p>

                  {/* Enquire Now Action Button -> Routes to /contact with pre-filled product query */}
                  <div className="pt-2">
                    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <Link
                        href={`/contact?product=${encodeURIComponent(prod.title)}`}
                        className="inline-flex items-center gap-2 border border-[#2B2B2C] text-[#1A1A1A] hover:bg-[#2B2B2C] hover:text-white px-7 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <span>Enquire Now</span>
                        <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
