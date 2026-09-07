"use client";

import React, { useState, useEffect, useCallback } from "react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { ProjectVideo, INITIAL_PROJECT_VIDEOS, fetchAllProjectVideos } from "@/lib/videoData";
import { fetchAllProjectPhotos } from "@/lib/photoData";

interface ProjectImage {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  location?: string;
}

const STATIC_PROJECT_IMAGES: ProjectImage[] = [
  {
    id: "p-img-1",
    title: "Vikasit Ecosystems Site Operations",
    category: "Field Photos",
    description: "Decentralized waste management project site operational showcase.",
    imageUrl: "/projects/Vikasit-Ecosystems-12-1024x768-1.webp",
  },
  {
    id: "p-img-2",
    title: "On-Site Waste Segregation Facility",
    category: "Field Photos",
    description: "Primary material sorting and throughput handling at project site.",
    imageUrl: "/projects/Vikasit-Ecosystems-16-1024x684-1.webp",
  },
  {
    id: "p-img-3",
    title: "Heavy Equipment Processing Yard",
    category: "Field Photos",
    description: "High-volume waste processing machinery running on-site.",
    imageUrl: "/projects/Vikasit-Ecosystems-17-1024x684-1.webp",
  },
  {
    id: "p-img-4",
    title: "Automated Waste Reduction Unit",
    category: "Field Photos",
    description: "Automated machinery converting bulk organic waste into usable material.",
    imageUrl: "/projects/Vikasit-Ecosystems-18-1024x684-1.webp",
  },
  {
    id: "p-img-5",
    title: "Material Handling & Storage Zone",
    category: "Field Photos",
    description: "Organized staging area for processed recyclable material.",
    imageUrl: "/projects/Vikasit-Ecosystems-21-1024x684-1.webp",
  },
  {
    id: "p-img-6",
    title: "Decentralized Processing Installation",
    category: "Field Photos",
    description: "Field deployment of zero-landfill composting solutions.",
    imageUrl: "/projects/Vikasit-Ecosystems-24-1024x768-1.webp",
  },
  {
    id: "p-img-7",
    title: "Commercial Site Processing Operation",
    category: "Field Photos",
    description: "Daily operational workflow at commercial waste transformation site.",
    imageUrl: "/projects/Vikasit-Ecosystems-25-1024x768-1.webp",
  },
  {
    id: "p-img-8",
    title: "Field Action Infrastructure",
    category: "Field Photos",
    description: "Complete waste management plant layout operating at scale.",
    imageUrl: "/projects/Vikasit-Ecosystems-28-1024x789-1.webp",
  },
  {
    id: "p-img-9",
    title: "Decentralized Plant Logistics",
    category: "Field Photos",
    description: "Overview of site logistics and organic waste collection.",
    imageUrl: "/projects/Vikasit-Ecosystems-3-1024x683-1.webp",
  },
  {
    id: "p-img-10",
    title: "Vruthi Project Site - Overview 01",
    category: "Field Photos",
    description: "Field documentation of Vruthi 25 site machinery deployment.",
    imageUrl: "/projects/Vruthi-25-1.webp",
  },
  {
    id: "p-img-11",
    title: "Vruthi Project Site - Material Sorting 03",
    category: "Field Photos",
    description: "Sorting and staging area at Vruthi waste management plant.",
    imageUrl: "/projects/Vruthi-25-3.webp",
  },
  {
    id: "p-img-12",
    title: "Vruthi Project Site - Composting Unit 04",
    category: "Field Photos",
    description: "Operational composting machinery processing organic waste.",
    imageUrl: "/projects/Vruthi-25-4.webp",
  },
  {
    id: "p-img-13",
    title: "Vruthi Project Site - Equipment Setup 06",
    category: "Field Photos",
    description: "Heavy machinery operational setup at Vruthi project site.",
    imageUrl: "/projects/Vruthi-25-6.webp",
  },
  {
    id: "p-img-14",
    title: "Vruthi Project Site - Field Action 07",
    category: "Field Photos",
    description: "Site engineers monitoring waste throughput at Vruthi site.",
    imageUrl: "/projects/Vruthi-25-7-scaled.webp",
  },
  {
    id: "p-img-15",
    title: "Vruthi Project Site - Facility View 08",
    category: "Field Photos",
    description: "High-resolution photography of active Vruthi facility.",
    imageUrl: "/projects/Vruthi-25-8-scaled.webp",
  },
  {
    id: "p-img-16",
    title: "Vruthi Project Site - Operations 09",
    category: "Field Photos",
    description: "Daily operational workflow and material transformation.",
    imageUrl: "/projects/Vruthi-25-9-scaled.webp",
  },
  {
    id: "p-img-17",
    title: "Vruthi Project Site - Plant Yard 10",
    category: "Field Photos",
    description: "Full yard view of Vruthi waste management infrastructure.",
    imageUrl: "/projects/Vruthi-25-10-scaled.webp",
  },
  {
    id: "p-img-18",
    title: "St. Martha Installation - Site View 01",
    category: "Field Photos",
    description: "Field deployment photography at St. Martha project location.",
    imageUrl: "/projects/st-martha-1-1.webp",
  },
  {
    id: "p-img-19",
    title: "St. Martha Installation - Machine Setup 02",
    category: "Field Photos",
    description: "Organic waste converter installation at St. Martha site.",
    imageUrl: "/projects/st-martha-2-1.webp",
  },
  {
    id: "p-img-20",
    title: "St. Martha Installation - Operational Run 03",
    category: "Field Photos",
    description: "Operational run of Soil Maker OWC unit at St. Martha site.",
    imageUrl: "/projects/st-martha-3-1.webp",
  },
  {
    id: "p-img-21",
    title: "St. Martha Installation - Processing Yard 04",
    category: "Field Photos",
    description: "High-volume waste processing yard at St. Martha facility.",
    imageUrl: "/projects/st-martha-4-1.webp",
  },
  {
    id: "p-img-22",
    title: "St. Martha Installation - Facility Overview 05",
    category: "Field Photos",
    description: "Complete plant overview of St. Martha waste management project.",
    imageUrl: "/projects/st-martha-5-1.webp",
  },
];

export default function ProjectVideoGrid() {
  const [activeTab, setActiveTab] = useState<"video" | "image">("video");
  const [videos, setVideos] = useState<ProjectVideo[]>(INITIAL_PROJECT_VIDEOS);
  const [images, setImages] = useState<ProjectImage[]>(STATIC_PROJECT_IMAGES);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const loadData = useCallback(async () => {
    try {
      const fetchedVideos = await fetchAllProjectVideos();
      if (fetchedVideos && fetchedVideos.length > 0) {
        setVideos(fetchedVideos);
      }

      const fetchedPhotos = await fetchAllProjectPhotos();
      if (fetchedPhotos && fetchedPhotos.length > 0) {
        const formattedPhotos: ProjectImage[] = fetchedPhotos.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category || "Field Photos",
          description: p.description || "",
          imageUrl: p.imageUrl,
        }));

        const combined = [...formattedPhotos];
        STATIC_PROJECT_IMAGES.forEach((st) => {
          if (!combined.some((c) => c.imageUrl === st.imageUrl || c.id === st.id)) {
            combined.push(st);
          }
        });
        setImages(combined);
      }
    } catch (e) {
      console.error("Error loading project videos/photos:", e);
    }
  }, []);

  useEffect(() => {
    loadData();

    if (typeof window !== "undefined") {
      window.addEventListener("vikasit_videos_updated", loadData);
      window.addEventListener("vikasit_photos_updated", loadData);
      return () => {
        window.removeEventListener("vikasit_videos_updated", loadData);
        window.removeEventListener("vikasit_photos_updated", loadData);
      };
    }
  }, [loadData]);

  const currentImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  const handlePrevImage = useCallback(() => {
    if (selectedImageIndex === null || images.length === 0) return;
    setSelectedImageIndex((prev) => (prev! === 0 ? images.length - 1 : prev! - 1));
  }, [selectedImageIndex, images.length]);

  const handleNextImage = useCallback(() => {
    if (selectedImageIndex === null || images.length === 0) return;
    setSelectedImageIndex((prev) => (prev! === images.length - 1 ? 0 : prev! + 1));
  }, [selectedImageIndex, images.length]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setSelectedImageIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, handlePrevImage, handleNextImage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      handleNextImage(); // Swiped left -> Next
    } else if (diff < -40) {
      handlePrevImage(); // Swiped right -> Prev
    }
    setTouchStartX(null);
  };

  return (
    <section id="video-grid" className="w-full bg-[#EBE4D5]  px-6 sm:px-10 lg:px-12">
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

        {/* Media Type Switcher Bar */}
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="inline-flex p-1 rounded-xl bg-[#343433]/10 border border-[#1b3022]/15 shadow-inner">
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2 rounded-lg font-farro font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === "video"
                  ? "bg-[#343433] text-white shadow-sm"
                  : "text-[#1b3022]/75 hover:text-[#1b3022]"
              }`}
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video Footage ({videos.length})
            </button>
            <button
              onClick={() => setActiveTab("image")}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2 rounded-lg font-farro font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === "image"
                  ? "bg-[#343433] text-white shadow-sm"
                  : "text-[#1b3022]/75 hover:text-[#1b3022]"
              }`}
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Field Photos ({images.length})
            </button>
          </div>
        </div>

        {/* Video Grid View (YouTube Embedded Player Cards) */}
        {activeTab === "video" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-neutral-400/30 bg-black"
              >
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ))}
          </div>
        )}

        {/* Image Grid View */}
        {activeTab === "image" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {images.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setSelectedImageIndex(index)}
                className="group relative rounded-xl overflow-hidden bg-stone-900 border border-stone-800 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer aspect-[4/3] flex flex-col justify-end"
              >
                {/* Image */}
                <img
                  src={img.imageUrl}
                  alt={img.title || "Project Image"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Dark Gradient Overlay for Title Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

                {/* Title Only */}
                <div className="relative z-10 p-2.5 sm:p-3 pointer-events-none">
                  <h3 className="text-white text-xs sm:text-sm font-bold font-farro leading-snug line-clamp-1 group-hover:text-emerald-300 transition-colors">
                    {img.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Gallery Swiper Lightbox Modal */}
      {currentImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-xl p-4 sm:p-6 text-white select-none"
          onClick={() => setSelectedImageIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar Controls */}
          <div
            className="flex items-center justify-between w-full z-20 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold font-farro tracking-wider text-stone-200 border border-white/10">
              {selectedImageIndex! + 1} / {images.length}
            </div>

            <button
              onClick={() => setSelectedImageIndex(null)}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg text-sm"
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>

          {/* Main Uncropped Image Showcase with Swiping Arrow Controls */}
          <div
            className="relative flex-1 flex items-center justify-center w-full my-auto overflow-hidden px-2 sm:px-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Image Arrow Button */}
            {images.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-4 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-emerald-600 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-2xl backdrop-blur-md group"
                title="Previous Image (←)"
              >
                <svg
                  className="w-6 h-6 -translate-x-0.5 stroke-current stroke-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Complete Uncropped Image Display */}
            <div className="relative flex items-center justify-center max-w-full max-h-[82vh] transition-all duration-300">
              <img
                key={currentImage.id}
                src={currentImage.imageUrl}
                alt={currentImage.title || "Project Image"}
                className="max-h-[80vh] max-w-[88vw] w-auto h-auto object-contain rounded-lg shadow-2xl transition-all duration-300 animate-fadeIn"
              />
            </div>

            {/* Next Image Arrow Button */}
            {images.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:right-4 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-emerald-600 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-2xl backdrop-blur-md group"
                title="Next Image (→)"
              >
                <svg
                  className="w-6 h-6 translate-x-0.5 stroke-current stroke-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom Title Capsule Overlay */}
          <div
            className="flex items-center justify-center w-full z-20 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black/75 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/15 max-w-2xl text-center shadow-lg">
              <h3 className="text-white text-xs sm:text-sm font-bold font-farro tracking-wide truncate">
                {currentImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
