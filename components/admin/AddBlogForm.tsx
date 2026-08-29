"use client";

import type React from "react";
import { useState } from "react";
import {
  addBlogPostToDb,
  updateBlogPostInDb,
  BLOG_CATEGORIES,
  BlogPost,
  BlogSection,
} from "@/lib/blogData";

interface AddBlogFormProps {
  onSuccess: (post: BlogPost) => void;
  onCancel?: () => void;
  initialData?: BlogPost | null;
}

export default function AddBlogForm({ onSuccess, onCancel, initialData }: AddBlogFormProps) {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "waste management");
  const [customCategory, setCustomCategory] = useState("");
  const [readTime, setReadTime] = useState(initialData?.readTime || "5 Min Read");
  const [image, setImage] = useState(initialData?.image || "/project1.webp");
  const [uploadedImageName, setUploadedImageName] = useState("");
  const [intro, setIntro] = useState(initialData?.content?.intro || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sections, setSections] = useState<BlogSection[]>(
    initialData?.content?.sections && initialData.content.sections.length > 0
      ? initialData.content.sections
      : [
          {
            title: "",
            subtitle: "",
            paragraphs: [""],
            bullets: [],
          },
        ]
  );

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );
  };

  const updateSection = (index: number, updates: Partial<BlogSection>) => {
    setSections((current) =>
      current.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...updates } : section
      )
    );
  };

  const addSection = () => {
    setSections((current) => [
      ...current,
      { title: "", subtitle: "", paragraphs: [""], bullets: [] },
    ]);
  };

  const removeSection = (index: number) => {
    setSections((current) => current.filter((_, sectionIndex) => sectionIndex !== index));
  };

  const updateParagraph = (sectionIndex: number, paragraphIndex: number, value: string) => {
    const paragraphs = [...(sections[sectionIndex].paragraphs || [])];
    paragraphs[paragraphIndex] = value;
    updateSection(sectionIndex, { paragraphs });
  };

  const addParagraph = (sectionIndex: number) => {
    updateSection(sectionIndex, {
      paragraphs: [...(sections[sectionIndex].paragraphs || []), ""],
    });
  };

  const removeParagraph = (sectionIndex: number, paragraphIndex: number) => {
    updateSection(sectionIndex, {
      paragraphs: (sections[sectionIndex].paragraphs || []).filter(
        (_, index) => index !== paragraphIndex
      ),
    });
  };

  const updateBullet = (sectionIndex: number, bulletIndex: number, value: string) => {
    const bullets = [...(sections[sectionIndex].bullets || [])];
    bullets[bulletIndex] = value;
    updateSection(sectionIndex, { bullets });
  };

  const addBullet = (sectionIndex: number) => {
    updateSection(sectionIndex, {
      bullets: [...(sections[sectionIndex].bullets || []), ""],
    });
  };

  const removeBullet = (sectionIndex: number, bulletIndex: number) => {
    updateSection(sectionIndex, {
      bullets: (sections[sectionIndex].bullets || []).filter((_, index) => index !== bulletIndex),
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file.");
      return;
    }

    const maxSizeInBytes = 2 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setErrorMsg("Please upload an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
        setUploadedImageName(file.name);
        setErrorMsg("");
      }
    };
    reader.onerror = () => {
      setErrorMsg("Could not read the uploaded image. Please try another file.");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg("");

    if (!title.trim() || !slug.trim() || !intro.trim()) {
      setErrorMsg("Please complete the title, slug, and introduction before saving.");
      return;
    }

    setIsSubmitting(true);

    try {
      const finalCategory = category === "custom" ? customCategory || "General" : category;
      const todayFormatted =
        initialData?.date ||
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

      const payload = {
        title: title.toUpperCase(),
        slug: slug.toLowerCase(),
        category: finalCategory,
        date: todayFormatted,
        readTime: readTime || "5 Min Read",
        image: image || "/project1.webp",
        content: {
          intro,
          html: initialData?.content?.html,
          sections: sections
            .map((section) => ({
              ...section,
              paragraphs: (section.paragraphs || []).filter(Boolean),
              bullets: (section.bullets || []).filter(Boolean),
            }))
            .filter(
              (section) =>
                section.title ||
                section.subtitle ||
                (section.paragraphs && section.paragraphs.length > 0) ||
                (section.bullets && section.bullets.length > 0)
            ),
        },
      };

      let resultPost: BlogPost | null = null;
      if (initialData) {
        resultPost = await updateBlogPostInDb(initialData.slug, payload);
      } else {
        resultPost = await addBlogPostToDb(payload);
      }

      setIsSubmitting(false);
      if (resultPost) {
        onSuccess(resultPost);
      } else {
        setErrorMsg("Failed to save changes.");
      }
    } catch {
      setIsSubmitting(false);
      setErrorMsg("An error occurred while saving the article.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      <section className="rounded-lg border border-neutral-200 bg-white">
        <div className="border-b border-neutral-200 px-5 py-4">
          <h3 className="text-base font-bold text-neutral-950">Article Details</h3>
          <p className="mt-1 text-xs font-medium text-neutral-500">
            Set the title, permalink, category, and banner image.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-neutral-600">
              Article Title
            </label>
            <input
              type="text"
              required
              placeholder="Revolutionizing decentralized composting"
              value={title}
              onChange={(event) => handleTitleChange(event.target.value)}
              className="h-11 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm font-semibold text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#056826]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-neutral-600">
              URL Slug
            </label>
            <div className="flex h-11 overflow-hidden rounded-md border border-neutral-300 bg-white focus-within:border-[#056826]">
              <span className="flex items-center border-r border-neutral-200 bg-neutral-50 px-3 font-mono text-xs text-neutral-500">
                /blog/
              </span>
              <input
                type="text"
                required
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                className="min-w-0 flex-1 px-3 font-mono text-xs font-semibold text-neutral-900 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-neutral-600">
              Category
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 w-full rounded-md border border-neutral-300 bg-white px-3 text-xs font-semibold text-neutral-800 outline-none transition-colors focus:border-[#056826]"
            >
              {BLOG_CATEGORIES.filter((item) => item !== "All").map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              <option value="custom">Add custom category</option>
            </select>
            {category === "custom" && (
              <input
                type="text"
                placeholder="Category name"
                value={customCategory}
                onChange={(event) => setCustomCategory(event.target.value)}
                className="mt-2 h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-xs font-semibold text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#056826]"
              />
            )}
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-neutral-600">
              Read Time
            </label>
            <input
              type="text"
              value={readTime}
              onChange={(event) => setReadTime(event.target.value)}
              className="h-11 w-full rounded-md border border-neutral-300 bg-white px-3 text-xs font-semibold text-neutral-800 outline-none transition-colors focus:border-[#056826]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-neutral-600">
              Cover Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(event) => {
                setImage(event.target.value);
                setUploadedImageName("");
              }}
              className="h-11 w-full rounded-md border border-neutral-300 bg-white px-3 font-mono text-xs font-semibold text-neutral-800 outline-none transition-colors focus:border-[#056826]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-neutral-600">
              Upload Cover Image
            </label>
            <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-4 py-5 text-center transition-colors hover:border-[#056826]/40 hover:bg-[#edf6ef]">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
              />
              <svg className="h-6 w-6 fill-none stroke-current stroke-2 text-[#056826]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
              </svg>
              <span className="mt-2 text-xs font-bold text-neutral-800">
                {uploadedImageName || "Choose an image"}
              </span>
              <span className="mt-1 text-[11px] font-medium text-neutral-500">
                JPG, PNG, WEBP up to 2 MB
              </span>
            </label>

            <div className="mt-4 h-44 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
              <img src={image} alt="Cover preview" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-neutral-600">
              Introduction
            </label>
            <textarea
              required
              rows={4}
              placeholder="Write a short overview for the article."
              value={intro}
              onChange={(event) => setIntro(event.target.value)}
              className="w-full resize-none rounded-md border border-neutral-300 bg-white p-3 text-sm font-medium leading-relaxed text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#056826]"
            />
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-neutral-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-950">Article Sections</h3>
            <p className="mt-1 text-xs font-medium text-neutral-500">
              Add headings, paragraphs, and bullet points for the article body.
            </p>
          </div>
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#056826] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#034c1c]"
          >
            <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
            </svg>
            Add Section
          </button>
        </div>

        <div className="space-y-4 p-5">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wide text-neutral-600">
                  Section {sectionIndex + 1}
                </p>
                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(sectionIndex)}
                    className="rounded-md border border-red-200 bg-white px-2.5 py-1 text-[11px] font-bold text-red-600 transition-colors hover:bg-red-50"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Section title"
                  value={section.title || ""}
                  onChange={(event) => updateSection(sectionIndex, { title: event.target.value })}
                  className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-xs font-bold text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#056826]"
                />
                <input
                  type="text"
                  placeholder="Optional subtitle"
                  value={section.subtitle || ""}
                  onChange={(event) =>
                    updateSection(sectionIndex, { subtitle: event.target.value })
                  }
                  className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-xs font-semibold text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#056826]"
                />
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500">
                    Paragraphs
                  </p>
                  <button
                    type="button"
                    onClick={() => addParagraph(sectionIndex)}
                    className="text-[11px] font-bold text-[#056826] hover:underline"
                  >
                    Add paragraph
                  </button>
                </div>
                {(section.paragraphs || []).map((paragraph, paragraphIndex) => (
                  <div key={paragraphIndex} className="flex gap-2">
                    <textarea
                      rows={2}
                      placeholder={`Paragraph ${paragraphIndex + 1}`}
                      value={paragraph}
                      onChange={(event) =>
                        updateParagraph(sectionIndex, paragraphIndex, event.target.value)
                      }
                      className="min-w-0 flex-1 resize-none rounded-md border border-neutral-300 bg-white p-3 text-xs font-medium leading-relaxed text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#056826]"
                    />
                    {(section.paragraphs || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParagraph(sectionIndex, paragraphIndex)}
                        className="h-9 rounded-md border border-neutral-300 bg-white px-2 text-xs font-bold text-neutral-500 hover:text-red-600"
                      >
                        x
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500">
                    Bullets
                  </p>
                  <button
                    type="button"
                    onClick={() => addBullet(sectionIndex)}
                    className="text-[11px] font-bold text-[#056826] hover:underline"
                  >
                    Add bullet
                  </button>
                </div>
                {(section.bullets || []).map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Bullet ${bulletIndex + 1}`}
                      value={bullet}
                      onChange={(event) =>
                        updateBullet(sectionIndex, bulletIndex, event.target.value)
                      }
                      className="h-10 min-w-0 flex-1 rounded-md border border-neutral-300 bg-white px-3 text-xs font-medium text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#056826]"
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(sectionIndex, bulletIndex)}
                      className="rounded-md border border-neutral-300 bg-white px-2 text-xs font-bold text-neutral-500 hover:text-red-600"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 items-center justify-center rounded-md border border-neutral-300 bg-white px-5 text-sm font-bold text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#056826] px-5 text-sm font-bold text-white transition-colors hover:bg-[#034c1c] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {isSubmitting
            ? isEditing
              ? "Saving..."
              : "Publishing..."
            : isEditing
            ? "Save Changes"
            : "Publish Article"}
        </button>
      </div>
    </form>
  );
}
