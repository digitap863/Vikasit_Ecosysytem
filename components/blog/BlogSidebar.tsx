"use client";

import { FiSearch } from "react-icons/fi";
import { SIDEBAR_CATEGORIES, SidebarCategory } from "@/lib/blogData";

interface BlogSidebarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCategorySelect: (category: string) => void;
}

// ---- Widget Header ----
function WidgetHeader({ title, width = "w-12" }: { title: string; width?: string }) {
  return (
    <>
      <h3 className="text-base font-bold text-neutral-900 uppercase font-sans tracking-wide">
        {title}
      </h3>
      <div className={`h-[3px] bg-[#056826] ${width} mt-1 mb-4`} />
    </>
  );
}

// ---- Search Widget ----
function SearchWidget({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-neutral-200/80">
      <WidgetHeader title="SEARCH" />
      <div className="relative">
        <input
          type="text"
          placeholder=""
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2 pr-9 text-xs text-neutral-800 focus:outline-none focus:border-[#056826] font-sans"
        />
        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 w-3.5 h-3.5" />
      </div>
    </div>
  );
}

// ---- Categories Widget ----
function CategoriesWidget({
  categories,
  onSelect,
}: {
  categories: SidebarCategory[];
  onSelect: (name: string) => void;
}) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-neutral-200/80">
      <WidgetHeader title="CATEGORIES" />
      <div className="divide-y divide-neutral-200/80 font-sans">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            className="flex items-center justify-between py-3 text-xs sm:text-sm font-medium text-neutral-700 hover:text-[#056826] cursor-pointer transition-colors"
          >
            <span>{cat.name}</span>
            <span className="text-neutral-500 font-normal">({cat.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Composed Sidebar ----
export default function BlogSidebar({
  searchValue,
  onSearchChange,
  onCategorySelect,
}: BlogSidebarProps) {
  return (
    <div className="lg:col-span-4 space-y-6">
      <SearchWidget value={searchValue} onChange={onSearchChange} />
      <CategoriesWidget categories={SIDEBAR_CATEGORIES} onSelect={onCategorySelect} />
    </div>
  );
}
