"use client";

import React, { useState } from "react";
import { MOCK_MENU, MenuItem } from "@/lib/mockPosData";
import { Terminal, ChevronRight } from "lucide-react";
import ProductModal from "./ProductModal";
import { useStore } from "@/store/StoreContext";
import CheckoutDrawer from "./CheckoutDrawer";

const CATEGORIES = ["All", "Coffee", "Tea", "Special", "Non-Coffee"];

export default function CustomerStorefront() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const { cart, cartTotal } = useStore();

  const filteredMenu =
    activeTab === "All" ? MOCK_MENU : MOCK_MENU.filter((m) => m.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="text-cyan-400" size={24} />
          <h1 className="text-lg font-bold tracking-tight">Sudo Coffee<span className="text-cyan-400 text-xs ml-1 font-mono">_localhost</span></h1>
        </div>
      </header>

      {/* Categories */}
      <div className="overflow-x-auto whitespace-nowrap px-6 py-4 hide-scrollbar border-b border-slate-800/50">
        <div className="flex gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === cat
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="p-6 grid grid-cols-2 gap-4">
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedProduct(item)}
            className="flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-transform"
          >
            <div className={`h-32 w-full ${item.imageColor} flex items-center justify-center`}>
              {/* Optional: Add an icon or image here */}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm truncate">{item.name}</h3>
              <p className="text-cyan-400 font-mono text-sm mt-1">฿{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 z-30">
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-cyan-500 text-slate-950 px-6 py-4 rounded-full font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-slate-950 text-cyan-400 w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </div>
              <span className="tracking-wide">View Order</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono">฿{cartTotal}</span>
              <ChevronRight size={20} />
            </div>
          </button>
        </div>
      )}

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutDrawer onClose={() => setIsCheckoutOpen(false)} />
      )}
    </div>
  );
}
