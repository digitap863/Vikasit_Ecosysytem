"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/blogData";

interface BlogHeroProps {
  latestPost?: BlogPost;
}

export default function BlogHero({ latestPost }: BlogHeroProps) {
  const postHref = latestPost ? `/blog/${latestPost.slug || latestPost.id}` : "";
  const title = latestPost?.title || "No Blogs Published Yet";
  const isLongTitle = title.length > 35;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative w-full bg-[#EBE4D5] text-[#1A1A1A] overflow-hidden pt-[85px] sm:pt-[110px] lg:pt-[125px] pb-8 sm:pb-14">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6 sm:space-y-8"
        >
          {/* Top Breadcrumb Line */}
          <motion.div
            variants={itemVariants}
            className="text-xs font-bold tracking-widest text-[#2E7D32] uppercase font-sans flex items-center gap-1.5"
          >
            <Link href="/" className="hover:underline">
              HOME
            </Link>
            <span className="text-neutral-400 font-normal">|</span>
            <span className="text-[#2E7D32]">BLOGS</span>
          </motion.div>

          {/* 2-Column Grid with No Overlapping elements */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5">
              <motion.span
                variants={itemVariants}
                className="text-xs sm:text-sm font-semibold tracking-wider text-[#5A5A5C] uppercase block font-sans"
              >
                {latestPost ? "LATEST BLOG" : "BLOGS"}
              </motion.span>

              <motion.h1
                variants={itemVariants}
                className={`font-extrabold text-[#343433] tracking-tight font-farro uppercase ${
                  isLongTitle
                    ? "text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] leading-[1.18]"
                    : "text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] leading-[1.1]"
                }`}
              >
                {title}
              </motion.h1>

              {latestPost ? (
                <>
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold uppercase tracking-wide text-neutral-600 font-sans pt-1"
                  >
                    <span>{latestPost.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>{latestPost.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>{latestPost.readTime}</span>
                  </motion.div>

                  {latestPost.content?.intro && (
                    <motion.p
                      variants={itemVariants}
                      className="text-neutral-700 text-sm sm:text-base lg:text-[16px] font-medium leading-relaxed font-satoshi max-w-xl line-clamp-3"
                    >
                      {latestPost.content.intro}
                    </motion.p>
                  )}

                  <motion.div variants={itemVariants} className="pt-2">
                    <Link
                      href={postHref}
                      className="inline-flex items-center justify-center rounded-full bg-[#056826] px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#034c1c] shadow-sm font-sans"
                    >
                      Read Blog
                    </Link>
                  </motion.div>
                </>
              ) : (
                <motion.p
                  variants={itemVariants}
                  className="text-neutral-700 text-sm sm:text-base font-medium leading-relaxed font-satoshi max-w-xl"
                >
                  Publish a blog from the admin panel to feature it here.
                </motion.p>
              )}
            </div>

            {/* Right Clean Featured Image Card (No Overlapping Gradient Overlay) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-6 xl:col-span-6 relative w-full h-[280px] sm:h-[360px] lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#d8d1c3] border border-neutral-300/60 shadow-md"
            >
              {latestPost ? (
                <Image
                  src={latestPost.image}
                  alt={latestPost.title}
                  fill
                  priority
                  unoptimized={latestPost.image.startsWith("data:")}
                  className="object-cover object-center"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-neutral-500 font-sans">
                    Latest blog banner
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
