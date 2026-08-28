"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to /admin
  useEffect(() => {
    const token = localStorage.getItem("vikasit_admin_token") || sessionStorage.getItem("vikasit_admin_token");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    // Validate admin credentials
    setTimeout(() => {
      // Default credentials check (accepts admin@vikasit.com / admin123 or admin)
      if (
        (email.toLowerCase() === "admin@vikasit.com" || email.toLowerCase() === "admin") &&
        (password === "admin123" || password === "admin")
      ) {
        const token = "vikasit_auth_token_" + Date.now();
        localStorage.setItem("vikasit_admin_token", token);
        localStorage.setItem("vikasit_admin_email", email.includes("@") ? email : "admin@vikasit.com");
        sessionStorage.setItem("vikasit_admin_token", token);
        router.push("/admin");
      } else {
        setIsLoading(false);
        setError("Invalid credentials. Try using admin@vikasit.com / admin123");
      }
    }, 600);
  };

  return (
    <main className="w-full min-h-screen bg-[#0e1610] text-white flex items-center justify-center p-4 sm:p-6 font-farro relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#121c15] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-2xl flex items-center justify-center mx-auto shadow-inner">
            V
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
              Vikasit Ecosystem
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2">
              Admin Sign In
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Enter your authorized credentials to access the blog publishing portal.
            </p>
          </div>
        </div>

        {/* Demo Credentials Box */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 text-xs text-stone-300 space-y-1">
          <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
            <span>💡 Access Credentials</span>
            <span className="text-[10px] text-stone-400">Pre-configured</span>
          </div>
          <p className="text-stone-300">Email: <code className="text-emerald-300 font-mono">admin@vikasit.com</code></p>
          <p className="text-stone-300">Password: <code className="text-emerald-300 font-mono">admin123</code></p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs font-semibold text-center animate-shake">
            ⚠️ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
              Admin Email
            </label>
            <input
              type="text"
              required
              placeholder="admin@vikasit.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-stone-400 hover:text-white text-xs cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-farro text-sm shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer disabled:opacity-50 mt-2"
          >
            {isLoading ? "Authenticating..." : "Sign In to Admin Portal →"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/10">
          <Link
            href="/blog"
            className="text-xs text-stone-400 hover:text-emerald-300 font-medium transition-colors"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </main>
  );
}
