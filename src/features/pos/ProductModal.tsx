"use client";

import React, { useState } from "react";
import { MenuItem, MOCK_ADDONS } from "@/lib/mockPosData";
import { Sweetness, Temperature, useStore, CartItem } from "@/store/StoreContext";
import { X, Minus, Plus } from "lucide-react";

export default function ProductModal({ product, onClose }: { product: MenuItem; onClose: () => void }) {
  const { addToCart } = useStore();
  const [sweetness, setSweetness] = useState<Sweetness>("100%");
  const [temperature, setTemperature] = useState<Temperature>("Iced");
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [quantity, setQuantity] = useState(1);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => {
      const draft = new Set(prev);
      if (draft.has(id)) draft.delete(id);
      else draft.add(id);
      return draft;
    });
  };

  const calculateAddons = () => {
    return Array.from(selectedAddons).map((id) => MOCK_ADDONS.find((a) => a.id === id)!);
  };

  const addonTotal = calculateAddons().reduce((sum, a) => sum + a.price, 0);
  const totalItemPrice = product.price + addonTotal;
  const grandTotal = totalItemPrice * quantity;

  const handleConfirm = () => {
    const cartItem: CartItem = {
      id: `ci-${Date.now()}`,
      menuItem: product,
      sweetness,
      temperature,
      addOns: calculateAddons(),
      quantity,
      totalPrice: totalItemPrice,
    };
    addToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <div className="bg-slate-900 border-t border-slate-800 sm:border rounded-t-3xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 z-10 p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="font-mono text-cyan-400 mt-1">฿{product.price}</p>
          </div>
          <button aria-label="Close" onClick={onClose} className="bg-slate-800 p-2 rounded-full text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Temperature */}
          <section>
            <h3 className="font-semibold text-sm mb-3 text-slate-300">Temperature</h3>
            <div className="grid grid-cols-3 gap-3">
              {(["Hot", "Iced", "Frappe"] as Temperature[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTemperature(t)}
                  className={`py-2 rounded-xl text-sm font-medium border transition-colors ${
                    temperature === t
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                      : "border-slate-800 bg-slate-950 text-slate-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          {/* Sweetness */}
          <section>
            <h3 className="font-semibold text-sm mb-3 text-slate-300">Sweetness Level</h3>
            <div className="grid grid-cols-4 gap-3">
              {(["0%", "50%", "100%", "120%"] as Sweetness[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSweetness(s)}
                  className={`py-2 rounded-xl text-sm font-medium border font-mono transition-colors ${
                    sweetness === s
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                      : "border-slate-800 bg-slate-950 text-slate-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          {/* Add-ons */}
          <section>
            <h3 className="font-semibold text-sm mb-3 text-slate-300">Add-ons</h3>
            <div className="space-y-3">
              {MOCK_ADDONS.map((addon) => (
                <label key={addon.id} className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedAddons.has(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                      className="w-5 h-5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-950 bg-slate-900"
                    />
                    <span className="text-sm font-medium">{addon.name}</span>
                  </div>
                  <span className="font-mono text-slate-400 text-sm">+฿{addon.price}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Quantity */}
          <section className="flex items-center justify-between py-2 border-t border-slate-800">
            <h3 className="font-semibold text-sm text-slate-300">Quantity</h3>
            <div className="flex items-center gap-4 bg-slate-950 p-2 rounded-full border border-slate-800">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-slate-900 p-2 rounded-full text-slate-400 hover:text-white"
              >
                <Minus size={16} />
              </button>
              <span className="font-mono font-bold w-4 text-center">{quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity(quantity + 1)}
                className="bg-slate-900 p-2 rounded-full text-slate-400 hover:text-white"
              >
                <Plus size={16} />
              </button>
            </div>
          </section>
        </div>

        {/* Footer (Add to order) */}
        <div className="sticky bottom-0 bg-slate-900 p-6 border-t border-slate-800">
          <button
            onClick={handleConfirm}
            className="w-full bg-cyan-500 text-slate-950 font-bold py-4 rounded-full flex justify-between px-6 shadow-lg shadow-cyan-500/20"
          >
            <span>Add to Order</span>
            <span className="font-mono">฿{grandTotal.toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
