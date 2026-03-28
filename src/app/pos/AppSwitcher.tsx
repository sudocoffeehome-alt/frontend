"use client";

import React from "react";
import { useStore } from "@/store/StoreContext";
import CustomerStorefront from "@/features/pos/CustomerStorefront";
import AdminBackoffice from "@/features/pos/AdminBackoffice";
import { Settings, User } from "lucide-react";

export default function AppSwitcher() {
  const { view, setView } = useStore();

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans">
      {view === "customer" ? <CustomerStorefront /> : <AdminBackoffice />}

      {/* Floating Toggle for Demo Purposes ONLY */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2 shadow-2xl bg-slate-900 border border-slate-700/50 p-1.5 rounded-full opacity-30 hover:opacity-100 transition-opacity">
        <button
          onClick={() => setView("customer")}
          title="Customer View"
          className={`p-2 rounded-full transition-colors ${
            view === "customer" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"
          }`}
        >
          <User size={18} />
        </button>
        <button
          onClick={() => setView("admin")}
          title="Admin View"
          className={`p-2 rounded-full transition-colors ${
            view === "admin" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"
          }`}
        >
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
}
