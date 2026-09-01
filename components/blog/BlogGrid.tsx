"use client";

import { BlogPost } from "@/lib/blogData";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="lg:col-span-8 space-y-8">
      {/* 2-Column Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

     
    </div>
  );
}
