"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost, deleteBlogPost } from "@/components/blog/blogData";
import { useState } from "react";

interface BlogListTableProps {
  posts: BlogPost[];
  onRefresh: () => void;
}

export default function BlogListTable({ posts, onRefresh }: BlogListTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === "All" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const handleDelete = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlogPost(id);
      onRefresh();
    }
  };

  return (
    <div className="w-full bg-[#121c15] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      {/* Top Filter Bar */}
      <div className="p-4 sm:p-6 border-b border-white/10 bg-[#162219] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-farro text-white flex items-center gap-2">
            Published Articles
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-farro">
              {filteredPosts.length} Total
            </span>
          </h2>
          <p className="text-xs text-stone-400 font-farro mt-0.5">
            Manage live blog posts published across the Vikasit Ecosystem platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search by title or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-stone-400 font-farro focus:outline-none focus:border-emerald-500 transition-all"
            />
            <svg
              className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs font-farro border-collapse">
          <thead>
            <tr className="bg-black/30 border-b border-white/10 text-stone-400 uppercase tracking-wider text-[10px] font-bold">
              <th className="py-3.5 px-4 sm:px-6">Article</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Published Date</th>
              <th className="py-3.5 px-4">Read Time</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-stone-300">
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-stone-400 font-light">
                  No articles matching your search criteria.
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-white/[0.03] transition-colors group"
                >
                  {/* Article Title & Thumbnail */}
                  <td className="py-3.5 px-4 sm:px-6 max-w-[320px]">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-white/10">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-500 font-bold text-[10px]">
                            BLOG
                          </div>
                        )}
                      </div>
                      <div className="truncate">
                        <h4 className="text-white font-bold text-xs leading-snug truncate group-hover:text-emerald-400 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-[10px] text-stone-400 font-mono truncate opacity-75">
                          /{post.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/20">
                      {post.category}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-stone-300 font-medium">
                    {post.date}
                  </td>

                  {/* Read Time */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-stone-400">
                    {post.readTime}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-all inline-flex items-center gap-1"
                      >
                        View
                        <svg className="w-3 h-3 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>

                      {/* Custom User-Added Posts allow deletion */}
                      {post.id > 1000 && (
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="px-2.5 py-1 rounded-md bg-red-950/50 hover:bg-red-600 text-red-300 hover:text-white text-[11px] font-semibold transition-all cursor-pointer inline-flex items-center gap-1 border border-red-500/30"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
