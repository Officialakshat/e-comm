// pages/AdminDashboard.jsx
// Root file — assembles all admin components together
import { useState } from "react";
import AdminSidebar from "../admin/AdminSidebar";
import AdminHeader from "../admin/AdminHeader";
import StatCards from "../admin/StatCards";
import SalesChart from "../admin/SalesChart";
import TopProducts from "../admin/TopProducts";
import RecentOrders from "../admin/RecentOrders";
import OrdersBarChart from "../admin/OrdersBarChart";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-[#f8f6f3] overflow-hidden">
      {/* ── 1. Sidebar ── */}
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        active={active}
        setActive={setActive}
      />

      {/* ── Right side: header + scrollable content ── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* ── 2. Header ── */}
        <AdminHeader />

        {/* ── 3. Main scrollable area ── */}
        <main className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Page title + date picker */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium tracking-widest text-[#C9B194] uppercase">
                Overview
              </p>
              <h1
                className="text-xl font-bold text-gray-900"
                style={{ fontFamily: "Georgia,serif" }}
              >
                Dashboard
              </h1>
            </div>
            <button className="flex items-center gap-2 bg-white border border-[#ede5da] rounded-xl px-3 py-2 text-[12px] text-gray-600 hover:border-[#C9B194] transition-colors">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9B194"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Jan — Dec 2025
            </button>
          </div>

          {/* ── 4. Stat cards (4 KPI tiles) ── */}
          <StatCards />

          {/* ── 5. Area chart + Top Products ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            <TopProducts />
          </div>

          {/* ── 6. Recent Orders + Bar chart ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <RecentOrders />
            </div>
            <OrdersBarChart />
          </div>
        </main>
      </div>
    </div>
  );
}
