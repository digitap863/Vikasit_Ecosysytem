"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiClock, FiCalendar } from "react-icons/fi";
import { BlogPost } from "./blogData";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-2xl p-5 border border-neutral-200/80 flex flex-col justify-between group hover:shadow-md transition-shadow"
    >
      <div>
        {/* Post Image Thumbnail */}
        <Link href={`/blog/${post.slug || post.id}`} className="block relative w-full h-[200px] rounded-xl overflow-hidden mb-4 bg-neutral-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Meta Line */}
        <div className="flex items-center gap-4 text-[11px] text-neutral-500 font-sans mb-2">
          <span className="flex items-center gap-1">
            <FiClock className="w-3 h-3 text-neutral-400" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <FiCalendar className="w-3 h-3 text-neutral-400" />
            {post.date}
          </span>
        </div>

        {/* Post Title */}
        <Link href={`/blog/${post.slug || post.id}`}>
          <h3 className="font-bold text-sm sm:text-base text-neutral-900 uppercase leading-snug font-sans mb-3 line-clamp-3 group-hover:text-[#056826] transition-colors">
            {post.title}
          </h3>
        </Link>
      </div>

      {/* Read More Link */}
      <div className="pt-2">
        <Link
          href={`/blog/${post.slug || post.id}`}
          className="text-[#056826] font-extrabold text-sm underline hover:text-[#04521e] inline-block"
        >
          Read More
        </Link>
      </div>
    </motion.article>
  );
}
