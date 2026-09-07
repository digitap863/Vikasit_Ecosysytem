"use client";

import type React from "react";

export type AdminTab = "list" | "add" | "videos" | "photos";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  adminEmail: string;
  onLogout: () => void;
  onNewArticleClick: () => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  adminEmail,
  onLogout,
  onNewArticleClick,
}: AdminSidebarProps) {
  const navItems: Array<{
    id: AdminTab;
    label: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "list",
      label: "Articles",
      description: "Manage published posts",
      icon: (
        <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      ),
    },
    {
      id: "add",
      label: "New Article",
      description: "Create blog content",
      icon: (
        <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
        </svg>
      ),
    },
    {
      id: "videos",
      label: "YouTube Videos",
      description: "Manage project videos",
      icon: (
        <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "photos",
      label: "Project Photos",
      description: "Upload & manage Cloudinary photos",
      icon: (
        <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="border-b border-neutral-200 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-neutral-200 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#056826] text-sm font-bold text-white">
            V
          </div>
          <div>
            <h1 className="text-sm font-bold text-neutral-950">Vikasit Admin</h1>
            <p className="text-[11px] font-medium text-neutral-500">Content manager</p>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto p-3 lg:flex-col lg:overflow-visible">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === "add") {
                    onNewArticleClick();
                  }
                  setActiveTab(item.id);
                }}
                className={`flex min-w-[170px] items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors lg:min-w-0 ${
                  isActive
                    ? "bg-[#edf6ef] text-[#056826]"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${
                    isActive
                      ? "border-[#056826]/20 bg-white"
                      : "border-neutral-200 bg-neutral-50"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold">{item.label}</span>
                  <span className="block truncate text-[11px] font-medium text-neutral-500">
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto hidden border-t border-neutral-200 p-4 lg:block">
          <div className="rounded-lg bg-neutral-50 p-3">
            <p className="text-[11px] font-semibold uppercase text-neutral-500">Signed in</p>
            <p className="mt-1 truncate text-xs font-bold text-neutral-800">{adminEmail}</p>
            <button
              type="button"
              onClick={onLogout}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-xs font-bold text-neutral-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 cursor-pointer"
            >
              <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
