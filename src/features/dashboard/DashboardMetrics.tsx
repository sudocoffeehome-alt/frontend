"use client";

import React from "react";
import { DollarSign, ClipboardList, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const METRICS = [
  {
    label: "รายได้ (เดือนนี้)",
    value: "฿24,812",
    change: +12.4,
    changeLabel: "เทียบเดือนที่แล้ว",
    icon: DollarSign,
  },
  {
    label: "คำสั่งซื้อ",
    value: "148",
    change: +8.1,
    changeLabel: "เทียบเดือนที่แล้ว",
    icon: ClipboardList,
  },
  {
    label: "แจ้งเตือนสินค้าใกล้หมด",
    value: "3",
    change: -1,
    changeLabel: "เทียบกับเมื่อวาน",
    icon: AlertTriangle,
  },
];

export default function DashboardMetrics() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {METRICS.map((m) => {
        const Icon = m.icon;
        return (
          <Card
            key={m.label}
            className="rounded-lg border border-[#E5E7EB] bg-white shadow-none ring-0"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-1">
              <CardTitle className="text-[13px] font-medium text-[#6B7280]">
                {m.label}
              </CardTitle>
              <Icon size={20} strokeWidth={1.5} className="text-[#9CA3AF]" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tracking-tight text-[#111827]">
                {m.value}
              </p>
              <p className="mt-1 text-[12px] text-[#9CA3AF]">
                <span
                  className={
                    m.change >= 0 ? "text-emerald-600" : "text-red-500"
                  }
                >
                  {m.change >= 0 ? "+" : ""}
                  {m.change}%
                </span>{" "}
                {m.changeLabel}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
