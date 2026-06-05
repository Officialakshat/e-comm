// pages/UserProfile.jsx
import { useState } from "react";

// ── Static Data ──────────────────────────────────────────
const orders = [
  {
    id: "#UM-4521",
    date: "12 Jan 2025",
    items: 3,
    total: 27788,
    status: "Delivered",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "#UM-4498",
    date: "03 Jan 2025",
    items: 1,
    total: 1299,
    status: "Delivered",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "#UM-4312",
    date: "24 Dec 2024",
    items: 2,
    total: 9198,
    status: "Returned",
    color: "bg-red-100 text-red-600",
  },
  {
    id: "#UM-4105",
    date: "10 Dec 2024",
    items: 4,
    total: 6445,
    status: "Delivered",
    color: "bg-green-100 text-green-700",
  },
];

const wishlist = [
  {
    id: 1,
    name: "Boho Floor Lamp",
    category: "Lighting",
    price: 3499,
    original: 6999,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80",
  },
  {
    id: 2,
    name: "Monstera Deliciosa",
    category: "Plants",
    price: 699,
    original: 999,
    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300&q=80",
  },
  {
    id: 3,
    name: "Leather Passport Wallet",
    category: "Fashion",
    price: 899,
    original: 1499,
    img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&q=80",
  },
];

const addresses = [
  {
    id: 1,
    label: "Home",
    line: "24B, Sector 17, Near HDFC Bank",
    city: "Ludhiana, Punjab 141001",
    isDefault: true,
  },
  {
    id: 2,
    label: "Office",
    line: "Plot 9, Industrial Area Phase 2",
    city: "Chandigarh, Punjab 160002",
    isDefault: false,
  },
];

const settings = [
  { label: "Email Notifications", desc: "Order updates via email", on: true },
  { label: "SMS Alerts", desc: "Delivery updates via SMS", on: true },
  {
    label: "Promotional Emails",
    desc: "Deals and exclusive offers",
    on: false,
  },
  {
    label: "Two-Factor Authentication",
    desc: "Extra security for your account",
    on: false,
  },
];

// ── Small reusable Toggle switch ─────────────────────────
function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${on ? "bg-[#C9B194]" : "bg-gray-200"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${on ? "translate-x-5" : ""}`}
      />
    </button>
  );
}

// ── Main Component ───────────────────────────────────────
export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Arjun Singh",
    email: "arjun@example.com",
    phone: "+91 98765 43210",
  });
  const [draft, setDraft] = useState({ ...user });
  const [toggles, setToggles] = useState(settings.map((s) => s.on));

  const tabs = ["Overview", "Orders", "Wishlist", "Addresses", "Settings"];

  return (
    <div className="min-h-screen bg-[#fdf9f5] px-4 sm:px-8 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ── Profile Card ── */}
        <div className="bg-white rounded-3xl border border-[#ede5da] overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-[#f5ede0] to-[#e8d5bb]" />
          <div className="px-6 pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 -mt-10">
            <div className="flex items-end gap-4">
              {/* Initials avatar */}
              <div className="w-20 h-20 rounded-2xl bg-[#C9B194] border-4 border-white shadow-md flex items-center justify-center">
                <span
                  className="text-white text-2xl font-bold"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="mb-1">
                <h2
                  className="text-xl font-bold text-gray-900"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {user.name}
                </h2>
                <p className="text-[12px] text-gray-500">{user.email}</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold bg-[#fdf0e2] border border-[#e8d5bb] text-[#9a7f5e] px-3 py-1.5 rounded-full self-start sm:self-auto">
              ⭐ Premium Member
            </span>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Orders", value: orders.length, icon: "📦" },
            { label: "Wishlist", value: wishlist.length, icon: "❤️" },
            {
              label: "Total Spent",
              value: `₹${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`,
              icon: "💳",
            },
            { label: "Member Since", value: "Jan 2024", icon: "🏅" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-[#ede5da] p-4 text-center"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-[16px] font-bold text-gray-900">{s.value}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white border border-[#ede5da] rounded-2xl p-1.5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-max px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200
                ${activeTab === tab ? "bg-[#1a1a1a] text-white" : "text-gray-500 hover:text-gray-800"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab Panels ── */}
        <div className="bg-white rounded-3xl border border-[#ede5da] p-6">
          {/* OVERVIEW */}
          {activeTab === "Overview" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  Personal Details
                </h3>
                {!editing && (
                  <button
                    onClick={() => {
                      setDraft({ ...user });
                      setEditing(true);
                    }}
                    className="text-[12px] text-[#C9B194] font-medium"
                  >
                    Edit
                  </button>
                )}
              </div>

              {editing ? (
                // Edit form
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    ["Full Name", "name"],
                    ["Email", "email"],
                    ["Phone", "phone"],
                  ].map(([label, key]) => (
                    <div
                      key={key}
                      className={key === "phone" ? "sm:col-span-2" : ""}
                    >
                      <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                        {label}
                      </label>
                      <input
                        value={draft[key]}
                        onChange={(e) =>
                          setDraft({ ...draft, [key]: e.target.value })
                        }
                        className="w-full bg-[#fdf9f5] border border-[#ede5da] rounded-xl px-4 py-2.5 text-[13.5px] outline-none focus:border-[#C9B194] transition-all"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2 flex gap-3">
                    <button
                      onClick={() => {
                        setUser({ ...draft });
                        setEditing(false);
                      }}
                      className="bg-[#1a1a1a] hover:bg-[#C9B194] text-white text-[13px] font-medium px-6 py-2.5 rounded-xl transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="border border-[#ede5da] text-gray-500 text-[13px] font-medium px-6 py-2.5 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display form
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    ["Full Name", user.name],
                    ["Email", user.email],
                    ["Phone", user.phone],
                  ].map(([label, val]) => (
                    <div
                      key={label}
                      className="bg-[#fdf9f5] rounded-xl p-3 border border-[#f0e8df]"
                    >
                      <p className="text-[10px] text-[#C9B194] font-medium uppercase tracking-widest mb-0.5">
                        {label}
                      </p>
                      <p className="text-[13.5px] font-medium text-gray-800">
                        {val}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Recent orders preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab("Orders")}
                    className="text-[12px] text-[#C9B194] font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-2">
                  {orders.slice(0, 2).map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between bg-[#fdf9f5] rounded-xl px-4 py-3 border border-[#f0e8df]"
                    >
                      <div>
                        <p className="text-[13px] font-semibold text-gray-800">
                          {o.id}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {o.date} · {o.items} items
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] font-bold text-gray-900">
                          ₹{o.total.toLocaleString()}
                        </p>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${o.color}`}
                        >
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === "Orders" && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-4">
                Order History
              </h3>
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fdf9f5] rounded-2xl px-5 py-4 border border-[#f0e8df]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#fdf0e2] flex items-center justify-center text-lg">
                      📦
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-gray-800">
                        {o.id}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {o.date} · {o.items} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-[14px] font-bold text-gray-900">
                      ₹{o.total.toLocaleString()}
                    </p>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${o.color}`}
                    >
                      {o.status}
                    </span>
                    <button className="text-[12px] text-[#C9B194] font-medium">
                      Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* WISHLIST */}
          {activeTab === "Wishlist" && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Saved Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-2xl border border-[#ede5da] overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                  >
                    <div className="h-36 overflow-hidden bg-[#fdf5ec]">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] text-[#C9B194] font-medium uppercase tracking-widest">
                        {item.category}
                      </p>
                      <p className="text-[13px] font-medium text-gray-800 truncate mb-2">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[13px] font-bold text-gray-900">
                            ₹{item.price.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-gray-400 line-through ml-1.5">
                            ₹{item.original.toLocaleString()}
                          </span>
                        </div>
                        <button className="text-[11px] bg-[#1a1a1a] hover:bg-[#C9B194] text-white px-3 py-1.5 rounded-lg transition-colors">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADDRESSES */}
          {activeTab === "Addresses" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Saved Addresses</h3>
                <button className="text-[12px] text-[#C9B194] font-medium">
                  + Add New
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`relative rounded-2xl p-4 border-2 ${addr.isDefault ? "border-[#C9B194] bg-[#fdf9f5]" : "border-[#ede5da] bg-white"}`}
                  >
                    {addr.isDefault && (
                      <span className="absolute top-3 right-3 text-[10px] font-semibold bg-[#C9B194] text-white px-2.5 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                    <p className="text-[13px] font-semibold text-gray-800 mb-1">
                      {addr.label === "Home" ? "🏠" : "🏢"} {addr.label}
                    </p>
                    <p className="text-[12px] text-gray-500 leading-relaxed">
                      {addr.line}
                    </p>
                    <p className="text-[12px] text-gray-500">{addr.city}</p>
                    <div className="flex gap-3 mt-3">
                      <button className="text-[11px] text-[#C9B194] font-medium">
                        Edit
                      </button>
                      {!addr.isDefault && (
                        <button className="text-[11px] text-gray-400 hover:text-red-500 font-medium">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "Settings" && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Account Settings
              </h3>
              <div className="space-y-4">
                {settings.map((s, i) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between py-3 border-b border-[#f5ede0] last:border-0"
                  >
                    <div>
                      <p className="text-[13.5px] font-medium text-gray-800">
                        {s.label}
                      </p>
                      <p className="text-[11.5px] text-gray-500">{s.desc}</p>
                    </div>
                    <Toggle
                      on={toggles[i]}
                      onChange={() =>
                        setToggles((prev) =>
                          prev.map((v, j) => (j === i ? !v : v)),
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button className="text-[13px] border border-[#ede5da] hover:border-[#C9B194] text-gray-600 hover:text-[#C9B194] font-medium px-5 py-2.5 rounded-xl transition-colors">
                  Change Password
                </button>
                <button className="text-[13px] border border-red-200 hover:bg-red-50 text-red-500 font-medium px-5 py-2.5 rounded-xl transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
