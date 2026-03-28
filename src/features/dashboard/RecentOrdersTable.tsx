"use client";

import React from "react";
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

/* ──────────────────────────────────────────────────────────────────────────
   Status badge styles
   ────────────────────────────────────────────────────────────────────────── */

const STATUS_STYLES: Record<OrderStatus, { className: string; label: string }> = {
  pending:   { className: "border border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280]", label: "Pending" },
  confirmed: { className: "border border-blue-200 bg-blue-50 text-blue-700", label: "Confirmed" },
  roasting:  { className: "border border-amber-200 bg-amber-50 text-amber-700", label: "Roasting" },
  shipped:   { className: "border border-indigo-200 bg-indigo-50 text-indigo-700", label: "Shipped" },
  delivered: { className: "border border-emerald-200 bg-emerald-50 text-emerald-700", label: "Delivered" },
  cancelled: { className: "border border-red-200 bg-red-50 text-red-600", label: "Cancelled" },
};

/* ──────────────────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────────────────── */

export default function RecentOrdersTable() {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
        <h2 className="text-[14px] font-semibold text-[#111827]">
          Recent Orders
        </h2>
        <span className="text-[12px] text-[#9CA3AF]">Last 5 orders</span>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-[12px] font-medium text-[#9CA3AF]">
              Order
            </TableHead>
            <TableHead className="text-[12px] font-medium text-[#9CA3AF]">
              Customer
            </TableHead>
            <TableHead className="text-[12px] font-medium text-[#9CA3AF]">
              Status
            </TableHead>
            <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">
              Total
            </TableHead>
            <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mockOrders.map((order) => {
            const statusStyle = STATUS_STYLES[order.status];
            return (
              <TableRow key={order.id} className="border-[#F3F4F6]">
                <TableCell className="text-[13px] font-medium text-[#111827]">
                  {order.orderNumber}
                </TableCell>
                <TableCell className="text-[13px] text-[#374151]">
                  {order.customerName}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`h-auto rounded-full px-2 py-0.5 text-[11px] font-medium ${statusStyle.className}`}
                  >
                    {statusStyle.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-[13px] font-medium tabular-nums text-[#111827]">
                  ${order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-right text-[13px] text-[#6B7280]">
                  {format(new Date(order.createdAt), "MMM d, yyyy")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
