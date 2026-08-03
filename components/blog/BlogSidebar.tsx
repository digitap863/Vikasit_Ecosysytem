"use client";

import Image from "next/image";
import { FiSearch, FiCalendar } from "react-icons/fi";
import { SIDEBAR_CATEGORIES, POPULAR_POSTS, SidebarCategory, PopularPost } from "./blogData";

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

// ---- Popular Posts Widget ----
function PopularPostsWidget({ posts }: { posts: PopularPost[] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-neutral-200/80">
      <WidgetHeader title="POPULAR POSTS" width="w-14" />
      <div className="divide-y divide-neutral-200/80 font-sans">
        {posts.map((item) => (
          <div key={item.id} className="flex items-center gap-3.5 py-3.5 first:pt-1 last:pb-0 group">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative bg-neutral-100 border border-neutral-200">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                <FiCalendar className="w-3 h-3 text-neutral-400" />
                <span>{item.date}</span>
              </div>
              <h4 className="text-xs font-bold text-neutral-800 group-hover:text-[#056826] uppercase line-clamp-2 leading-snug cursor-pointer transition-colors">
                {item.title}
              </h4>
            </div>
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
      <PopularPostsWidget posts={POPULAR_POSTS} />
    </div>
  );
}
