"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockOrders } from "@/services/mockData";
import type { OrderStatus } from "@/types";
import { Search } from "lucide-react";

const STATUS_STYLES: Record<OrderStatus, { className: string; label: string }> = {
  pending:   { className: "border border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280]", label: "รอดำเนินการ" },
  confirmed: { className: "border border-blue-200 bg-blue-50 text-blue-700", label: "ยืนยันแล้ว" },
  roasting:  { className: "border border-amber-200 bg-amber-50 text-amber-700", label: "กำลังคั่ว" },
  shipped:   { className: "border border-indigo-200 bg-indigo-50 text-indigo-700", label: "จัดส่งแล้ว" },
  delivered: { className: "border border-emerald-200 bg-emerald-50 text-emerald-700", label: "ส่งถึงแล้ว" },
  cancelled: { className: "border border-red-200 bg-red-50 text-red-600", label: "ยกเลิก" },
};

const ALL_STATUSES: OrderStatus[] = ["pending", "confirmed", "roasting", "shipped", "delivered", "cancelled"];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const filtered = mockOrders.filter((o) => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = mockOrders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[20px] font-semibold tracking-tight text-[#111827]">
          คำสั่งซื้อ
        </h1>
        <p className="mt-0.5 text-[13px] text-[#9CA3AF]">
          จัดการคำสั่งซื้อทั้งหมด
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
          <p className="text-[12px] text-[#9CA3AF]">คำสั่งซื้อทั้งหมด</p>
          <p className="text-xl font-semibold text-[#111827]">{mockOrders.length}</p>
        </div>
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
          <p className="text-[12px] text-[#9CA3AF]">รอดำเนินการ</p>
          <p className="text-xl font-semibold text-amber-600">
            {mockOrders.filter((o) => o.status === "pending" || o.status === "confirmed").length}
          </p>
        </div>
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
          <p className="text-[12px] text-[#9CA3AF]">ยอมรวมทั้งหมด</p>
          <p className="text-xl font-semibold text-[#111827]">
            ฿{totalRevenue.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="ค้นหาเลขที่ หรือ ชื่อลูกค้า..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-md border border-[#E5E7EB] bg-white pl-9 pr-3 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#111827] focus:outline-none sm:w-[280px]"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
              statusFilter === "all"
                ? "bg-[#111827] text-white"
                : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
            }`}
          >
            ทั้งหมด
          </button>
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
                statusFilter === s
                  ? "bg-[#111827] text-white"
                  : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
              }`}
            >
              {STATUS_STYLES[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">เลขที่</TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">ลูกค้า</TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">สถานะ</TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">รายการ</TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">ยอดรวม</TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">วันที่สั่ง</TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">หมายเหตุ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-[13px] text-[#9CA3AF]">
                  ไม่พบคำสั่งซื้อ
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((order) => {
                const statusStyle = STATUS_STYLES[order.status];
                return (
                  <TableRow key={order.id} className="border-[#F3F4F6]">
                    <TableCell className="text-[13px] font-medium text-[#111827]">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-[13px] text-[#374151]">{order.customerName}</p>
                        <p className="text-[11px] text-[#9CA3AF]">{order.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`h-auto rounded-full px-2 py-0.5 text-[11px] font-medium ${statusStyle.className}`}
                      >
                        {statusStyle.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[13px] text-[#6B7280]">
                      {order.items.length} รายการ
                    </TableCell>
                    <TableCell className="text-right text-[13px] font-medium tabular-nums text-[#111827]">
                      ฿{order.total.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right text-[13px] text-[#6B7280]">
                      {format(new Date(order.createdAt), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell className="text-right text-[12px] text-[#9CA3AF] max-w-[150px] truncate">
                      {order.notes || "—"}
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
