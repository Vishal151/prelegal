"use client";

import { usePathname } from "next/navigation";
import NavHeader from "@/components/NavHeader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Login page has its own full-screen layout
  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen">
      <NavHeader />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
