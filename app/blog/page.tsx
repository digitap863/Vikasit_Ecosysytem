"use client";

import { useState } from "react";
import BlogHero from "@/components/blog/BlogHero";
import CategoryFilter from "@/components/blog/CategoryFilter";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/components/blog/blogData";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarSearch, setSidebarSearch] = useState("");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat =
      selectedCategory === "All" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !sidebarSearch ||
      post.title.toLowerCase().includes(sidebarSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="relative w-full overflow-x-hidden bg-[#eae4d6] min-h-screen flex flex-col justify-between font-farro">
      <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1320px] mx-auto w-full flex-1">
        {/* Hero Banner */}
        <BlogHero />

        {/* Category Filter Pills */}
        <CategoryFilter
          categories={BLOG_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Posts Grid + Sidebar */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          <BlogGrid posts={filteredPosts} />
          <BlogSidebar
            searchValue={sidebarSearch}
            onSearchChange={setSidebarSearch}
            onCategorySelect={setSelectedCategory}
          />
        </section>
      </div>
    </main>
  );
}
