"use client";

import { useAuth } from "@/context/AuthContext";

export default function NavHeader() {
  const { user, loading, logout } = useAuth();

  if (!user && !loading) return null;

  return (
    <header className="h-12 bg-[#032147] flex items-center justify-between px-6 shrink-0 print:hidden">
      <span className="text-sm font-bold text-[#ecad0a] tracking-wide">
        Prelegal
      </span>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#888888]">{user.email}</span>
          <button
            onClick={logout}
            className="text-xs text-white bg-[#753991] hover:bg-[#612d79] px-3 py-1 rounded transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
