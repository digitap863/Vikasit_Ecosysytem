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
    <section className="relative w-full bg-[#EBE4D5] text-[#1A1A1A] overflow-hidden pt-[85px] sm:pt-[120px] pb-6 sm:pb-14">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6 sm:space-y-10"
        >
          {/* Top Breadcrumb Line matching Services page */}
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

          {/* 2-Column Grid matching Services banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <motion.span
                variants={itemVariants}
                className="text-xs sm:text-sm font-semibold tracking-wider text-[#5A5A5C] uppercase block font-sans"
              >
                {latestPost ? "LATEST BLOG" : "BLOGS"}
              </motion.span>

              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold text-[#343433] tracking-tight leading-[1.08] font-farro uppercase"
              >
                {latestPost?.title || "No Blogs Published Yet"}
              </motion.h1>

              {latestPost ? (
                <>
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-wide text-neutral-600 font-sans"
                  >
                    <span>{latestPost.category}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-500" />
                    <span>{latestPost.date}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-500" />
                    <span>{latestPost.readTime}</span>
                  </motion.div>

                  {latestPost.content?.intro && (
                    <motion.p
                      variants={itemVariants}
                      className="text-neutral-700 text-sm sm:text-lg lg:text-[18px] font-medium leading-relaxed font-satoshi max-w-xl pt-1 sm:pt-2 line-clamp-3"
                    >
                      {latestPost.content.intro}
                    </motion.p>
                  )}

                  <motion.div variants={itemVariants} className="pt-2">
                    <Link
                      href={postHref}
                      className="inline-flex items-center justify-center rounded-full bg-[#056826] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#034c1c] font-sans"
                    >
                      Read Blog
                    </Link>
                  </motion.div>
                </>
              ) : (
                <motion.p
                  variants={itemVariants}
                  className="text-neutral-700 text-sm sm:text-lg lg:text-[18px] font-medium leading-relaxed font-satoshi max-w-xl pt-1 sm:pt-2"
                >
                  Publish a blog from the admin panel to feature it here.
                </motion.p>
              )}
            </div>

            <motion.div
              variants={itemVariants}
              className="lg:col-span-6 relative w-full h-[280px] sm:h-[380px] lg:h-[460px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#d8d1c3]"
            >
              {latestPost ? (
                <Image
                  src={latestPost.image}
                  alt={latestPost.title}
                  fill
                  priority
                  unoptimized={latestPost.image.startsWith("data:")}
                  className="object-cover object-center filter brightness-[1.02]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-neutral-500 font-sans">
                    Latest blog banner
                  </span>
                </div>
              )}

              <div className="absolute inset-y-0 left-0 w-[55%] sm:w-[50%] bg-gradient-to-r from-[#EBE4D5] via-[#EBE4D5]/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#EBE4D5] via-[#EBE4D5]/50 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#EBE4D5]/30 to-transparent z-10 pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
