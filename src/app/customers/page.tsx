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
import { mockCustomers } from "@/services/mockData";
import { Search } from "lucide-react";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = mockCustomers.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  const totalCustomers = mockCustomers.length;
  const activeCustomers = mockCustomers.filter((c) => c.status === "active").length;
  const totalRevenue = mockCustomers.reduce((s, c) => s + c.totalSpent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[20px] font-semibold tracking-tight text-[#111827]">
          ลูกค้า
        </h1>
        <p className="mt-0.5 text-[13px] text-[#9CA3AF]">
          จัดการข้อมูลลูกค้าและประวัติการสั่งซื้อ
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
          <p className="text-[12px] text-[#9CA3AF]">ลูกค้าทั้งหมด</p>
          <p className="text-xl font-semibold text-[#111827]">{totalCustomers}</p>
        </div>
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
          <p className="text-[12px] text-[#9CA3AF]">ลูกค้าที่ใช้งานอยู่</p>
          <p className="text-xl font-semibold text-emerald-600">{activeCustomers}</p>
        </div>
        <div className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
          <p className="text-[12px] text-[#9CA3AF]">ยอดขายรวมจากลูกค้า</p>
          <p className="text-xl font-semibold text-[#111827]">
            ฿{totalRevenue.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          type="text"
          placeholder="ค้นหาชื่อ บริษัท หรือ อีเมล..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full rounded-md border border-[#E5E7EB] bg-white pl-9 pr-3 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#111827] focus:outline-none sm:w-[320px]"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">ชื่อ</TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">บริษัท / ร้าน</TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">ติดต่อ</TableHead>
              <TableHead className="text-[12px] font-medium text-[#9CA3AF]">สถานะ</TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">คำสั่งซื้อ</TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">ยอดสั่งซื้อรวม</TableHead>
              <TableHead className="text-right text-[12px] font-medium text-[#9CA3AF]">สั่งซื้อล่าสุด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-[13px] text-[#9CA3AF]">
                  ไม่พบลูกค้า
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((customer) => (
                <TableRow key={customer.id} className="border-[#F3F4F6]">
                  <TableCell className="text-[13px] font-medium text-[#111827]">
                    {customer.name}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#374151]">
                    {customer.company}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-[12px] text-[#374151]">{customer.email}</p>
                      <p className="text-[11px] text-[#9CA3AF]">{customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {customer.status === "active" ? (
                      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 h-auto rounded-full px-2 py-0.5 text-[11px] font-medium">
                        ใช้งานอยู่
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] h-auto rounded-full px-2 py-0.5 text-[11px] font-medium">
                        ไม่ได้ใช้งาน
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-[13px] font-medium tabular-nums text-[#111827]">
                    {customer.totalOrders}
                  </TableCell>
                  <TableCell className="text-right text-[13px] font-medium tabular-nums text-[#111827]">
                    ฿{customer.totalSpent.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right text-[13px] text-[#6B7280]">
                    {format(new Date(customer.lastOrderDate), "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
