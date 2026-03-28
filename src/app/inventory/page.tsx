"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockInventory } from "@/services/mockData";
import type { InventoryCategory } from "@/types";
import { Search, AlertTriangle } from "lucide-react";

const CATEGORY_LABELS: Record<InventoryCategory, string> = {
  beans: "เมล็ดกาแฟ",
  ground: "กาแฟบด",
  equipment: "อุปกรณ์",
  accessories: "เครื่องประดับ",
  merchandise: "สินค้าของที่ระลึก",
};

const ALL_CATEGORIES: InventoryCategory[] = ["beans", "ground", "equipment", "accessories", "merchandise"];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<InventoryCategory | "all">("all");

  const filtered = mockInventory.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const lowStockCount = mockInventory.filter((i) => i.stockQuantity <= i.reorderLevel).length;
  const totalValue = mockInventory.reduce((s, i) => s + i.stockQuantity * i.costPrice, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[20px] font-semibold tracking-tight text-[#111827]">
          คลังสินค้า
        </h1>
        <p className="mt-0.5 text-[13px] text-[#9CA3AF]">
          จัดการสินค้าและติดตามระดับสต็อก
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
          <p className="text-[12px] text-[#9CA3AF]">สินค้าทั้งหมด</p>
          <p className="text-xl font-semibold text-[#111827]">{mockInventory.length}</p>
        </div>
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
          <p className="text-[12px] text-[#9CA3AF]">สินค้าที่ใช้งานอยู่</p>
          <p className="text-xl font-semibold text-emerald-600">
            {mockInventory.filter((i) => i.isActive).length}
          </p>
        </div>
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
          <div className="flex items-center gap-1.5">
            <p className="text-[12px] text-[#9CA3AF]">สินค้าใกล้หมด</p>
            {lowStockCount > 0 && <AlertTriangle size={12} className="text-red-500" />}
          </div>
          <p className="text-xl font-semibold text-red-600">{lowStockCount}</p>
        </div>
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
          <p className="text-[12px] text-[#9CA3AF]">มูลค่าสต็อกรวม</p>
          <p className="text-xl font-semibold text-[#111827]">
            ฿{totalValue.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="ค้นหาชื่อสินค้า หรือ รหัส SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-md border border-[#E5E7EB] bg-white pl-9 pr-3 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#111827] focus:outline-none sm:w-[280px]"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
              categoryFilter === "all"
                ? "bg-[#111827] text-white"
                : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
            }`}
          >
            ทั้งหมด
          </button>
          {ALL_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
                categoryFilter === c
                  ? "bg-[#111827] text-white"
                  : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
              }`}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">รหัส SKU</TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">ชื่อสินค้า</TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">หมวดหมู่</TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">สถานะ</TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">คงเหลือ</TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">จุดสั่งซื้อ</TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">ราคาขาย</TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">ต้นทุน</TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">ผู้จัดจำหน่าย</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-[13px] text-[#9CA3AF]">
                  ไม่พบสินค้า
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => {
                const isLowStock = item.stockQuantity <= item.reorderLevel;
                return (
                  <TableRow key={item.id} className="border-[#F3F4F6]">
                    <TableCell className="text-[13px] font-mono font-medium text-[#111827]">
                      {item.sku}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-[13px] text-[#374151]">{item.name}</p>
                        <p className="text-[11px] text-[#9CA3AF] max-w-[200px] truncate">{item.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="rounded bg-[#F3F4F6] px-2 py-0.5 text-[11px] font-medium text-[#6B7280]">
                        {CATEGORY_LABELS[item.category]}
                      </span>
                    </TableCell>
                    <TableCell>
                      {isLowStock ? (
                        <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 h-auto rounded-full px-2 py-0.5 text-[11px] font-medium">
                          สินค้าใกล้หมด
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 h-auto rounded-full px-2 py-0.5 text-[11px] font-medium">
                          มีสินค้า
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className={`text-right text-[13px] font-medium tabular-nums ${isLowStock ? "text-red-600" : "text-[#111827]"}`}>
                      {item.stockQuantity}
                    </TableCell>
                    <TableCell className="text-right text-[13px] text-[#9CA3AF] tabular-nums">
                      {item.reorderLevel}
                    </TableCell>
                    <TableCell className="text-right text-[13px] font-medium tabular-nums text-[#111827]">
                      ฿{item.unitPrice.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right text-[13px] text-[#6B7280] tabular-nums">
                      ฿{item.costPrice.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-[12px] text-[#6B7280] max-w-[130px] truncate">
                      {item.supplier}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
