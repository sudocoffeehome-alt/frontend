"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { MenuItem, AddOn, MOCK_INVENTORY } from "@/lib/mockPosData";

// Types
export type Sweetness = "0%" | "50%" | "100%" | "120%";
export type Temperature = "Hot" | "Iced" | "Frappe";

export type CartItem = {
  id: string; // unique cart item id
  menuItem: MenuItem;
  sweetness: Sweetness;
  temperature: Temperature;
  addOns: AddOn[];
  quantity: number;
  totalPrice: number;
};

export type OrderStatus = "Pending" | "Making" | "Done";

export type Order = {
  id: string;
  items: CartItem[];
  totalPrice: number;
  totalCost: number;
  status: OrderStatus;
  createdAt: Date;
  type: "Delivery" | "Pick up";
};

type StoreContextType = {
  view: "customer" | "admin";
  setView: (view: "customer" | "admin") => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  orders: Order[];
  placeOrder: (type: "Delivery" | "Pick up") => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  inventory: typeof MOCK_INVENTORY;
  revenue: number;
  profit: number;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<"customer" | "admin">("customer");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState(MOCK_INVENTORY);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0), [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const deductInventory = (orderItems: CartItem[]) => {
    setInventory((prevInv) => {
      let draft = [...prevInv];
      orderItems.forEach((cartItem) => {
        // Deduct base ingredients
        cartItem.menuItem.recipe.forEach((ing) => {
          draft = draft.map((i) =>
            i.id === ing.inventoryId ? { ...i, stock: i.stock - ing.amount * cartItem.quantity } : i
          );
        });
        // Deduct add-ons
        cartItem.addOns.forEach((addon) => {
          if (addon.inventoryId) {
            draft = draft.map((i) =>
              i.id === addon.inventoryId ? { ...i, stock: i.stock - 1 * cartItem.quantity } : i
            );
          }
        });
      });
      return draft;
    });
  };

  const placeOrder = (type: "Delivery" | "Pick up") => {
    if (cart.length === 0) return;

    const totalCost = cart.reduce((sum, cartItem) => {
      const addonCost = cartItem.addOns.reduce((a, b) => a + b.cost, 0);
      return sum + (cartItem.menuItem.cost + addonCost) * cartItem.quantity;
    }, 0);

    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      items: cart,
      totalPrice: cartTotal,
      totalCost,
      status: "Pending",
      createdAt: new Date(),
      type,
    };

    setOrders((prev) => [...prev, newOrder]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => {
      const order = prev.find((o) => o.id === orderId);
      if (order && status === "Done" && order.status !== "Done") {
        deductInventory(order.items);
      }
      return prev.map((o) => (o.id === orderId ? { ...o, status } : o));
    });
  };

  const completedOrders = orders.filter((o) => o.status === "Done");
  const revenue = completedOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const profit = completedOrders.reduce((sum, o) => sum + (o.totalPrice - o.totalCost), 0);

  return (
    <StoreContext.Provider
      value={{
        view,
        setView,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        orders,
        placeOrder,
        updateOrderStatus,
        inventory,
        revenue,
        profit,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
