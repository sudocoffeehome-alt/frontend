"use client";

import React from "react";
import { useStore, Order } from "@/store/StoreContext";
import { format } from "date-fns";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function OrderQueue() {
  const { orders, updateOrderStatus } = useStore();

  const pending = orders.filter((o) => o.status === "Pending");
  const making = orders.filter((o) => o.status === "Making");
  const done = orders.filter((o) => o.status === "Done").slice(0, 5); // Just show last 5 done

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Pending Column */}
      <div className="flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="bg-slate-800/50 p-4 border-b border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-slate-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Incoming queue
          </h2>
          <span className="bg-cyan-500 text-slate-950 font-mono text-xs px-2 py-1 rounded-full">{pending.length}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {pending.length === 0 && <p className="text-slate-500 text-sm italic text-center py-8">No incoming orders</p>}
          {pending.map((order) => (
            <OrderCard key={order.id} order={order} nextAction={() => updateOrderStatus(order.id, "Making")} nextLabel="Start making" />
          ))}
        </div>
      </div>

      {/* Making Column */}
      <div className="flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="bg-slate-800/50 p-4 border-b border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-slate-100 flex items-center gap-2">
            <Clock size={16} className="text-amber-500" />
            In progress
          </h2>
          <span className="bg-slate-800 text-amber-500 font-mono text-xs px-2 py-1 rounded-full border border-amber-500/20">{making.length}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {making.length === 0 && <p className="text-slate-500 text-sm italic text-center py-8">Kitchen is clear</p>}
          {making.map((order) => (
            <OrderCard key={order.id} order={order} nextAction={() => updateOrderStatus(order.id, "Done")} nextLabel="Ready for pickup" isMaking />
          ))}
        </div>
      </div>

      {/* Done Column */}
      <div className="flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden opacity-80">
        <div className="bg-slate-800/50 p-4 border-b border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            Completed
          </h2>
          <span className="font-mono text-xs text-slate-500">recent docs</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {done.length === 0 && <p className="text-slate-600 text-sm italic text-center py-8">Empty</p>}
          {done.map((order) => (
            <div key={order.id} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-slate-500 text-sm">#{order.id}</span>
                <span className="text-emerald-500 text-xs flex items-center gap-1"><CheckCircle2 size={12} /> fulfilled</span>
              </div>
              <p className="text-slate-400 text-sm">{order.items.length} items • ฿{order.totalPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, nextAction, nextLabel, isMaking = false }: { order: Order; nextAction: () => void; nextLabel: string; isMaking?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border transition-colors ${
      isMaking ? "bg-amber-500/5 border-amber-500/20" : "bg-slate-950 border-slate-800 hover:border-cyan-500/50"
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`font-mono font-bold ${isMaking ? "text-amber-400" : "text-cyan-400"}`}>#{order.id}</h3>
          <p className="text-slate-500 text-xs mt-1 flex items-center gap-1">
            <Clock size={12} /> {format(order.createdAt, "HH:mm:ss")} • {order.type}
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-sm text-slate-300">฿{order.totalPrice}</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-3 text-sm">
            <div className="bg-slate-900 border border-slate-800 text-slate-400 w-6 h-6 rounded flex items-center justify-center font-mono flex-shrink-0">
              {item.quantity}
            </div>
            <div>
              <p className="font-medium text-slate-200">{item.menuItem.name}</p>
              <p className="text-xs text-slate-500">{item.temperature} • {item.sweetness}</p>
              {item.addOns.length > 0 && (
                <p className="text-xs text-amber-500/80 italic mt-0.5">+ {item.addOns.map((a) => a.name.replace("+ ", "")).join(", ")}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={nextAction}
        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 ${
          isMaking 
            ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 focus:ring-emerald-500" 
            : "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 focus:ring-cyan-500"
        }`}
      >
        {nextLabel}
        {isMaking ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}
      </button>
    </div>
  );
}
