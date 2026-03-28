export type InventoryItem = {
  id: string;
  name: string;
  unit: string;
  stock: number;
};

export type AddOn = {
  id: string;
  name: string;
  price: number;
  cost: number;
  inventoryId?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: "Coffee" | "Tea" | "Special" | "Non-Coffee";
  price: number;
  cost: number;
  imageColor: string;
  recipe: { inventoryId: string; amount: number }[];
};

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: "inv-beans", name: "Coffee Beans", unit: "shots", stock: 500 },
  { id: "inv-milk", name: "Whole Milk", unit: "ml", stock: 10000 },
  { id: "inv-oat", name: "Oat Milk", unit: "ml", stock: 5000 },
  { id: "inv-matcha", name: "Matcha Powder", unit: "g", stock: 1000 },
  { id: "inv-cocoa", name: "Cocoa Powder", unit: "g", stock: 1500 },
  { id: "inv-cup", name: "Cups (Hot/Iced)", unit: "pcs", stock: 300 },
  { id: "inv-syrup", name: "Simple Syrup", unit: "pumps", stock: 500 },
];

export const MOCK_ADDONS: AddOn[] = [
  { id: "add-shot", name: "+ Espresso Shot", price: 15, cost: 5, inventoryId: "inv-beans" },
  { id: "add-oat", name: "+ Oat Milk", price: 20, cost: 10, inventoryId: "inv-oat" },
  { id: "add-syrup", name: "+ Extra Syrup", price: 10, cost: 2, inventoryId: "inv-syrup" },
];

export const MOCK_MENU: MenuItem[] = [
  {
    id: "m-1",
    name: "Americano",
    category: "Coffee",
    price: 65,
    cost: 12,
    imageColor: "bg-slate-800",
    recipe: [
      { inventoryId: "inv-beans", amount: 2 },
      { inventoryId: "inv-cup", amount: 1 },
    ],
  },
  {
    id: "m-2",
    name: "Latte",
    category: "Coffee",
    price: 75,
    cost: 18,
    imageColor: "bg-amber-700",
    recipe: [
      { inventoryId: "inv-beans", amount: 2 },
      { inventoryId: "inv-milk", amount: 150 },
      { inventoryId: "inv-cup", amount: 1 },
    ],
  },
  {
    id: "m-3",
    name: "Orange Coffee",
    category: "Special",
    price: 90,
    cost: 25,
    imageColor: "bg-orange-500",
    recipe: [
      { inventoryId: "inv-beans", amount: 2 },
      { inventoryId: "inv-cup", amount: 1 },
    ],
  },
  {
    id: "m-4",
    name: "Matcha Latte",
    category: "Tea",
    price: 110,
    cost: 31,
    imageColor: "bg-emerald-600",
    recipe: [
      { inventoryId: "inv-matcha", amount: 10 },
      { inventoryId: "inv-milk", amount: 150 },
      { inventoryId: "inv-cup", amount: 1 },
    ],
  },
  {
    id: "m-5",
    name: "Thai Tea",
    category: "Tea",
    price: 60,
    cost: 15,
    imageColor: "bg-orange-600",
    recipe: [
      { inventoryId: "inv-milk", amount: 100 },
      { inventoryId: "inv-cup", amount: 1 },
    ],
  },
  {
    id: "m-6",
    name: "Mocha",
    category: "Coffee",
    price: 85,
    cost: 22,
    imageColor: "bg-stone-800",
    recipe: [
      { inventoryId: "inv-beans", amount: 2 },
      { inventoryId: "inv-cocoa", amount: 10 },
      { inventoryId: "inv-milk", amount: 100 },
      { inventoryId: "inv-cup", amount: 1 },
    ],
  },
  {
    id: "m-7",
    name: "Hot Cocoa",
    category: "Non-Coffee",
    price: 70,
    cost: 16,
    imageColor: "bg-yellow-900",
    recipe: [
      { inventoryId: "inv-cocoa", amount: 15 },
      { inventoryId: "inv-milk", amount: 150 },
      { inventoryId: "inv-cup", amount: 1 },
    ],
  },
  {
    id: "m-8",
    name: "Yuzu Cold Brew",
    category: "Special",
    price: 120,
    cost: 35,
    imageColor: "bg-yellow-400",
    recipe: [
      { inventoryId: "inv-beans", amount: 2 },
      { inventoryId: "inv-cup", amount: 1 },
    ],
  },
];
