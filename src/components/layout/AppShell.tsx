"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Users,
  Settings,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   Navigation definition
   ────────────────────────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: "แดชบอร์ด", href: "/", icon: LayoutDashboard },
  { label: "คำสั่งซื้อ", href: "/orders", icon: ClipboardList },
  { label: "คลังสินค้า", href: "/inventory", icon: Package },
  { label: "ลูกค้า", href: "/customers", icon: Users },
  { label: "ตั้งค่า", href: "/settings", icon: Settings },
];

/* ──────────────────────────────────────────────────────────────────────────
   AppShell — minimal sidebar layout
   ────────────────────────────────────────────────────────────────────────── */

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">
      {/* ─── Sidebar ─────────────────────────────────────────────────── */}
      <aside className="flex w-[220px] shrink-0 flex-col border-r border-[#E5E7EB] bg-white">
        {/* Brand */}
        <div className="flex h-14 items-center gap-2 border-b border-[#E5E7EB] px-5">
          <span className="text-[15px] font-semibold tracking-tight text-[#111827]">
            Sudo Coffee
          </span>
          <span className="rounded bg-[#F3F4F6] px-1.5 py-0.5 text-[10px] font-medium text-[#6B7280]">
            OS
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-[#F3F4F6] text-[#111827]"
                    : "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]"
                )}
              >
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-[#111827]"
                      : "text-[#9CA3AF] group-hover:text-[#6B7280]"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#E5E7EB] px-5 py-3">
          <p className="text-[11px] text-[#9CA3AF]">v0.1.0 · Sudo Coffee OS</p>
        </div>
      </aside>

      {/* ─── Main content ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
