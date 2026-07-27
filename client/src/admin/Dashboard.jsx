// pages/AdminProfile.jsx
import { useState } from "react";

// ── Static Data ──────────────────────────────────────────
const stats = [
  {
    label: "Total Revenue",
    value: "₹2,48,560",
    change: "+12.4%",
    up: true,
    icon: "💰",
  },
  {
    label: "Total Orders",
    value: "1,284",
    change: "+8.1%",
    up: true,
    icon: "📦",
  },
  {
    label: "Total Customers",
    value: "342",
    change: "+5.3%",
    up: true,
    icon: "👥",
  },
  {
    label: "Return Rate",
    value: "3.2%",
    change: "-0.8%",
    up: false,
    icon: "↩️",
  },
];

const orders = [
  {
    id: "#UM-4532",
    customer: "Priya Sharma",
    items: 2,
    total: 3998,
    status: "Processing",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "#UM-4531",
    customer: "Ravi Kumar",
    items: 1,
    total: 24990,
    status: "Shipped",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "#UM-4530",
    customer: "Neha Patel",
    items: 4,
    total: 6445,
    status: "Delivered",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "#UM-4529",
    customer: "Amit Verma",
    items: 1,
    total: 899,
    status: "Delivered",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "#UM-4528",
    customer: "Sunita Yadav",
    items: 3,
    total: 5496,
    status: "Cancelled",
    color: "bg-red-100 text-red-600",
  },
];

const products = [
  {
    id: 1,
    name: "Ceramic Table Lamp",
    cat: "Lighting",
    stock: 34,
    price: 1299,
    status: "Active",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    cat: "Electronics",
    stock: 8,
    price: 24990,
    status: "Active",
  },
  {
    id: 3,
    name: "Rattan Accent Chair",
    cat: "Furniture",
    stock: 0,
    price: 8499,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Aromatic Candle Bundle",
    cat: "Decor",
    stock: 112,
    price: 449,
    status: "Active",
  },
  {
    id: 5,
    name: "Matte Black Kettle",
    cat: "Kitchen",
    stock: 3,
    price: 2199,
    status: "Low Stock",
  },
];

const customers = [
  {
    name: "Arjun Singh",
    email: "arjun@example.com",
    orders: 4,
    spent: 45730,
    badge: "Premium",
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    orders: 2,
    spent: 5297,
    badge: "Regular",
  },
  {
    name: "Ravi Kumar",
    email: "ravi@example.com",
    orders: 7,
    spent: 89420,
    badge: "Premium",
  },
  {
    name: "Neha Patel",
    email: "neha@example.com",
    orders: 1,
    spent: 6445,
    badge: "New",
  },
];

const permissions = [
  { label: "Manage Orders", granted: true },
  { label: "Manage Products", granted: true },
  { label: "Manage Customers", granted: true },
  { label: "View Analytics", granted: true },
  { label: "Manage Admins", granted: false },
];

// ── Small helpers ────────────────────────────────────────
// Returns stock text colour based on quantity
const stockColor = (s) =>
  s === 0 ? "text-red-500" : s <= 5 ? "text-yellow-500" : "text-green-600";

// Returns pill colour for product status
const statusColor = {
  Active: "bg-green-100 text-green-700",
  "Out of Stock": "bg-red-100 text-red-600",
  "Low Stock": "bg-yellow-100 text-yellow-700",
};

// Returns badge colour for customer type
const badgeColor = {
  Premium: "bg-[#fdf0e2] text-[#9a7f5e]",
  Regular: "bg-blue-50 text-blue-600",
  New: "bg-green-50 text-green-600",
};

// ── Main Component ───────────────────────────────────────
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [editing, setEditing] = useState(false);
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@urbanmart.in",
    role: "Super Admin",
  });
  const [draft, setDraft] = useState({ ...admin });

  const tabs = ["Dashboard", "Orders", "Products", "Customers", "Settings"];

  return (
    <div className="min-h-screen bg-[#1a1a1a] px-4 sm:px-8 lg:px-12 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ── Admin Header Card ── */}
        <div className="bg-[#242424] rounded-3xl border border-white/10 overflow-hidden">
          <div className="h-20 bg-linear-to-r from-[#C9B194]/30 to-transparent" />
          <div className="px-6 pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 -mt-10">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-2xl bg-[#C9B194] border-4 border-[#242424] shadow-lg flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="mb-1">
                <h2
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {admin.name}
                </h2>
                <p className="text-[12px] text-gray-400">{admin.email}</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold bg-[#C9B194]/20 border border-[#C9B194]/30 text-[#C9B194] px-3 py-1.5 rounded-full self-start sm:self-auto">
              🛡️ {admin.role}
            </span>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-[#242424] border border-white/10 rounded-2xl p-1.5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-max px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200
                ${activeTab === tab ? "bg-[#C9B194] text-white" : "text-gray-400 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="bg-[#242424] rounded-3xl border border-white/10 p-6">
          {/* DASHBOARD */}
          {activeTab === "Dashboard" && (
            <div className="space-y-6">
              {/* KPI cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#2e2e2e] rounded-2xl border border-white/10 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">{s.icon}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.up ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400"}`}
                      >
                        {s.change}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white">{s.value}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent orders preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab("Orders")}
                    className="text-[12px] text-[#C9B194] font-medium"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-2">
                  {orders.slice(0, 3).map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between bg-[#2e2e2e] rounded-xl px-4 py-3 border border-white/5"
                    >
                      <div>
                        <span className="text-[13px] font-semibold text-white">
                          {o.id}
                        </span>
                        <span className="text-[11px] text-gray-400 ml-2">
                          — {o.customer}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] font-bold text-white">
                          ₹{o.total.toLocaleString()}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${o.color}`}
                        >
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low stock alert */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-2xl p-4">
                <p className="text-[13px] font-semibold text-yellow-400 mb-2">
                  ⚠️ Low Stock Alerts
                </p>
                {products
                  .filter((p) => p.stock <= 5)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="flex justify-between text-[12px] py-0.5"
                    >
                      <span className="text-gray-300">{p.name}</span>
                      <span className={`font-semibold ${stockColor(p.stock)}`}>
                        {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === "Orders" && (
            <div className="space-y-3">
              <h3 className="font-semibold text-white mb-4">All Orders</h3>
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#2e2e2e] rounded-2xl px-5 py-4 border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#C9B194]/20 flex items-center justify-center">
                      📦
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-white">
                        {o.id}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {o.customer} · {o.items} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-[14px] font-bold text-white">
                      ₹{o.total.toLocaleString()}
                    </p>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${o.color}`}
                    >
                      {o.status}
                    </span>
                    <button className="text-[12px] text-[#C9B194] font-medium">
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PRODUCTS */}
          {activeTab === "Products" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Product Management</h3>
                <button className="text-[12px] text-[#C9B194] font-medium">
                  + Add Product
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      {[
                        "Product",
                        "Category",
                        "Price",
                        "Stock",
                        "Status",
                        "",
                      ].map((h) => (
                        <th key={h} className="pb-3 pr-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map((p) => (
                      <tr key={p.id} className="group">
                        <td className="py-3 pr-4 text-[13px] font-medium text-white">
                          {p.name}
                        </td>
                        <td className="py-3 pr-4 text-[12px] text-gray-400">
                          {p.cat}
                        </td>
                        <td className="py-3 pr-4 text-[13px] text-white font-semibold">
                          ₹{p.price.toLocaleString()}
                        </td>
                        <td
                          className={`py-3 pr-4 text-[13px] font-semibold ${stockColor(p.stock)}`}
                        >
                          {p.stock || "—"}
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColor[p.status]}`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button className="text-[12px] text-[#C9B194] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CUSTOMERS */}
          {activeTab === "Customers" && (
            <div className="space-y-3">
              <h3 className="font-semibold text-white mb-4">
                Customer Management
              </h3>
              {customers.map((c) => (
                <div
                  key={c.email}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#2e2e2e] rounded-2xl px-5 py-4 border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    {/* Initials avatar */}
                    <div className="w-9 h-9 rounded-xl bg-[#C9B194]/20 text-[#C9B194] font-bold text-sm flex items-center justify-center shrink-0">
                      {c.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[13.5px] font-semibold text-white">
                          {c.name}
                        </p>
                        <span
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${badgeColor[c.badge]}`}
                        >
                          {c.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">{c.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-[13px] font-bold text-white">
                        {c.orders}
                      </p>
                      <p className="text-[10px] text-gray-500">Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[13px] font-bold text-white">
                        ₹{c.spent.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-500">Spent</p>
                    </div>
                    <button className="text-[12px] text-[#C9B194] font-medium">
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "Settings" && (
            <div className="space-y-6">
              <h3 className="font-semibold text-white">Admin Settings</h3>

              {/* Profile edit form */}
              <div className="bg-[#2e2e2e] rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-semibold text-white">
                    Profile Information
                  </p>
                  {!editing && (
                    <button
                      onClick={() => {
                        setDraft({ ...admin });
                        setEditing(true);
                      }}
                      className="text-[12px] text-[#C9B194] font-medium"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {editing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      ["Name", "name"],
                      ["Email", "email"],
                      ["Role", "role"],
                    ].map(([label, key]) => (
                      <div key={key}>
                        <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block mb-1">
                          {label}
                        </label>
                        <input
                          value={draft[key]}
                          onChange={(e) =>
                            setDraft({ ...draft, [key]: e.target.value })
                          }
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-[13.5px] text-white outline-none focus:border-[#C9B194] transition-all"
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2 flex gap-3">
                      <button
                        onClick={() => {
                          setAdmin({ ...draft });
                          setEditing(false);
                        }}
                        className="bg-[#C9B194] hover:bg-[#b89e7e] text-white text-[13px] font-medium px-6 py-2.5 rounded-xl transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="border border-white/10 text-gray-400 text-[13px] px-6 py-2.5 rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      ["Name", admin.name],
                      ["Email", admin.email],
                      ["Role", admin.role],
                    ].map(([label, val]) => (
                      <div
                        key={label}
                        className="bg-[#1a1a1a] rounded-xl p-3 border border-white/5"
                      >
                        <p className="text-[10px] text-[#C9B194] font-medium uppercase tracking-widest mb-0.5">
                          {label}
                        </p>
                        <p className="text-[13px] font-medium text-white">
                          {val}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Permissions list */}
              <div className="bg-[#2e2e2e] rounded-2xl p-5 border border-white/10">
                <p className="text-[13px] font-semibold text-white mb-4">
                  Permissions
                </p>
                <div className="space-y-3">
                  {permissions.map((p) => (
                    <div
                      key={p.label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-[13px] text-gray-300">
                        {p.label}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${p.granted ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400"}`}
                      >
                        {p.granted ? "Granted" : "Restricted"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
