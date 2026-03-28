"use client";

import React, { useState } from "react";
import { useStore } from "@/store/StoreContext";
import { Terminal, LayoutDashboard, Clock, Calculator, Package, LogOut, RefreshCw } from "lucide-react";
import OrderQueue from "./OrderQueue";

export default function AdminBackoffice() {
  const { setView, revenue, profit, inventory, orders } = useStore();
  const [activeTab, setActiveTab] = useState<"queue" | "inventory" | "finance">("queue");

  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const makingCount = orders.filter((o) => o.status === "Making").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col hide-scrollbar">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="text-cyan-400" size={24} />
            <h1 className="text-lg font-bold tracking-tight">Sudo Admin</h1>
          </div>
          <p className="font-mono text-cyan-500/50 text-xs">v1.0.0_beta</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("queue")}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              activeTab === "queue" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock size={18} />
              <span className="font-medium">Order Queue</span>
            </div>
            {(pendingCount + makingCount) > 0 && (
              <span className="bg-cyan-500 text-slate-950 font-mono text-xs px-2 py-0.5 rounded-full">{pendingCount + makingCount}</span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("inventory")}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              activeTab === "inventory" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <Package size={18} />
              <span className="font-medium">Inventory</span>
            </div>
            {inventory.some(i => i.stock < 100) && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("finance")}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              activeTab === "finance" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <Calculator size={18} />
              <span className="font-medium">Financials</span>
            </div>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setView("customer")}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <LogOut size={16} />
            <span className="text-sm font-medium">Exit to Storefront</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "queue" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold font-sans">Live Operations</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-mono flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Systems Online
                </span>
              </div>
            </div>
            <OrderQueue />
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold font-sans">Stock Management</h2>
              <button aria-label="Refresh inventory" className="p-2 border border-slate-800 bg-slate-900 rounded-lg text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors">
                <RefreshCw size={18} />
              </button>
             </div>
             <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50 border-b border-slate-800">
                    <tr>
                      <th className="p-4 font-semibold text-slate-300">Item</th>
                      <th className="p-4 font-semibold text-slate-300 text-right">Units</th>
                      <th className="p-4 font-semibold text-slate-300 text-right">Current Stock</th>
                      <th className="p-4 font-semibold text-slate-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/20">
                        <td className="p-4 flex items-center gap-3">
                          <Package className="text-slate-500" size={16} />
                          <span className="font-medium text-slate-200">{item.name}</span>
                        </td>
                        <td className="p-4 text-slate-500 font-mono text-sm text-right">{item.unit}</td>
                        <td className={`p-4 font-mono font-bold text-right ${item.stock < 100 ? "text-amber-500" : "text-cyan-400"}`}>
                          {item.stock.toLocaleString()}
                        </td>
                        <td className="p-4">
                           {item.stock < 100 ? (
                             <span className="text-amber-500/90 text-xs border border-amber-500/30 bg-amber-500/10 px-2 py-1 rounded-full uppercase tracking-wider font-semibold animate-pulse">Low Stock</span>
                           ) : (
                             <span className="text-emerald-500/90 text-xs border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-wider font-semibold">Healthy</span>
                           )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === "finance" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-sans">Financial Dashboard</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <p className="text-slate-400 text-sm font-medium mb-1 flex items-center gap-2"><LayoutDashboard size={14}/> Total Revenue</p>
                  <p className="text-3xl font-mono text-cyan-400 font-bold mb-2">฿{revenue.toLocaleString()}</p>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 w-full" />
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <p className="text-slate-400 text-sm font-medium mb-1">Total Orders</p>
                  <p className="text-3xl font-mono text-slate-200 font-bold mb-2">{orders.filter(o => o.status === "Done").length}</p>
                  <p className="text-xs text-slate-500">completed transactions</p>
                </div>

                <div className="bg-slate-900 border-t border-r border-b border-l-4 border-slate-800 border-l-emerald-500 p-6 rounded-2xl">
                  <p className="text-slate-400 text-sm font-medium mb-1">Net Profit Margin</p>
                  <p className="text-3xl font-mono text-emerald-400 font-bold mb-2">฿{profit.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 bg-emerald-500/10 inline-block px-2 py-0.5 rounded text-emerald-500/80 font-mono">
                    {revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : "0.0"}% Margin
                  </p>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
