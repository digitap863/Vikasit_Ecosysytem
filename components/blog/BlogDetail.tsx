"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiClock as ClockIcon, FiCalendar as CalendarIcon } from "react-icons/fi";
import { BlogPost, getRelatedPosts } from "./blogData";
import BlogCard from "./BlogCard";

interface BlogDetailProps {
  post: BlogPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const relatedPosts = getRelatedPosts(post.slug, 3);

  return (
    <article className="w-full max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-2 sm:py-6">
      {/* 1. Top Featured Image Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14"
      >
        <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6] bg-neutral-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </motion.div>

      {/* 2. Post Header: Title & Meta Info */}
      <motion.header
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-6xl mx-auto text-center mb-10 sm:mb-12"
      >
        <h1 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[42px] font-bold text-[#1a1a1a] uppercase leading-[1.2] tracking-tight font-satoshi mb-4">
          {post.title}
        </h1>

        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-neutral-600 font-sans font-medium">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5 text-neutral-500" />
            {post.readTime}
          </span>
          <span className="text-neutral-400">•</span>
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-neutral-500" />
            {post.date}
          </span>
        </div>
      </motion.header>

      {/* 3. Post Content Body */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto space-y-6 sm:space-y-8 text-neutral-800 font-sans leading-relaxed text-sm sm:text-base"
      >
        {post.content ? (
          <>
            {/* Intro Paragraph */}
            {post.content.intro && (
              <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                {post.content.intro}
              </p>
            )}

            {/* Structured Sections */}
            {post.content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3 pt-2">
                {sec.title && (
                  <h2 className="font-bold text-base sm:text-lg lg:text-xl text-neutral-900 uppercase tracking-wide font-satoshi mt-6 mb-2">
                    {sec.title}
                  </h2>
                )}

                {sec.subtitle && (
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 uppercase tracking-wider font-sans mt-4 mb-2">
                    {sec.subtitle}
                  </h3>
                )}

                {sec.paragraphs &&
                  sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-neutral-700 leading-relaxed">
                      {p}
                    </p>
                  ))}

                {sec.bullets && (
                  <ul className="space-y-2.5 my-4 pl-1">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-neutral-700 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-[#056826] mt-2 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        ) : (
          <p className="text-neutral-700 leading-relaxed">
            Content coming soon for this article.
          </p>
        )}
      </motion.div>

      {/* 4. Related Posts Section */}
      <section className="mt-16 sm:mt-24 pt-12 border-t border-neutral-300/70">
        <h2 className="text-center font-bold text-xl sm:text-2xl lg:text-3xl text-neutral-900 uppercase tracking-wider font-satoshi mb-8 sm:mb-12">
          RELATED POST
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {relatedPosts.map((relPost, index) => (
            <BlogCard key={relPost.id} post={relPost} index={index} />
          ))}
        </div>
      </section>
    </article>
  );
}
