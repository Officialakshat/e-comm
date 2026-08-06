// admin/AdminOrdersPanel.jsx
import { useState } from "react";
import { initialOrders, statusStyle } from "../data/AdminData";

const ALL_STATUSES = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrdersPanel({ searchQuery }) {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Apply search + status filter
  const visible = orders.filter((o) => {
    const matchFilter = filter === "All" || o.status === filter;
    const matchSearch =
      !searchQuery ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const saveStatus = (id) => {
    if (newStatus) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)),
      );
    }
    setEditingId(null);
    setNewStatus("");
  };

  const deleteOrder = (id) => {
    if (window.confirm("Delete this order?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
      {/* Header + filter pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h3
          className="text-[15px] font-semibold text-gray-900"
          style={{ fontFamily: "Georgia,serif" }}
        >
          Orders
          <span className="ml-2 text-[12px] font-normal text-gray-400">
            ({visible.length})
          </span>
        </h3>
        <div className="flex gap-1.5 flex-wrap">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                filter === s
                  ? "bg-[#C9B194] text-white border-[#C9B194]"
                  : "bg-white text-gray-500 border-[#ede5da] hover:border-[#C9B194] hover:text-[#C9B194]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#f5ede0] text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              <th className="pb-3 pr-4">Order</th>
              <th className="pb-3 pr-4">Customer</th>
              <th className="pb-3 pr-4">Product</th>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Amount</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5ede0]">
            {visible.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-[13px] text-gray-400"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              visible.map((o) => (
                <tr
                  key={o.id}
                  className="group hover:bg-[#fdf9f5] transition-colors"
                >
                  <td className="py-3 pr-4 text-[12px] font-semibold text-gray-800">
                    {o.id}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#C9B194]/20 text-[#C9B194] text-[9px] font-bold flex items-center justify-center shrink-0">
                        {o.avatar}
                      </div>
                      <span className="text-[12px] text-gray-700">
                        {o.customer}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-[12px] text-gray-600 max-w-35 truncate">
                    {o.product}
                  </td>
                  <td className="py-3 pr-4 text-[11px] text-gray-400">
                    {o.date}
                  </td>
                  <td className="py-3 pr-4 text-[12px] font-bold text-gray-900">
                    ₹{o.amount.toLocaleString()}
                  </td>
                  <td className="py-3 pr-4">
                    {editingId === o.id ? (
                      <div className="flex items-center gap-1.5">
                        <select
                          value={newStatus || o.status}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="text-[11px] border border-[#ede5da] rounded-lg px-2 py-1 outline-none focus:border-[#C9B194] bg-white"
                        >
                          {[
                            "Processing",
                            "Shipped",
                            "Delivered",
                            "Cancelled",
                          ].map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => saveStatus(o.id)}
                          className="text-[10px] bg-[#C9B194] text-white px-2 py-1 rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-[10px] text-gray-400 px-1"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[o.status]}`}
                      >
                        {o.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingId(o.id);
                          setNewStatus(o.status);
                        }}
                        className="text-[11px] text-[#C9B194] hover:text-[#9a7f5e] font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteOrder(o.id)}
                        className="text-[11px] text-red-400 hover:text-red-600 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
