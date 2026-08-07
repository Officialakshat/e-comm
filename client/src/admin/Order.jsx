// admin/Orders.jsx  — root page that wires all order components together
import { useState } from "react";
import { mockOrders, statusStyle, ORDER_STATUSES } from "../../data/ordersData";
import OrdersTable from "./OrdersTable";
import OrderDetailsModal from "./OrderDetailsModal";
import UpdateStatusModal from "./UpdateStatusModal";

const FILTER_TABS = ["All", ...ORDER_STATUSES];

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [viewingOrder, setViewingOrder] = useState(null); // OrderDetailsModal
  const [editingOrder, setEditingOrder] = useState(null); // UpdateStatusModal

  // ── Derived stats ─────────────────────────────────────
  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: "📦",
      bg: "bg-[#fdf0e2]",
    },
    {
      label: "Processing",
      value: orders.filter((o) => o.status === "Processing").length,
      icon: "⏳",
      bg: "bg-yellow-50",
    },
    {
      label: "Shipped",
      value: orders.filter((o) => o.status === "Shipped").length,
      icon: "🚚",
      bg: "bg-blue-50",
    },
    {
      label: "Delivered",
      value: orders.filter((o) => o.status === "Delivered").length,
      icon: "✅",
      bg: "bg-[#f0f9f4]",
    },
  ];

  // ── Filter + search ───────────────────────────────────
  const visible = orders.filter((o) => {
    const matchFilter = filter === "All" || o.status === filter;
    const matchSearch =
      !search ||
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  // ── Update status (called from UpdateStatusModal) ─────
  const handleStatusUpdate = async (orderId, newStatus) => {
    // Replace with your real API call: await updateOrderStatus(orderId, newStatus)
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-5 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ── Page heading ── */}
        <div>
          <p className="text-[11px] font-medium tracking-widest text-[#C9B194] uppercase mb-1">
            Admin
          </p>
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Georgia,serif" }}
          >
            Order Management
          </h1>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-[#ede5da] p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center text-xl mb-3`}
              >
                {s.icon}
              </div>
              <p className="text-[22px] font-bold text-gray-900 leading-none">
                {s.value}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Search + filter tabs ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex items-center bg-white border border-[#ede5da] rounded-full max-w-sm w-full focus-within:border-[#C9B194] focus-within:ring-[3px] focus-within:ring-[#C9B19428] transition-all">
            <svg
              className="ml-4 shrink-0 text-[#9a7f5e]"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID or customer…"
              className="flex-1 bg-transparent outline-none border-none px-3 py-2.5 text-[13px] text-gray-800 placeholder-[#b0a090]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mr-3 text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex gap-1.5 flex-wrap">
            {FILTER_TABS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-2 rounded-full text-[11px] font-medium border transition-all duration-200 ${
                  filter === f
                    ? "bg-[#C9B194] text-white border-[#C9B194]"
                    : "bg-white text-gray-500 border-[#ede5da] hover:border-[#C9B194] hover:text-[#C9B194]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Result info ── */}
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-600">
              {visible.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-600">{orders.length}</span>{" "}
            orders
          </p>
          {(search || filter !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="text-[11px] text-[#C9B194] hover:text-[#9a7f5e] font-medium transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-[#ede5da] overflow-hidden">
          <OrdersTable
            orders={visible}
            onView={setViewingOrder}
            onStatusEdit={setEditingOrder}
          />

          {/* Footer */}
          {visible.length > 0 && (
            <div className="px-5 py-3 border-t border-[#f5ede0] bg-[#fdf9f5]">
              <p className="text-[11px] text-gray-400">
                {orders.length} order{orders.length !== 1 ? "s" : ""} total
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Order Details Modal ── */}
      {viewingOrder && (
        <OrderDetailsModal
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
        />
      )}

      {/* ── Update Status Modal ── */}
      {editingOrder && (
        <UpdateStatusModal
          order={editingOrder}
          onUpdate={handleStatusUpdate}
          onClose={() => setEditingOrder(null)}
        />
      )}
    </div>
  );
}
