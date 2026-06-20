// pages/MyOrders.jsx
import { useState } from "react";

// ── Static Data ──────────────────────────────────────────
const orders = [
  {
    id: "#UM-4521",
    date: "12 Jan 2025",
    status: "Delivered",
    color: "bg-green-100 text-green-700",
    total: 27788,
    items: [
      {
        name: "Sony WH-1000XM5",
        qty: 1,
        price: 24990,
        img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80",
      },
      {
        name: "Ceramic Table Lamp",
        qty: 1,
        price: 1299,
        img: "https://www.ikea.com/in/en/images/products/blidvaeder-table-lamp-off-white-ceramic-beige__1059594_pe849715_s5.jpg?f=xl",
      },
      {
        name: "Aromatic Candle Bundle",
        qty: 1,
        price: 449,
        img: "https://images.unsplash.com/photo-1602607144573-ebb29eda0c4d?w=200&q=80",
      },
    ],
  },
  {
    id: "#UM-4498",
    date: "03 Jan 2025",
    status: "Delivered",
    color: "bg-green-100 text-green-700",
    total: 1299,
    items: [
      {
        name: "Ceramic Table Lamp",
        qty: 1,
        price: 1299,
        img: "https://www.ikea.com/in/en/images/products/blidvaeder-table-lamp-off-white-ceramic-beige__1059594_pe849715_s5.jpg?f=xl",
      },
    ],
  },
  {
    id: "#UM-4480",
    date: "28 Dec 2024",
    status: "Shipped",
    color: "bg-blue-100 text-blue-600",
    total: 3499,
    items: [
      {
        name: "Boho Floor Lamp",
        qty: 1,
        price: 3499,
        img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&q=80",
      },
    ],
  },
  {
    id: "#UM-4312",
    date: "24 Dec 2024",
    status: "Returned",
    color: "bg-red-100 text-red-600",
    total: 9198,
    items: [
      {
        name: "Rattan Accent Chair",
        qty: 1,
        price: 8499,
        img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80",
      },
      {
        name: "Linen Throw Pillow",
        qty: 1,
        price: 699,
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=80",
      },
    ],
  },
  {
    id: "#UM-4290",
    date: "18 Dec 2024",
    status: "Processing",
    color: "bg-yellow-100 text-yellow-700",
    total: 2199,
    items: [
      {
        name: "Matte Black Kettle",
        qty: 1,
        price: 2199,
        img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80",
      },
    ],
  },
];

const filters = ["All", "Processing", "Shipped", "Delivered", "Returned"];

// ── Small reusable order card ────────────────────────────
function OrderCard({ order, isOpen, onToggle }) {
  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 ${isOpen ? "border-[#C9B194]" : "border-[#ede5da]"}`}
    >
      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#fdf0e2] flex items-center justify-center text-lg shrink-0">
            📦
          </div>
          <div>
            <p className="text-[13.5px] font-semibold text-gray-800">
              {order.id}
            </p>
            <p className="text-[11px] text-gray-400">
              {order.date} · {order.items.length} item
              {order.items.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-[14px] font-bold text-gray-900">
            ₹{order.total.toLocaleString()}
          </p>
          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${order.color}`}
          >
            {order.status}
          </span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9B194"
            strokeWidth="2"
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Expanded details */}
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-5 pb-5 border-t border-[#f5ede0] pt-4 space-y-3">
          {/* Item list */}
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-[#fdf9f5] rounded-xl p-2.5 border border-[#f0e8df]"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover bg-[#fdf5ec] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-medium text-gray-800 truncate">
                  {item.name}
                </p>
                <p className="text-[11px] text-gray-400">Qty: {item.qty}</p>
              </div>
              <p className="text-[12.5px] font-semibold text-gray-900 shrink-0">
                ₹{item.price.toLocaleString()}
              </p>
            </div>
          ))}

          {/* Actions */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button className="text-[12px] bg-[#1a1a1a] hover:bg-[#C9B194] text-white font-medium px-4 py-2 rounded-xl transition-colors">
              Track Order
            </button>
            <button className="text-[12px] border border-[#ede5da] hover:border-[#C9B194] text-gray-600 hover:text-[#C9B194] font-medium px-4 py-2 rounded-xl transition-colors">
              Download Invoice
            </button>
            {order.status === "Delivered" && (
              <button className="text-[12px] border border-[#ede5da] hover:border-red-300 text-gray-600 hover:text-red-500 font-medium px-4 py-2 rounded-xl transition-colors">
                Return Item
              </button>
            )}
            {order.status === "Processing" && (
              <button className="text-[12px] border border-red-200 hover:bg-red-50 text-red-500 font-medium px-4 py-2 rounded-xl transition-colors">
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function MyOrders() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [openOrderId, setOpenOrderId] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = orders.filter((o) => {
    const matchFilter = activeFilter === "All" || o.status === activeFilter;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#fdf9f5] px-4 sm:px-8 lg:px-12 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-7">
          <p className="text-[11px] font-medium tracking-widest text-[#C9B194] uppercase mb-1">
            Your Account
          </p>
          <h1
            className="text-2xl sm:text-3xl font-bold text-gray-900"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            My Orders
          </h1>
        </div>

        {/* Search */}
        <div className="flex items-center bg-white border border-[#ede5da] rounded-full overflow-hidden mb-5 focus-within:border-[#C9B194] focus-within:ring-[3px] focus-within:ring-[#C9B19428] transition-all">
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
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID…"
            className="flex-1 bg-transparent outline-none border-none px-3 py-2.5 text-[13.5px] text-gray-800 placeholder-[#b0a090]"
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-200 ${
                activeFilter === f
                  ? "bg-[#C9B194] text-white border-[#C9B194]"
                  : "bg-white text-gray-600 border-[#ede5da] hover:border-[#C9B194] hover:text-[#C9B194]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Order list */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isOpen={openOrderId === order.id}
                onToggle={() =>
                  setOpenOrderId(openOrderId === order.id ? null : order.id)
                }
              />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-[#fdf0e2] rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-[14px] font-medium text-gray-700 mb-1">
              No orders found
            </p>
            <p className="text-[12px] text-gray-400">
              Try a different filter or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
