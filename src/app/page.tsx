import DashboardMetrics from "@/features/dashboard/DashboardMetrics";
import RecentOrdersTable from "@/features/dashboard/RecentOrdersTable";
import InventoryTable from "@/features/dashboard/InventoryTable";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-[20px] font-semibold tracking-tight text-[#111827]">
          Dashboard
        </h1>
        <p className="mt-0.5 text-[13px] text-[#9CA3AF]">
          Overview of sales, orders, and inventory health.
        </p>
      </div>

      {/* KPI cards */}
      <DashboardMetrics />

      {/* Tables grid */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <div className="min-w-0 h-full">
          {/* Recent orders */}
          <RecentOrdersTable />
        </div>
        <div className="min-w-0 h-full">
          {/* Inventory Overview */}
          <InventoryTable />
        </div>
      </div>
    </div>
  );
}
