"use client";

import { BlogPost } from "./blogData";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="lg:col-span-8 space-y-8">
      {/* 2-Column Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))
        ) : (
          <p className="col-span-2 text-center text-neutral-500 font-sans py-16 text-sm">
            No posts found in this category.
          </p>
        )}
      </div>

      {/* Load More Button */}
      {posts.length > 0 && (
        <div className="flex justify-center pt-4 pb-2">
          <button className="px-9 py-2.5 rounded-full bg-[#E6DFD3] text-neutral-800 border border-[#2d2d2d] font-semibold text-sm hover:bg-[#d8d1c3] transition-colors cursor-pointer">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
