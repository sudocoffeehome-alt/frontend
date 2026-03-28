"use client";

import React from "react";
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

export default function InventoryTable() {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3 shrink-0">
        <h2 className="text-[14px] font-semibold text-[#111827]">
          ภาพรวมคลังสินค้า
        </h2>
        <span className="text-[12px] text-[#9CA3AF]">ระดับสต็อก</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">
                รหัสสินค้า
              </TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">
                ชื่อสินค้า
              </TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">
                สถานะ
              </TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">
                คงเหลือ
              </TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">
                ราคา
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {mockInventory.map((item) => {
              const isLowStock = item.stockQuantity <= item.reorderLevel;
              return (
                <TableRow key={item.id} className="border-[#F3F4F6]">
                  <TableCell className="text-[13px] font-medium text-[#111827] max-w-[100px] truncate">
                    {item.sku}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#374151] max-w-[120px] truncate">
                    {item.name}
                  </TableCell>
                  <TableCell>
                    {isLowStock ? (
                      <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 h-auto rounded-full px-2 py-0.5 text-[11px] font-medium">สินค้าใกล้หมด</Badge>
                    ) : (
                      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 h-auto rounded-full px-2 py-0.5 text-[11px] font-medium">มีสินค้า</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-[13px] font-medium tabular-nums text-[#111827]">
                    {item.stockQuantity}
                  </TableCell>
                  <TableCell className="text-right text-[13px] text-[#6B7280]">
                    ฿{item.unitPrice.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
