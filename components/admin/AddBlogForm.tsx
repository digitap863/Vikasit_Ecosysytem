"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Upload,
  X,
  Loader,
  HelpCircle,
  Eye,
  Edit,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import {
  addBlogPostToDb,
  updateBlogPostInDb,
  BLOG_CATEGORIES,
  BlogPost,
} from "@/lib/blogData";

interface AddBlogFormProps {
  onSuccess: (post: BlogPost) => void;
  onCancel?: () => void;
  initialData?: BlogPost | null;
}

export default function AddBlogForm({ onSuccess, onCancel, initialData }: AddBlogFormProps) {
  const isEditing = Boolean(initialData);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [errorMsg, setErrorMsg] = useState("");

  // Tag state
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  // Form State
  const [form, setForm] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    shortDescription:
      initialData?.shortDescription || initialData?.content?.intro || "",
    content: initialData?.content?.html || "",
    category: initialData?.category || "waste management",
    customCategory: "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    author: initialData?.author || "Vikasit Team",
    publishDate:
      initialData?.date || new Date().toISOString().split("T")[0],
    status: initialData?.status || "Published",
    featuredImage: initialData?.image || "/project1.webp",
    featuredImageAlt: initialData?.featuredImageAlt || "",
    canonicalUrl: initialData?.canonicalUrl || "",
    schemaMarkup: initialData?.schemaMarkup || "",
    readTime: initialData?.readTime || "5 Min Read",
  });

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Auto-generate slug from title if title is being changed
    if (name === "title") {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setForm((prev) => ({ ...prev, title: value, slug: generatedSlug }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleaned = tagInput.trim().replace(/,$/, "");
      if (cleaned && !tags.includes(cleaned)) {
        setTags([...tags, cleaned]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        setForm((prev) => ({ ...prev, featuredImage: json.url }));
      } else {
        setErrorMsg(json.error || "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error uploading image file.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.title.trim() || !form.slug.trim()) {
      setErrorMsg("Please provide a title and URL slug.");
      return;
    }

    if (!form.featuredImage) {
      setErrorMsg("Please provide or upload a featured image.");
      return;
    }

    setLoading(true);

    try {
      let finalTags = [...tags];
      if (tagInput.trim()) {
        const cleaned = tagInput.trim().replace(/,$/, "");
        if (cleaned && !finalTags.includes(cleaned)) {
          finalTags.push(cleaned);
        }
      }

      const finalCategory =
        form.category === "custom" ? form.customCategory || "General" : form.category;

      const payload = {
        title: form.title.toUpperCase(),
        slug: form.slug.toLowerCase(),
        category: finalCategory,
        date: form.publishDate,
        readTime: form.readTime || "5 Min Read",
        image: form.featuredImage,
        featuredImageAlt: form.featuredImageAlt,
        status: form.status,
        shortDescription: form.shortDescription,
        author: form.author,
        tags: finalTags,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        canonicalUrl: form.canonicalUrl,
        schemaMarkup: form.schemaMarkup,
        content: {
          intro: form.shortDescription,
          html: form.content,
          sections: initialData?.content?.sections || [],
        },
      };

      let resultPost: BlogPost | null = null;
      if (isEditing && initialData) {
        resultPost = await updateBlogPostInDb(initialData.slug, payload);
      } else {
        resultPost = await addBlogPostToDb(payload);
      }

      setLoading(false);

      if (resultPost) {
        onSuccess(resultPost);
      } else {
        setErrorMsg("Failed to save blog post.");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrorMsg("An error occurred while saving the article.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto pb-16">
      {errorMsg && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 flex items-center justify-between">
          <span>{errorMsg}</span>
          <button
            type="button"
            onClick={() => setErrorMsg("")}
            className="text-red-500 hover:text-red-800"
          >
            ✕
          </button>
        </div>
      )}

      {/* Sticky Header Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border border-neutral-200 p-3.5 md:p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4 transition-all">
        <div className="flex items-center gap-3 min-w-0">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-neutral-600 hover:text-[#056826] transition-colors bg-neutral-100 hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-neutral-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
          <div className="h-4 w-px bg-neutral-200 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              {isEditing ? "Editing:" : "Creating:"}
            </span>
            <h2 className="text-sm font-bold text-neutral-900 truncate max-w-xs md:max-w-md font-satoshi">
              {form.title || "New Blog Post"}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <div className="flex items-center gap-2">
            <select
              name="status"
              value={form.status}
              onChange={handleTextChange}
              className="px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#056826]"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#056826] hover:bg-[#034c1c] text-white font-semibold py-1.5 px-4 rounded-xl transition-all duration-300 text-xs md:text-sm shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {loading && <Loader className="w-3.5 h-3.5 animate-spin" />}
            <span>{isEditing ? "Save Changes" : "Save Article"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Form Fields (8 Columns) */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-neutral-900 font-satoshi pb-3 border-b border-neutral-100">
            Post Details
          </h3>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700 block">Title *</label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleTextChange}
              placeholder="e.g. Why Waste Management Services in Bangalore Are Essential for a Cleaner Future"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#056826]/10 focus:border-[#056826] transition-all text-sm font-satoshi font-semibold text-neutral-900"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700 block">
              Slug (URL endpoint) *
            </label>
            <div className="flex overflow-hidden rounded-xl border border-neutral-200 focus-within:border-[#056826] transition-all">
              <span className="flex items-center border-r border-neutral-200 bg-neutral-50 px-3 font-mono text-xs text-neutral-500">
                /blog/
              </span>
              <input
                type="text"
                name="slug"
                required
                value={form.slug}
                onChange={handleTextChange}
                placeholder="auto-generated-from-title"
                className="w-full px-4 py-2.5 outline-none text-sm font-mono text-neutral-900"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700 block">
              Short Description / Introduction *
            </label>
            <textarea
              name="shortDescription"
              required
              value={form.shortDescription}
              onChange={handleTextChange}
              rows={3}
              placeholder="Summarize your article in 2-3 sentences. Displays in card listing grids and page introduction..."
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#056826]/10 focus:border-[#056826] transition-all text-sm font-satoshi text-neutral-800 leading-relaxed"
            />
          </div>

          {/* Rich Content Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-neutral-700">
                Full Content (HTML Supported) *
              </label>

              {/* Tab Selector */}
              <div className="flex bg-neutral-100 rounded-lg p-0.5 border border-neutral-200 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("write")}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    activeTab === "write"
                      ? "bg-white text-neutral-800 shadow-xs font-semibold"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Write</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    activeTab === "preview"
                      ? "bg-white text-neutral-800 shadow-xs font-semibold"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {activeTab === "write" ? (
              <RichTextEditor
                value={form.content}
                onChange={(value) => setForm((prev) => ({ ...prev, content: value }))}
                placeholder="Draft your full article layout. Use formatting tools above to structure headings, lists, quotes, tables, callout boxes, and paragraphs..."
              />
            ) : (
              <div className="border border-neutral-200 rounded-xl p-6 bg-[#fafafa] min-h-[350px] prose prose-sm max-w-none font-satoshi overflow-y-auto leading-relaxed text-neutral-800">
                {form.content ? (
                  <div dangerouslySetInnerHTML={{ __html: form.content }} />
                ) : (
                  <p className="text-neutral-400 font-light italic">
                    Nothing to preview yet. Start typing under the Write tab!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Options & Actions (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main Action Block */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="font-bold text-neutral-900 font-satoshi">Publish Options</h4>

            {/* Status Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleTextChange}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-sm font-satoshi"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleTextChange}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-sm font-satoshi"
              >
                {BLOG_CATEGORIES.filter((cat) => cat !== "All").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="custom">Add custom category...</option>
              </select>
              {form.category === "custom" && (
                <input
                  type="text"
                  placeholder="Custom Category Name"
                  value={form.customCategory}
                  onChange={(e) => setForm((prev) => ({ ...prev, customCategory: e.target.value }))}
                  className="mt-2 w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 focus:outline-none focus:border-[#056826] text-xs font-satoshi"
                />
              )}
            </div>

            {/* Author */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Author
              </label>
              <input
                type="text"
                name="author"
                required
                value={form.author}
                onChange={handleTextChange}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-sm font-satoshi"
              />
            </div>

            {/* Publish Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Publish Date
              </label>
              <input
                type="text"
                name="publishDate"
                required
                value={form.publishDate}
                onChange={handleTextChange}
                placeholder="e.g. September 1, 2026"
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-sm font-satoshi"
              />
            </div>

            {/* Read Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Read Time
              </label>
              <input
                type="text"
                name="readTime"
                value={form.readTime}
                onChange={handleTextChange}
                placeholder="e.g. 5 Min Read"
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-sm font-satoshi"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#056826] hover:bg-[#034c1c] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              <span>{isEditing ? "Save Changes" : "Publish Article"}</span>
            </button>
          </div>

          {/* Featured Image Block */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="font-bold text-neutral-900 font-satoshi">Featured Image *</h4>
            {form.featuredImage ? (
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-inner">
                  <img
                    src={form.featuredImage}
                    alt={form.featuredImageAlt || "Featured Image Preview"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, featuredImage: "" }))}
                  className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="relative border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:bg-emerald-50/50 hover:border-[#056826]/40 transition-colors flex flex-col justify-center items-center">
                {uploading ? (
                  <div className="py-6 flex flex-col items-center">
                    <Loader className="w-8 h-8 text-[#056826] animate-spin mb-2" />
                    <span className="text-xs text-neutral-500 font-light">
                      Uploading image...
                    </span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-[#056826] mb-2" />
                    <span className="text-xs text-neutral-700 font-semibold block">
                      Click to upload image
                    </span>
                    <span className="text-[10px] text-neutral-400 font-light mt-1 block">
                      Support PNG, JPG, JPEG, WEBP
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
            )}

            {/* Image URL Input fallback */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Cover Image URL
              </label>
              <input
                type="text"
                name="featuredImage"
                value={form.featuredImage}
                onChange={handleTextChange}
                placeholder="e.g. /project1.webp or https://..."
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-xs font-mono text-neutral-800"
              />
            </div>

            {/* Image Alt Text */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Image Alt Text (SEO)
              </label>
              <input
                type="text"
                name="featuredImageAlt"
                value={form.featuredImageAlt}
                onChange={handleTextChange}
                placeholder="Descriptive alt text for image SEO..."
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-xs font-satoshi text-neutral-800"
              />
            </div>
          </div>

          {/* Tags Chips Block */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="font-bold text-neutral-900 font-satoshi">Tags & Keywords</h4>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Type tag and press Enter or comma..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-sm font-satoshi"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.length === 0 ? (
                  <span className="text-xs text-neutral-400 italic font-light">
                    No tags added yet.
                  </span>
                ) : (
                  tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-emerald-50 text-[#056826] font-semibold px-2.5 py-1 rounded-full text-xs border border-emerald-200"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-emerald-600 hover:text-red-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* SEO Block */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="font-bold text-neutral-900 font-satoshi flex items-center justify-between">
              <span>SEO Optimization</span>
              <span title="Search engine indexing meta tags">
                <HelpCircle className="w-4 h-4 text-neutral-400" />
              </span>
            </h4>

            {/* Meta Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                value={form.metaTitle}
                onChange={handleTextChange}
                placeholder="Override page title tag for search engines"
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-sm font-satoshi"
              />
            </div>

            {/* Meta Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={form.metaDescription}
                onChange={handleTextChange}
                rows={3}
                placeholder="Override search snippet description"
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-sm font-satoshi"
              />
            </div>

            {/* Canonical URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Canonical URL
              </label>
              <input
                type="text"
                name="canonicalUrl"
                value={form.canonicalUrl}
                onChange={handleTextChange}
                placeholder="https://vikasitecosystems.com/blog/your-slug"
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-sm font-satoshi"
              />
              <span className="text-[10px] text-neutral-400 block">
                Leave empty for auto-default article URL
              </span>
            </div>

            {/* Schema Markup (JSON-LD) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                  Schema Markup (JSON-LD)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const defaultSchema = {
                      "@context": "https://schema.org",
                      "@type": "BlogPosting",
                      headline: form.title || "Blog Post Title",
                      description:
                        form.shortDescription || form.metaDescription || "",
                      image: form.featuredImage ? [form.featuredImage] : [],
                      author: {
                        "@type": "Organization",
                        name: form.author || "Vikasit Team",
                      },
                      publisher: {
                        "@type": "Organization",
                        name: "Vikasit Ecosystems",
                        logo: {
                          "@type": "ImageObject",
                          url: "https://vikasitecosystems.com/circle_logo.webp",
                        },
                      },
                      datePublished:
                        form.publishDate ||
                        new Date().toISOString().split("T")[0],
                    };
                    setForm((prev) => ({
                      ...prev,
                      schemaMarkup: JSON.stringify(defaultSchema, null, 2),
                    }));
                  }}
                  className="text-[11px] text-[#056826] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>+ Generate Schema</span>
                </button>
              </div>
              <textarea
                name="schemaMarkup"
                value={form.schemaMarkup}
                onChange={handleTextChange}
                rows={4}
                placeholder='{"@context": "https://schema.org", "@type": "BlogPosting", ...}'
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#056826] text-xs font-mono"
              />
              <span className="text-[10px] text-neutral-400 block">
                Custom JSON-LD schema. Leave empty for standard auto-generated schema.
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
