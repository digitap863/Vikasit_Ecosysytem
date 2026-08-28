"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import BlogListTable from "@/components/admin/BlogListTable";
import AddBlogForm from "@/components/admin/AddBlogForm";
import { getAllBlogPosts, BlogPost } from "@/components/blog/blogData";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("admin@vikasit.com");
  const [activeTab, setActiveTab] = useState<"list" | "add">("list");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  // Check auth session
  useEffect(() => {
    const token =
      localStorage.getItem("vikasit_admin_token") ||
      sessionStorage.getItem("vikasit_admin_token");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      const email = localStorage.getItem("vikasit_admin_email");
      if (email) setAdminEmail(email);
      refreshPosts();
    }
  }, [router]);

  const refreshPosts = () => {
    setPosts(getAllBlogPosts());
  };

  const handleLogout = () => {
    localStorage.removeItem("vikasit_admin_token");
    localStorage.removeItem("vikasit_admin_email");
    sessionStorage.removeItem("vikasit_admin_token");
    router.push("/admin/login");
  };

  const handlePostCreated = (createdPost: BlogPost) => {
    refreshPosts();
    setActiveTab("list");
    setNotification(`Article "${createdPost.title}" published successfully!`);
    setTimeout(() => setNotification(null), 6000);
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#0e1610] text-white flex items-center justify-center font-farro text-sm">
        Verifying Admin Access...
      </div>
    );
  }

  const customPostsCount = posts.filter((p) => p.id > 1000).length;

  return (
    <div className="w-full min-h-screen bg-[#0e1610] text-white flex flex-col font-farro">
      {/* Top Header */}
      <AdminHeader userEmail={adminEmail} onLogout={handleLogout} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Success Alert Notification */}
        {notification && (
          <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xl animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="text-base">🎉</span>
              <span>{notification}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-stone-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#121c15] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                Total Published Articles
              </span>
              <span className="text-2xl font-bold text-white font-farro mt-1 block">
                {posts.length}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg font-bold border border-emerald-500/30">
              📰
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121c15] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                Custom Published Posts
              </span>
              <span className="text-2xl font-bold text-emerald-400 font-farro mt-1 block">
                {customPostsCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg font-bold border border-emerald-500/30">
              ✨
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121c15] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                Portal Status
              </span>
              <span className="text-xs font-bold text-emerald-300 font-farro mt-2 block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active & Synchronized
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg font-bold border border-emerald-500/30">
              ⚡
            </div>
          </div>
        </div>

        {/* Tab Switcher & Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="inline-flex p-1 rounded-xl bg-black/40 border border-white/10">
            <button
              onClick={() => setActiveTab("list")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-farro font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === "list"
                  ? "bg-emerald-500 text-black shadow-md"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              All Published Articles ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-farro font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === "add"
                  ? "bg-emerald-500 text-black shadow-md"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Publish New Article
            </button>
          </div>

          <Link
            href="/blog"
            target="_blank"
            className="text-xs font-semibold text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            Visit Public Blog Page →
          </Link>
        </div>

        {/* Dynamic Tab Body */}
        {activeTab === "list" && (
          <BlogListTable posts={posts} onRefresh={refreshPosts} />
        )}

        {activeTab === "add" && (
          <AddBlogForm onSuccess={handlePostCreated} />
        )}
      </main>
    </div>
  );
}
