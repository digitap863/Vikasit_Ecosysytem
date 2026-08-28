"use client";

import Link from "next/link";

interface AdminHeaderProps {
  userEmail?: string;
  onLogout: () => void;
}

export default function AdminHeader({ userEmail = "admin@vikasit.com", onLogout }: AdminHeaderProps) {
  return (
    <header className="w-full bg-[#162219] text-white border-b border-white/10 sticky top-0 z-40 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-farro text-lg">
            V
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold font-farro tracking-tight text-white flex items-center gap-2">
              Vikasit Ecosystem
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Admin Portal
              </span>
            </h1>
          </div>
        </div>

        {/* Right Actions & User Profile */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/blog"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-farro text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Live Blog
          </Link>

          <div className="h-5 w-[1px] bg-white/15 hidden sm:block" />

          {/* User Info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30 uppercase">
              {userEmail.charAt(0)}
            </div>
            <span className="hidden md:inline text-xs font-farro text-stone-300 font-medium truncate max-w-[150px]">
              {userEmail}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold font-farro text-red-400 hover:text-white bg-red-950/40 hover:bg-red-600/80 border border-red-500/30 transition-all cursor-pointer flex items-center gap-1.5"
            title="Logout Admin Session"
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
