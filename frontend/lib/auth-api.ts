export interface AuthUser {
  id: number;
  email: string;
  name: string;
}

async function authFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, { credentials: "include", ...options });
  return res;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const res = await authFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Login failed");
  }
  return res.json();
}

export async function signup(email: string, password: string, name: string): Promise<AuthUser> {
  const res = await authFetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Signup failed");
  }
  return res.json();
}

export async function logout(): Promise<void> {
  await authFetch("/api/auth/logout", { method: "POST" });
}

export async function getMe(): Promise<AuthUser | null> {
  const res = await authFetch("/api/auth/me");
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}
