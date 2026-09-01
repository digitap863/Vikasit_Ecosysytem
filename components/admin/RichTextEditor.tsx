"use client";

import type React from "react";
import { useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Table,
  Link as LinkIcon,
  Minus,
  Sparkles,
  RotateCcw,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (prefix: string, suffix: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;

    const newText =
      value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 10);
  };

  const insertSnippet = (snippet: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newText = value.substring(0, start) + snippet + value.substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + snippet.length, start + snippet.length);
    }, 10);
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-xs overflow-hidden transition-all focus-within:border-slate-800 focus-within:ring-2 focus-within:ring-slate-900/5">
      {/* Rich Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50/80 px-3 py-2 text-xs">
        {/* Headings */}
        <button
          type="button"
          onClick={() =>
            insertFormatting(
              '<h2 class="text-xl sm:text-2xl font-bold text-neutral-900 uppercase tracking-tight mt-8 mb-4 border-b border-neutral-200 pb-2 font-satoshi">',
              "</h2>",
              "Section Heading"
            )
          }
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 font-bold transition-colors flex items-center gap-1"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
          <span className="hidden sm:inline text-[11px]">H2</span>
        </button>

        <button
          type="button"
          onClick={() =>
            insertFormatting(
              '<h3 class="text-lg font-bold text-neutral-900 uppercase tracking-wide mt-6 mb-3 font-satoshi">',
              "3>",
              "Subsection Heading"
            )
          }
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 font-semibold transition-colors flex items-center gap-1"
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
          <span className="hidden sm:inline text-[11px]">H3</span>
        </button>

        <div className="h-4 w-px bg-gray-300 mx-1" />

        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => insertFormatting("<strong>", "</strong>", "bold text")}
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 font-bold transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => insertFormatting("<em>", "</em>", "italic text")}
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 font-medium transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => insertFormatting("<u>", "</u>", "underlined text")}
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 font-medium transition-colors"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => insertFormatting('<code class="bg-gray-100 px-1.5 py-0.5 rounded text-red-600 font-mono text-xs">', "</code>", "code")}
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors"
          title="Inline Code"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-gray-300 mx-1" />

        {/* Paragraph & Lists */}
        <button
          type="button"
          onClick={() =>
            insertFormatting('<p class="text-base leading-relaxed text-neutral-700 mb-4">', "</p>", "Paragraph text goes here...")
          }
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 font-medium transition-colors text-[11px]"
          title="Paragraph <p>"
        >
          &lt;p&gt;
        </button>

        <button
          type="button"
          onClick={() =>
            insertSnippet(
              `<ul class="space-y-2 mb-6 pl-2">\n  <li class="flex items-start gap-3 text-neutral-700">\n    <span class="w-2 h-2 rounded-full bg-[#056826] mt-2 shrink-0"></span>\n    <span>Bullet point detail</span>\n  </li>\n</ul>`
            )
          }
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            insertSnippet(
              `<ol class="space-y-3 mb-6 list-decimal pl-5 text-neutral-700">\n  <li class="pl-1"><strong>Step 1:</strong> Description</li>\n</ol>`
            )
          }
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-gray-300 mx-1" />

        {/* Layout Blocks */}
        <button
          type="button"
          onClick={() =>
            insertSnippet(
              `<blockquote class="p-4 my-6 border-l-4 border-[#056826] bg-emerald-50/50 rounded-r-xl italic text-neutral-700">\n  "Insert featured quote or key take-away text here."\n</blockquote>`
            )
          }
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors"
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            insertSnippet(
              `<div class="p-6 bg-emerald-50 rounded-xl border border-emerald-200 my-8">\n  <h3 class="text-lg font-bold text-emerald-950 mb-2">Key Highlight</h3>\n  <p class="text-emerald-900 leading-relaxed">Important details or conclusions go here.</p>\n</div>`
            )
          }
          className="p-1.5 rounded-lg hover:bg-emerald-100 text-[#056826] transition-colors flex items-center gap-1 font-semibold"
          title="Callout Box"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden md:inline text-[11px]">Callout</span>
        </button>

        <button
          type="button"
          onClick={() =>
            insertSnippet(
              `<div class="overflow-x-auto my-8 border border-neutral-200 rounded-lg shadow-sm">\n  <table class="w-full text-left border-collapse">\n    <thead>\n      <tr class="bg-neutral-900 text-white text-sm font-semibold uppercase">\n        <th class="py-3 px-4">Feature</th>\n        <th class="py-3 px-4">Specification</th>\n      </tr>\n    </thead>\n    <tbody class="divide-y divide-neutral-200 text-sm text-neutral-700 bg-white">\n      <tr>\n        <td class="py-3 px-4 font-medium text-neutral-900">Item 1</td>\n        <td class="py-3 px-4">Detail 1</td>\n      </tr>\n    </tbody>\n  </table>\n</div>`
            )
          }
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors"
          title="Table"
        >
          <Table className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter link URL:", "https://");
            if (url) {
              insertFormatting(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#056826] font-semibold underline hover:text-[#034c1c]">`, "</a>", "link text");
            }
          }}
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors"
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => insertSnippet('<hr class="my-8 border-t border-neutral-200" />')}
          className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors"
          title="Horizontal Divider"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="ml-auto flex items-center gap-2 text-[11px] text-gray-400 font-mono">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      {/* Editor Content Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Write or paste your full HTML article content..."}
        rows={16}
        className="w-full p-4 text-sm font-mono leading-relaxed text-gray-900 outline-none resize-y min-h-[350px] bg-white placeholder:text-gray-400"
      />
    </div>
  );
}
