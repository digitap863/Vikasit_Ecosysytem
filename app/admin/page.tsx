"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminSidebar, { AdminTab } from "@/components/admin/AdminSidebar";
import AdminStats from "@/components/admin/AdminStats";
import AddBlogForm from "@/components/admin/AddBlogForm";
import BlogListTable from "@/components/admin/BlogListTable";
import VideoManager from "@/components/admin/VideoManager";
import PhotoManager from "@/components/admin/PhotoManager";
import ContactMessagesManager from "@/components/admin/ContactMessagesManager";
import { BlogPost, fetchAllBlogPosts } from "@/lib/blogData";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("admin@vikasit.com");
  const [activeTab, setActiveTab] = useState<AdminTab>("inquiries");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [totalInquiries, setTotalInquiries] = useState(0);

  const refreshPosts = async () => {
    const data = await fetchAllBlogPosts();
    setPosts(data);
  };

  const fetchInquiryCounts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/contact");
      const data = await res.json();
      if (res.ok && data.success && data.counts) {
        setTotalInquiries(data.counts.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch inquiry counts:", err);
    }
  }, []);

  useEffect(() => {
    const token =
      localStorage.getItem("vikasit_admin_token") ||
      sessionStorage.getItem("vikasit_admin_token");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    setIsAuthenticated(true);
    const email = localStorage.getItem("vikasit_admin_email");
    if (email) setAdminEmail(email);
    refreshPosts();
    fetchInquiryCounts();
  }, [router, fetchInquiryCounts]);

  const handleLogout = () => {
    localStorage.removeItem("vikasit_admin_token");
    localStorage.removeItem("vikasit_admin_email");
    sessionStorage.removeItem("vikasit_admin_token");
    router.push("/admin/login");
  };

  const handlePostSaved = (post: BlogPost) => {
    refreshPosts();
    setEditingPost(null);
    setActiveTab("list");
    setNotification(
      `Article "${post.title}" ${editingPost ? "updated" : "published"} successfully.`
    );
    window.setTimeout(() => setNotification(null), 6000);
  };

  const handleEditClick = (post: BlogPost) => {
    setEditingPost(post);
    setActiveTab("add");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#f6f7f4] text-sm font-semibold text-neutral-600 font-farro">
        Verifying admin access...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f4] text-neutral-950 font-farro lg:flex">
      {/* Isolated Admin Sidebar Component */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          fetchInquiryCounts();
        }}
        adminEmail={adminEmail}
        onLogout={handleLogout}
        onNewArticleClick={() => setEditingPost(null)}
      />

      <main className="min-h-screen flex-1 lg:pl-72">
        {/* Admin Dashboard Header */}
        <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
          <div className="flex min-h-16 flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#056826]">
                Admin Portal
              </p>
              <h2 className="text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl">
                {activeTab === "inquiries"
                  ? "Contact Messages & Leads"
                  : activeTab === "list"
                  ? "Articles"
                  : activeTab === "videos"
                  ? "Project YouTube Videos"
                  : activeTab === "photos"
                  ? "Project Photo Gallery"
                  : editingPost
                  ? `Editing: ${editingPost.title}`
                  : "Publish New Article"}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/contact"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-bold text-neutral-700 transition-colors hover:border-[#056826]/30 hover:text-[#056826]"
              >
                <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Contact Form
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-bold text-neutral-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 lg:hidden"
              >
                <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1280px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          {notification && (
            <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800">
              <span>{notification}</span>
              <button
                type="button"
                onClick={() => setNotification(null)}
                className="rounded-md px-2 py-1 text-emerald-700 hover:bg-emerald-100"
                aria-label="Dismiss notification"
              >
                x
              </button>
            </div>
          )}

          {/* Isolated Admin Stats Cards Component */}
          {activeTab !== "videos" && activeTab !== "photos" && (
            <AdminStats posts={posts} totalInquiries={totalInquiries} />
          )}

          {/* Isolated Admin Tab Components */}
          {activeTab === "inquiries" && <ContactMessagesManager />}
          {activeTab === "list" && (
            <BlogListTable posts={posts} onRefresh={refreshPosts} onEdit={handleEditClick} />
          )}
          {activeTab === "add" && (
            <AddBlogForm
              key={editingPost ? editingPost.slug : "new-post"}
              initialData={editingPost}
              onSuccess={handlePostSaved}
              onCancel={() => {
                setEditingPost(null);
                setActiveTab("list");
              }}
            />
          )}
          {activeTab === "videos" && <VideoManager />}
          {activeTab === "photos" && <PhotoManager />}
        </div>
      </main>
    </div>
  );
}
