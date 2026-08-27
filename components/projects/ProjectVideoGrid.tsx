"use client";

import { useState } from "react";
import VideoModal from "@/components/VideoModal";
import ScrollAnimation from "@/components/ui/ScrollAnimation";

export interface ProjectVideo {
  id: string;
  title: string;
  category: "WMaaS" | "Composting" | "Biomass" | "Automation" | "Field Action";
  description: string;
  videoUrl: string;
  duration?: string;
  location?: string;
}

export interface ProjectImage {
  id: string;
  title: string;
  category: "WMaaS" | "Composting" | "Biomass" | "Automation" | "Field Action";
  description: string;
  imageUrl: string;
  location?: string;
}

const CATEGORIES = ["All", "WMaaS", "Composting", "Biomass", "Automation", "Field Action"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

const allProjectVideos: ProjectVideo[] = [
  {
    id: "v1",
    title: "WMaaS Decentralized Processing Operations",
    category: "WMaaS",
    description: "Turnkey decentralized organic waste processing for municipal wards and commercial entities.",
    videoUrl: "/video/wmas.mp4",
    duration: "Full Showcase",
    location: "Field Site Alpha",
  },
  {
    id: "v2",
    title: "Organic Waste to Bio-Compost Transformation",
    category: "Biomass",
    description: "High-speed aerobic processing converting wet organic waste into nutrient-dense soil amendment.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.27.23 PM.mp4",
    duration: "Project Demo",
    location: "Biomass Facility 01",
  },
  {
    id: "v3",
    title: "Decentralized Composting & Resource Recovery Hub",
    category: "Composting",
    description: "Zero-odor community composting units reducing municipal landfill transit emissions.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.27.23 PM (1).mp4",
    duration: "Site Highlight",
    location: "Municipal Ward Hub",
  },
  {
    id: "v4",
    title: "Automated On-Site Waste Segregation System",
    category: "Automation",
    description: "Mechanical segregation lines engineered for high-purity separation of organic fractions.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.27.23 PM (2).mp4",
    duration: "Tech Showcase",
    location: "Automation Yard",
  },
  {
    id: "v5",
    title: "Institutional Waste Diversion Program",
    category: "WMaaS",
    description: "Large-scale institutional waste management partnership across municipal smart city zones.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.45.24 PM.mp4",
    duration: "Impact Story",
    location: "Smart City Sector 04",
  },
  {
    id: "v6",
    title: "Industrial Biomass Conversion Line",
    category: "Biomass",
    description: "High-capacity continuous organic waste conversion for agricultural soil restoration.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.45.41 PM.mp4",
    duration: "Field Footage",
    location: "Resource Hub B",
  },
  {
    id: "v7",
    title: "Continuous Aerobic Digestion Facility",
    category: "Composting",
    description: "Inside tour of zero-emission enclosed composting setup with automated aeration controls.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.45.56 PM.mp4",
    duration: "Facility Tour",
    location: "Processing Center A",
  },
  {
    id: "v8",
    title: "Modular Smart Composting Unit Deployment",
    category: "Automation",
    description: "Rapidly deployable modular composting setup equipped with IoT moisture and temperature monitoring.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.45.56 PM (1).mp4",
    duration: "Live Demo",
    location: "Client Installation Site",
  },
  {
    id: "v9",
    title: "Primary Wet Waste Shredding & Sizing",
    category: "Field Action",
    description: "Heavy-duty pre-shredding line sizing raw wet waste prior to high-temperature microbial action.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.46.18 PM.mp4",
    duration: "Action Clip",
    location: "Segregation Yard",
  },
  {
    id: "v10",
    title: "Organic Compost Refinement & Sifting",
    category: "Composting",
    description: "Final screening, curing, and packaging of fine organic compost for agricultural distribution.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.46.18 PM (1).mp4",
    duration: "Output Review",
    location: "Refining Yard",
  },
  {
    id: "v11",
    title: "Circular Waste Ecosystem Logistics",
    category: "WMaaS",
    description: "Operational overview linking waste generators, localized processing hubs, and soil enrichment.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.46.19 PM.mp4",
    duration: "Ecosystem Overview",
    location: "Central Operations Hub",
  },
  {
    id: "v12",
    title: "Industrial Bio-Shredder & Mixer in Action",
    category: "Automation",
    description: "High-torque twin shaft shredding equipment running with low energy input and zero effluent release.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.46.19 PM (1).mp4",
    duration: "Equipment Demo",
    location: "Heavy Equipment Zone",
  },
  {
    id: "v13",
    title: "Field Operational Logistics & Throughput Monitoring",
    category: "Field Action",
    description: "Daily field operations, material handling, and real-time tonnage tracking by site engineers.",
    videoUrl: "/you_are_missing_the_side_porti.mp4",
    duration: "Field Operational",
    location: "Regional Hub",
  },
];

const allProjectImages: ProjectImage[] = [
  {
    id: "img1",
    title: "Industrial Hydraulic Baling Machine",
    category: "Automation",
    description: "High-density compaction machinery optimizing dry recyclable volume for transport.",
    imageUrl: "/product/Bailing_machine.png",
    location: "Processing Yard 01",
  },
  {
    id: "img2",
    title: "Controlled Thermal Treatment Facility",
    category: "WMaaS",
    description: "Advanced thermal incinerator unit with multi-stage scrubbers for zero visible emissions.",
    imageUrl: "/product/Incinerators.png",
    location: "Thermal Facility B",
  },
  {
    id: "img3",
    title: "Heavy-Duty Dual-Shaft Shredder",
    category: "Automation",
    description: "High-torque organic shredding unit engineered for uniform feedstock sizing.",
    imageUrl: "/product/Shedders.png",
    location: "Biomass Processing Yard",
  },
  {
    id: "img4",
    title: "Rotary Trommel Screening Assembly",
    category: "Composting",
    description: "Precision drum screen separating finished bio-compost from coarse organic matter.",
    imageUrl: "/product/Trommels.png",
    location: "Refining Facility",
  },
  {
    id: "img5",
    title: "Continuous Heavy-Duty Conveyor Line",
    category: "Automation",
    description: "Automated material handling system linking primary sorting bays to digestion units.",
    imageUrl: "/product/conveyors.png",
    location: "Transfer Hub Alpha",
  },
  {
    id: "img6",
    title: "Decentralized Field Operations Station",
    category: "Field Action",
    description: "Localized waste recovery unit serving surrounding commercial institutions.",
    imageUrl: "/project1.webp",
    location: "Regional Hub 02",
  },
  {
    id: "img7",
    title: "Urban Waste Segregation & Diversion Hub",
    category: "WMaaS",
    description: "Turnkey municipal waste processing hub handling daily organic waste intake.",
    imageUrl: "/project2.webp",
    location: "Smart City Sector 04",
  },
  {
    id: "img8",
    title: "Aerobic Digestion & Composting Facility",
    category: "Composting",
    description: "High-capacity enclosed composting bay maintaining optimal moisture and aerobic balance.",
    imageUrl: "/project3.webp",
    location: "Central Processing Yard",
  },
  {
    id: "img9",
    title: "Vikasit Ecosystem Integrated Operational Workflow",
    category: "Field Action",
    description: "End-to-end operational architecture mapping collection, processing, and output distribution.",
    imageUrl: "/about_page_workflow.png",
    location: "Operations Command Center",
  },
  {
    id: "img10",
    title: "Live Field Processing Demonstration Site",
    category: "WMaaS",
    description: "On-site processing showcase demonstrating immediate organic volume reduction.",
    imageUrl: "/LiveDemo.webp",
    location: "Client Installation Site",
  },
  {
    id: "img11",
    title: "Soil Enrichment & Reforestation Initiative",
    category: "Biomass",
    description: "Application of nutrient-rich bio-compost for land rehabilitation and green belt creation.",
    imageUrl: "/product/forest_image.png",
    location: "Green Belt Zone",
  },
  {
    id: "img12",
    title: "Modular Waste Transformation Engineering Layout",
    category: "Automation",
    description: "Technical architectural blueprint of modular processing hub with automated controls.",
    imageUrl: "/product/product_side.png",
    location: "Engineering HQ",
  },
];

export default function ProjectVideoGrid() {
  const [activeTab, setActiveTab] = useState<"video" | "image">("video");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [selectedVideo, setSelectedVideo] = useState<ProjectVideo | null>(null);
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Filter items based on active category
  const filteredVideos = allProjectVideos.filter(
    (v) => selectedCategory === "All" || v.category === selectedCategory
  );

  const filteredImages = allProjectImages.filter(
    (img) => selectedCategory === "All" || img.category === selectedCategory
  );

  return (
    <section id="video-grid" className="w-full bg-[#EBE4D5] py-16 sm:py-20 md:py-24 px-6 sm:px-10 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <ScrollAnimation variant="fade-up" className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b3022]/10 border border-[#1b3022]/15 text-[#1b3022] text-xs font-semibold tracking-wider font-farro uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1b3022]" />
            Field Operations & Documentation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-farro text-[#1b3022] tracking-tight mb-4">
            Project Media Library
          </h2>
          <p className="text-base sm:text-lg text-[#1b3022]/80 font-farro font-normal leading-relaxed">
            Explore live operational video documentation and high-resolution field photography from our decentralized waste management sites and machinery deployments.
          </p>
        </ScrollAnimation>

        {/* Media Type Switcher & Filters Bar */}
        <div className="flex flex-col items-center gap-6 mb-10">
          {/* Segmented Control Bar */}
          <div className="inline-flex p-1 rounded-xl bg-[#1b3022]/10 border border-[#1b3022]/15 shadow-inner">
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2 rounded-lg font-farro font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === "video"
                  ? "bg-[#1b3022] text-white shadow-sm"
                  : "text-[#1b3022]/75 hover:text-[#1b3022]"
              }`}
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video Footage ({allProjectVideos.length})
            </button>
            <button
              onClick={() => setActiveTab("image")}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2 rounded-lg font-farro font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === "image"
                  ? "bg-[#1b3022] text-white shadow-sm"
                  : "text-[#1b3022]/75 hover:text-[#1b3022]"
              }`}
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Field Photos ({allProjectImages.length})
            </button>
          </div>

          {/* Category Sub-Filters */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 rounded-lg text-xs font-farro font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1b3022] text-white font-semibold shadow-xs"
                    : "bg-[#1b3022]/5 text-[#1b3022]/80 hover:bg-[#1b3022]/15 border border-[#1b3022]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid View */}
        {activeTab === "video" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onMouseEnter={() => setHoveredId(video.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedVideo(video)}
                className="group relative rounded-xl overflow-hidden bg-[#162219] border border-[#1b3022]/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between aspect-[4/5]"
              >
                {/* Background Video Preview */}
                <video
                  src={video.videoUrl}
                  preload="metadata"
                  muted
                  loop
                  playsInline
                  autoPlay={hoveredId === video.id}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-103 transition-all duration-500 pointer-events-none"
                />

                {/* Refined Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1610] via-black/30 to-black/30 group-hover:from-[#0e1610]/95 transition-opacity duration-300 pointer-events-none" />

                {/* Top Badges */}
                <div className="relative z-10 p-3.5 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="text-[10px] font-semibold font-farro uppercase tracking-wider text-emerald-300 bg-black/60 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-md">
                    {video.category}
                  </span>
                  {video.location && (
                    <span className="text-[10px] font-medium font-farro text-stone-300 bg-black/60 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-md flex items-center gap-1">
                      <svg className="w-3 h-3 fill-current text-emerald-400" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      {video.location}
                    </span>
                  )}
                </div>

                {/* Center Play Icon Button */}
                <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-all duration-300 shadow-md">
                    <svg className="w-5 h-5 translate-x-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 p-4">
                  <h3 className="text-white text-sm sm:text-base font-bold font-farro leading-snug mb-1 line-clamp-1 group-hover:text-emerald-300 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-stone-300 text-xs font-farro font-light line-clamp-2 leading-relaxed opacity-90">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Grid View */}
        {activeTab === "image" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="group relative rounded-xl overflow-hidden bg-[#162219] border border-[#1b3022]/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between aspect-[4/5]"
              >
                {/* Background Image */}
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-103 transition-all duration-500 pointer-events-none"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1610] via-black/25 to-black/20 group-hover:from-[#0e1610]/95 transition-opacity duration-300 pointer-events-none" />

                {/* Top Badges */}
                <div className="relative z-10 p-3.5 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="text-[10px] font-semibold font-farro uppercase tracking-wider text-emerald-300 bg-black/60 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-md">
                    {img.category}
                  </span>
                  {img.location && (
                    <span className="text-[10px] font-medium font-farro text-stone-300 bg-black/60 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-md flex items-center gap-1">
                      <svg className="w-3 h-3 fill-current text-emerald-400" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      {img.location}
                    </span>
                  )}
                </div>

                {/* Center Expand Icon */}
                <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-all duration-300 shadow-md">
                    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 p-4">
                  <h3 className="text-white text-sm sm:text-base font-bold font-farro leading-snug mb-1 line-clamp-1 group-hover:text-emerald-300 transition-colors">
                    {img.title}
                  </h3>
                  <p className="text-stone-300 text-xs font-farro font-light line-clamp-2 leading-relaxed opacity-90">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl || null}
        title={selectedVideo?.title}
      />

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#121c15] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 text-stone-300 hover:text-white hover:bg-black flex items-center justify-center border border-white/15 transition-all cursor-pointer"
            >
              ✕
            </button>
            <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-5 sm:p-6 bg-[#121c15] border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider font-farro text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                  {selectedImage.category}
                </span>
                {selectedImage.location && (
                  <span className="text-xs font-farro text-stone-400 flex items-center gap-1 ml-2">
                    <svg className="w-3.5 h-3.5 fill-current text-emerald-400" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {selectedImage.location}
                  </span>
                )}
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold font-farro mb-1">
                {selectedImage.title}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm font-farro font-normal leading-relaxed opacity-90">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


