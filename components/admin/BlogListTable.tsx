"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BlogPost, deleteBlogPostFromDb } from "@/lib/blogData";

interface BlogListTableProps {
  posts: BlogPost[];
  onRefresh: () => void;
  onEdit: (post: BlogPost) => void;
}

export default function BlogListTable({ posts, onRefresh, onEdit }: BlogListTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post) => {
    const query = searchTerm.toLowerCase();
    return (
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.slug.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    );
  });

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteBlogPostFromDb(id);
      onRefresh();
    }
  };

  return (
    <section className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-neutral-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h3 className="text-base font-bold text-neutral-950">Published Articles</h3>
          <p className="mt-1 text-xs font-medium text-neutral-500">
            Review, open, and remove articles created in the admin portal.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-current stroke-2 text-neutral-400"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search articles"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="h-10 w-full rounded-md border border-neutral-300 bg-white pl-9 pr-3 text-xs font-semibold text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#056826]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-xs">
          <thead className="bg-neutral-50 text-[11px] font-bold uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-5 py-3">Article</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Read Time</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-14 text-center text-sm font-medium text-neutral-500">
                  No articles found.
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id} className="transition-colors hover:bg-neutral-50">
                  <td className="max-w-[380px] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            unoptimized={post.image.startsWith("data:")}
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-neutral-400">
                            BLOG
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-neutral-950">{post.title}</p>
                        <p className="mt-1 truncate font-mono text-[11px] text-neutral-500">
                          /{post.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-md bg-[#edf6ef] px-2.5 py-1 text-[11px] font-bold uppercase text-[#056826]">
                      {post.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-semibold text-neutral-700">
                    {post.date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-neutral-500">
                    {post.readTime}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-[11px] font-bold text-neutral-700 transition-colors hover:border-[#056826]/30 hover:text-[#056826]"
                      >
                        <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => onEdit(post)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-[11px] font-bold text-neutral-700 transition-colors hover:border-[#056826]/30 hover:text-[#056826]"
                      >
                        <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id, post.title)}
                        className="inline-flex items-center rounded-md border border-red-200 bg-white px-3 py-1.5 text-[11px] font-bold text-red-600 transition-colors hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
