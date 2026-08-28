"use client";

import { useState } from "react";
import { addBlogPost, BLOG_CATEGORIES, BlogPost, BlogSection } from "@/components/blog/blogData";

interface AddBlogFormProps {
  onSuccess: (createdPost: BlogPost) => void;
}

const IMAGE_PRESETS = [
  { name: "Project 1", url: "/project1.webp" },
  { name: "Project 2", url: "/project2.webp" },
  { name: "Project 3", url: "/project3.webp" },
  { name: "Tree & Nature", url: "/tree.webp" },
  { name: "Live Demo", url: "/LiveDemo.webp" },
];

export default function AddBlogForm({ onSuccess }: AddBlogFormProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("waste management");
  const [customCategory, setCustomCategory] = useState("");
  const [readTime, setReadTime] = useState("5 Min Read");
  const [image, setImage] = useState("/project1.webp");
  const [intro, setIntro] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Sections Builder state
  const [sections, setSections] = useState<BlogSection[]>([
    {
      title: "UNDERSTANDING THE CORE CHALLENGES",
      subtitle: "",
      paragraphs: [
        "Sustainable waste management requires a multi-layered approach combining modern engineering with decentralized community participation.",
      ],
      bullets: [],
    },
  ]);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(autoSlug);
  };

  // Section manipulation helpers
  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        subtitle: "",
        paragraphs: [""],
        bullets: [],
      },
    ]);
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSectionChange = (index: number, field: keyof BlogSection, value: string) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const handleAddParagraph = (sectionIndex: number) => {
    const updated = [...sections];
    const paragraphs = updated[sectionIndex].paragraphs || [];
    updated[sectionIndex].paragraphs = [...paragraphs, ""];
    setSections(updated);
  };

  const handleParagraphChange = (sectionIndex: number, pIndex: number, val: string) => {
    const updated = [...sections];
    const paragraphs = [...(updated[sectionIndex].paragraphs || [])];
    paragraphs[pIndex] = val;
    updated[sectionIndex].paragraphs = paragraphs;
    setSections(updated);
  };

  const handleRemoveParagraph = (sectionIndex: number, pIndex: number) => {
    const updated = [...sections];
    const paragraphs = (updated[sectionIndex].paragraphs || []).filter((_, i) => i !== pIndex);
    updated[sectionIndex].paragraphs = paragraphs;
    setSections(updated);
  };

  const handleAddBullet = (sectionIndex: number) => {
    const updated = [...sections];
    const bullets = updated[sectionIndex].bullets || [];
    updated[sectionIndex].bullets = [...bullets, ""];
    setSections(updated);
  };

  const handleBulletChange = (sectionIndex: number, bIndex: number, val: string) => {
    const updated = [...sections];
    const bullets = [...(updated[sectionIndex].bullets || [])];
    bullets[bIndex] = val;
    updated[sectionIndex].bullets = bullets;
    setSections(updated);
  };

  const handleRemoveBullet = (sectionIndex: number, bIndex: number) => {
    const updated = [...sections];
    const bullets = (updated[sectionIndex].bullets || []).filter((_, i) => i !== bIndex);
    updated[sectionIndex].bullets = bullets;
    setSections(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title.trim()) {
      setErrorMsg("Please enter an article title.");
      return;
    }
    if (!slug.trim()) {
      setErrorMsg("Please enter a valid URL slug.");
      return;
    }
    if (!intro.trim()) {
      setErrorMsg("Please provide an introduction overview.");
      return;
    }

    setIsSubmitting(true);

    try {
      const finalCategory = category === "custom" ? customCategory || "General" : category;
      const todayFormatted = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const newPostData = {
        title: title.toUpperCase(),
        slug: slug.toLowerCase(),
        category: finalCategory,
        date: todayFormatted,
        readTime: readTime || "5 Min Read",
        image: image || "/project1.webp",
        content: {
          intro,
          sections: sections.filter((s) => s.title || (s.paragraphs && s.paragraphs.length > 0)),
        },
      };

      const created = addBlogPost(newPostData);
      setIsSubmitting(false);
      onSuccess(created);
    } catch (err: unknown) {
      setIsSubmitting(false);
      setErrorMsg("An error occurred while publishing the blog post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-[#121c15] rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-8 font-farro">
      {/* Form Header */}
      <div className="border-b border-white/10 pb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Publish New Article
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Admin Editor
            </span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Create and publish new blog posts directly to the live Vikasit Ecosystem site.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2">
          <span>⚠️</span> {errorMsg}
        </div>
      )}

      {/* Meta Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Article Title */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
            Article Title <span className="text-emerald-400">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="E.g., REVOLUTIONIZING DECENTRALIZED COMPOSTING IN SMART CITIES"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-all font-semibold"
          />
        </div>

        {/* URL Slug */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
            URL Slug <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-xs text-stone-500">/blog/</span>
            <input
              type="text"
              required
              placeholder="revolutionizing-decentralized-composting"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full pl-16 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Category Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
            Category <span className="text-emerald-400">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
          >
            {BLOG_CATEGORIES.filter((c) => c !== "All").map((cat) => (
              <option key={cat} value={cat} className="bg-neutral-900 text-white">
                {cat}
              </option>
            ))}
            <option value="custom" className="bg-neutral-900 text-emerald-400">
              + Add Custom Category
            </option>
          </select>

          {category === "custom" && (
            <input
              type="text"
              placeholder="Enter custom category name..."
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="w-full mt-2 px-4 py-2 bg-black/40 border border-emerald-500/50 rounded-xl text-xs text-white focus:outline-none"
            />
          )}
        </div>

        {/* Read Time */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
            Read Time
          </label>
          <input
            type="text"
            placeholder="5 Min Read"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Cover Image Picker */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
            Cover Image URL
          </label>
          <input
            type="text"
            placeholder="/project1.webp or https://..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
          />
          {/* Presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-stone-400 self-center mr-1">Presets:</span>
            {IMAGE_PRESETS.map((preset) => (
              <button
                type="button"
                key={preset.url}
                onClick={() => setImage(preset.url)}
                className={`px-2 py-0.5 rounded text-[10px] border transition-all cursor-pointer ${
                  image === preset.url
                    ? "bg-emerald-500/30 text-emerald-300 border-emerald-500/50 font-semibold"
                    : "bg-white/5 text-stone-400 border-white/10 hover:text-white"
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cover Image Live Preview */}
      {image && (
        <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
            Cover Image Preview
          </span>
          <div className="relative w-full h-40 rounded-lg overflow-hidden bg-neutral-900 border border-white/10">
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Intro Overview */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
          Article Introduction Overview <span className="text-emerald-400">*</span>
        </label>
        <textarea
          required
          rows={3}
          placeholder="Provide a compelling 2-3 sentence overview introducing the article topic..."
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          className="w-full p-4 bg-black/40 border border-white/15 rounded-xl text-xs text-white leading-relaxed placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-all"
        />
      </div>

      {/* Article Content Sections Builder */}
      <div className="space-y-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Article Content Sections</h3>
            <p className="text-xs text-stone-400">Build key section headers, paragraphs, and bullet points.</p>
          </div>
          <button
            type="button"
            onClick={handleAddSection}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
          >
            + Add New Section
          </button>
        </div>

        {sections.map((section, sIndex) => (
          <div
            key={sIndex}
            className="p-5 rounded-xl bg-black/30 border border-white/10 space-y-4 relative group"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Section #{sIndex + 1}
              </span>
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSection(sIndex)}
                  className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                >
                  Remove Section
                </button>
              )}
            </div>

            {/* Section Heading */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-stone-400 uppercase">
                  Section Title
                </label>
                <input
                  type="text"
                  placeholder="E.g., DECENTRALIZED COMPOSTING MECHANISMS"
                  value={section.title || ""}
                  onChange={(e) => handleSectionChange(sIndex, "title", e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-lg text-xs text-white font-bold uppercase focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-stone-400 uppercase">
                  Section Subtitle (Optional)
                </label>
                <input
                  type="text"
                  placeholder="E.g., HOW AEROBIC DIGESTION REDUCES METHANE"
                  value={section.subtitle || ""}
                  onChange={(e) => handleSectionChange(sIndex, "subtitle", e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Section Paragraphs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-semibold text-stone-400 uppercase">
                  Paragraph Blocks
                </label>
                <button
                  type="button"
                  onClick={() => handleAddParagraph(sIndex)}
                  className="text-[10px] text-emerald-400 hover:underline font-semibold cursor-pointer"
                >
                  + Add Paragraph
                </button>
              </div>

              {(section.paragraphs || []).map((para, pIndex) => (
                <div key={pIndex} className="flex gap-2 items-start">
                  <textarea
                    rows={2}
                    placeholder={`Paragraph ${pIndex + 1} text content...`}
                    value={para}
                    onChange={(e) => handleParagraphChange(sIndex, pIndex, e.target.value)}
                    className="flex-1 p-2.5 bg-black/50 border border-white/10 rounded-lg text-xs text-stone-200 leading-relaxed focus:outline-none focus:border-emerald-500"
                  />
                  {(section.paragraphs || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(sIndex, pIndex)}
                      className="text-stone-500 hover:text-red-400 text-xs p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Section Bullets */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-semibold text-stone-400 uppercase">
                  Bullet Points (Optional)
                </label>
                <button
                  type="button"
                  onClick={() => handleAddBullet(sIndex)}
                  className="text-[10px] text-emerald-400 hover:underline font-semibold cursor-pointer"
                >
                  + Add Bullet Point
                </button>
              </div>

              {(section.bullets || []).map((bullet, bIndex) => (
                <div key={bIndex} className="flex gap-2 items-center">
                  <span className="text-emerald-400 text-xs">•</span>
                  <input
                    type="text"
                    placeholder={`Bullet point ${bIndex + 1}...`}
                    value={bullet}
                    onChange={(e) => handleBulletChange(sIndex, bIndex, e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBullet(sIndex, bIndex)}
                    className="text-stone-500 hover:text-red-400 text-xs p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-white/10 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-farro text-sm shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Publishing Article..." : "🚀 Publish Article Live"}
        </button>
      </div>
    </form>
  );
}
