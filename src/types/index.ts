// ─── Order Types ────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "roasting"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string | null;
  notes: string | null;
}

// ─── Inventory Types ────────────────────────────────────────────────────────

export type InventoryCategory =
  | "beans"
  | "ground"
  | "equipment"
  | "accessories"
  | "merchandise";

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: InventoryCategory;
  description: string;
  unitPrice: number;
  costPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  supplier: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Dashboard Metric Types ─────────────────────────────────────────────────

export interface DashboardMetric {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}
