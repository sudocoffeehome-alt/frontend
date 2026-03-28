"use client";

import React, { useState } from "react";
import { useStore, CartItem } from "@/store/StoreContext";
import { X, Trash2, ArrowRight, ShoppingCart } from "lucide-react";

export default function CheckoutDrawer({ onClose }: { onClose: () => void }) {
  const { cart, removeFromCart, cartTotal, placeOrder } = useStore();
  const [orderType, setOrderType] = useState<"Delivery" | "Pick up">("Pick up");
  const [isDone, setIsDone] = useState(false);

  const handleConfirm = () => {
    placeOrder(orderType);
    setIsDone(true);
  };

  if (isDone) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-50 mb-2">Order Confirmed!</h2>
        <p className="text-slate-400 mb-8 max-w-sm">
          Please wait while your order appears on the admin screen.
        </p>
        <button
          onClick={onClose}
          className="bg-slate-800 text-slate-300 px-8 py-3 rounded-full font-medium hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="bg-slate-900 border-l border-slate-800 w-full sm:w-[480px] h-full flex flex-col shadow-2xl shadow-slate-950/50">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h2 className="text-xl font-bold text-slate-50">Your Cart</h2>
            <p className="text-sm text-cyan-400 font-mono mt-0.5">{cart.length} items</p>
          </div>
          <button aria-label="Close drawer" onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Order Type Toggle */}
        <div className="p-6 bg-slate-950/50 border-b border-slate-800">
          <div className="flex bg-slate-900 rounded-xl border border-slate-800 p-1">
            <button
              onClick={() => setOrderType("Pick up")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                orderType === "Pick up" ? "bg-slate-800 text-cyan-400 shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Pick up at store
            </button>
            <button
              onClick={() => setOrderType("Delivery")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                orderType === "Delivery" ? "bg-slate-800 text-cyan-400 shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Delivery
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
              <ShoppingCart size={48} className="text-slate-800" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item: CartItem) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 group transition-colors hover:border-slate-700">
                <div className={`w-16 h-16 rounded-xl ${item.menuItem.imageColor} flex-shrink-0 flex items-center justify-center opacity-80`} />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-slate-200">{item.menuItem.name}</h3>
                    <span className="font-mono text-cyan-400">฿{(item.totalPrice * item.quantity).toLocaleString()}</span>
                  </div>
                  
                  <div className="text-xs text-slate-400 mt-1 space-y-0.5">
                    <div className="font-mono">
                      {item.quantity}x @ ฿{item.totalPrice}
                    </div>
                    <div className="text-slate-500">
                      {item.temperature} • {item.sweetness}
                    </div>
                    {item.addOns.length > 0 && (
                      <div className="text-slate-500 italic mt-1">
                        + {item.addOns.map((a) => a.name.replace("+ ", "")).join(", ")}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  aria-label="Remove item"
                  onClick={() => removeFromCart(item.id)}
                  className="self-center p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-full transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-slate-900 border-t border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-400">Subtotal</span>
              <span className="font-mono text-slate-300">฿{cartTotal.toLocaleString()}</span>
            </div>
            
            <button
              onClick={handleConfirm}
              className="w-full bg-cyan-500 text-slate-950 font-bold py-4 px-6 rounded-full flex justify-center items-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-shadow"
            >
              <span>Confirm & Pay ฿{cartTotal.toLocaleString()}</span>
              <ArrowRight size={20} />
            </button>
            <p className="text-center text-xs text-slate-500 mt-4 font-mono">
              Redirecting to LINE OA payment gateway
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
