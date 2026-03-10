"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "signup") {
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
      router.push("/chat");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  function handleGuest() {
    router.push("/chat");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#032147]">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-center text-2xl font-bold text-[#032147]">
          Prelegal
        </h1>
        <p className="mb-6 text-center text-xs text-[#888888]">
          Draft legal agreements from templates
        </p>

        {error && (
          <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#888888]">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#209dd7] focus:outline-none focus:ring-1 focus:ring-[#209dd7]"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#888888]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#209dd7] focus:outline-none focus:ring-1 focus:ring-[#209dd7]"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-[#888888]">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#209dd7] focus:outline-none focus:ring-1 focus:ring-[#209dd7]"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded bg-[#753991] px-4 py-2 text-sm font-semibold text-white hover:bg-[#612d79] transition-colors cursor-pointer disabled:opacity-50"
          >
            {submitting ? "..." : mode === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            className="text-xs text-[#209dd7] hover:underline cursor-pointer"
          >
            {mode === "login" ? "Create an account" : "Already have an account?"}
          </button>
          <button
            onClick={handleGuest}
            className="text-xs text-[#888888] hover:underline cursor-pointer"
          >
            Continue as guest
          </button>
        </div>
      </div>
    </div>
  );
}
