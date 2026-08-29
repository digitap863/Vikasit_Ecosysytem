"use client";

import { useState, useEffect } from "react";
import BlogHero from "@/components/blog/BlogHero";
import CategoryFilter from "@/components/blog/CategoryFilter";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { fetchAllBlogPosts, BLOG_CATEGORIES, BlogPost } from "@/lib/blogData";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = async () => {
    setIsLoading(true);
    const data = await fetchAllBlogPosts();
    setPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPosts();

    const handleUpdate = () => {
      loadPosts();
    };
    window.addEventListener("vikasit_blogs_updated", handleUpdate);
    return () => window.removeEventListener("vikasit_blogs_updated", handleUpdate);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCat =
      selectedCategory === "All" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !sidebarSearch ||
      post.title.toLowerCase().includes(sidebarSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="relative w-full overflow-x-hidden bg-[#EBE4D5] min-h-screen flex flex-col justify-between font-farro">
      <div className="w-full flex-1">
        {/* Latest blog banner */}
        <BlogHero latestPost={posts[0]} />

        <div className="pb-20 px-4 sm:px-6 lg:px-12 max-w-[1320px] mx-auto w-full">
          {/* Category Filter Pills */}
          <CategoryFilter
            categories={BLOG_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {/* Posts Grid + Sidebar */}
          <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
            <div className="lg:col-span-8 order-2 lg:order-1 w-full">
              <BlogGrid posts={filteredPosts} />
            </div>
            <div className="lg:col-span-4 order-1 lg:order-2 w-full">
              <BlogSidebar
                searchValue={sidebarSearch}
                onSearchChange={setSidebarSearch}
                onCategorySelect={setSelectedCategory}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
