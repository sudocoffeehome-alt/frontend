"use client";

import React from "react";
import { Store, Bell, Palette } from "lucide-react";

function SettingSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white">
      <div className="border-b border-[#E5E7EB] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Icon size={18} strokeWidth={1.5} className="text-[#9CA3AF]" />
          <div>
            <h2 className="text-[14px] font-semibold text-[#111827]">{title}</h2>
            <p className="text-[12px] text-[#9CA3AF]">{description}</p>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 space-y-4">{children}</div>
    </div>
  );
}

function InputField({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <label className="text-[12px] font-medium text-[#6B7280]">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className="h-9 w-full rounded-md border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] focus:border-[#111827] focus:outline-none sm:max-w-[360px]"
      />
    </div>
  );
}

function ToggleField({ label, description, defaultChecked = false }: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[13px] font-medium text-[#374151]">{label}</p>
        <p className="text-[11px] text-[#9CA3AF]">{description}</p>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" defaultChecked={defaultChecked} />
        <div className="h-5 w-9 rounded-full bg-[#E5E7EB] transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#111827] peer-checked:after:translate-x-full"></div>
      </label>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[20px] font-semibold tracking-tight text-[#111827]">
          ตั้งค่า
        </h1>
        <p className="mt-0.5 text-[13px] text-[#9CA3AF]">
          จัดการข้อมูลร้านและการตั้งค่าระบบ
        </p>
      </div>

      {/* Store Info */}
      <SettingSection
        icon={Store}
        title="ข้อมูลร้าน"
        description="ข้อมูลพื้นฐานของร้าน"
      >
        <InputField label="ชื่อร้าน" value="Sudo Coffee" />
        <InputField label="ที่อยู่" value="123 ถ.สุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110" />
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="เบอร์โทรศัพท์" value="02-123-4567" type="tel" />
          <InputField label="อีเมล" value="contact@sudocoffee.co" type="email" />
        </div>
        <InputField label="เลขทะเบียนภาษี" value="0105565012345" />
        <div className="pt-2">
          <button className="h-9 rounded-md bg-[#111827] px-4 text-[13px] font-medium text-white transition-colors hover:bg-[#1f2937]">
            บันทึกข้อมูลร้าน
          </button>
        </div>
      </SettingSection>

      {/* Notifications */}
      <SettingSection
        icon={Bell}
        title="การแจ้งเตือน"
        description="ตั้งค่าการแจ้งเตือนต่างๆ"
      >
        <ToggleField
          label="แจ้งเตือนคำสั่งซื้อใหม่"
          description="รับการแจ้งเตือนเมื่อมีคำสั่งซื้อใหม่เข้ามา"
          defaultChecked={true}
        />
        <ToggleField
          label="แจ้งเตือนสินค้าใกล้หมด"
          description="รับการแจ้งเตือนเมื่อสินค้าถึงจุดสั่งซื้อใหม่"
          defaultChecked={true}
        />
        <ToggleField
          label="สรุปยอมประจำวัน"
          description="รับรายงานสรุปยอดขายทุกวันเวลา 08:00 น."
          defaultChecked={false}
        />
        <ToggleField
          label="แจ้งเตือนทางอีเมล"
          description="ส่งการแจ้งเตือนไปยังอีเมลที่ลงทะเบียน"
          defaultChecked={true}
        />
      </SettingSection>

      {/* Display */}
      <SettingSection
        icon={Palette}
        title="การแสดงผล"
        description="ตั้งค่าการแสดงผลหน้าจอ"
      >
        <div className="grid gap-1.5">
          <label className="text-[12px] font-medium text-[#6B7280]">สกุลเงิน</label>
          <select
            defaultValue="THB"
            className="h-9 w-full rounded-md border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] focus:border-[#111827] focus:outline-none sm:max-w-[360px]"
          >
            <option value="THB">฿ บาท (THB)</option>
            <option value="USD">$ ดอลลาร์สหรัฐ (USD)</option>
          </select>
        </div>
        <div className="grid gap-1.5">
          <label className="text-[12px] font-medium text-[#6B7280]">รูปแบบวันที่</label>
          <select
            defaultValue="dd/MM/yyyy"
            className="h-9 w-full rounded-md border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] focus:border-[#111827] focus:outline-none sm:max-w-[360px]"
          >
            <option value="dd/MM/yyyy">วว/ดด/ปปปป (31/12/2026)</option>
            <option value="yyyy-MM-dd">ปปปป-ดด-วว (2026-12-31)</option>
          </select>
        </div>
        <div className="grid gap-1.5">
          <label className="text-[12px] font-medium text-[#6B7280]">จำนวนรายการต่อหน้า</label>
          <select
            defaultValue="10"
            className="h-9 w-full rounded-md border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] focus:border-[#111827] focus:outline-none sm:max-w-[360px]"
          >
            <option value="10">10 รายการ</option>
            <option value="25">25 รายการ</option>
            <option value="50">50 รายการ</option>
          </select>
        </div>
        <div className="pt-2">
          <button className="h-9 rounded-md bg-[#111827] px-4 text-[13px] font-medium text-white transition-colors hover:bg-[#1f2937]">
            บันทึกการตั้งค่า
          </button>
        </div>
      </SettingSection>
    </div>
  );
}
