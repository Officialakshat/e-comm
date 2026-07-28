// admin/AdminHeader.jsx
import { useState } from "react";

export default function AdminHeader({ onSearch }) {
  const [query, setQuery] = useState("");
  const [showNotifs, setShowNotifs] = useState(false);

  const notifications = [
    {
      id: 1,
      text: "New order #UM-4533 received",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      text: "Low stock: Matte Black Kettle",
      time: "15 min ago",
      read: false,
    },
    {
      id: 3,
      text: "Sunita Yadav requested refund",
      time: "1 hr ago",
      read: true,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim());
  };

  return (
    <header className="h-14 bg-white border-b border-[#ede5da] flex items-center justify-between px-6 shrink-0 relative z-10">
      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-[#f8f5f1] border border-[#ede5da] rounded-full w-72 focus-within:border-[#C9B194] transition-all"
      >
        <svg
          className="ml-3 shrink-0 text-[#9a7f5e]"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search orders, products…"
          className="flex-1 bg-transparent outline-none border-none px-3 py-2 text-[13px] text-gray-800 placeholder-[#b0a090]"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              if (onSearch) onSearch("");
            }}
            className="mr-2 text-gray-400 hover:text-gray-600 text-lg leading-none"
          >
            ×
          </button>
        )}
      </form>

      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs((v) => !v)}
            className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f8f5f1] transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#C9B194] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {notifications.filter((n) => !n.read).length}
            </span>
          </button>

          {/* Notification dropdown */}
          {showNotifs && (
            <div className="absolute right-0 top-10 w-72 bg-white border border-[#ede5da] rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#f5ede0] flex items-center justify-between">
                <p className="text-[13px] font-semibold text-gray-800">
                  Notifications
                </p>
                <button
                  onClick={() => setShowNotifs(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  ×
                </button>
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-[#f5ede0] last:border-0 ${!n.read ? "bg-[#fdf9f5]" : ""}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? "bg-[#C9B194]" : "bg-gray-200"}`}
                  />
                  <div>
                    <p className="text-[12px] font-medium text-gray-800">
                      {n.text}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-[#ede5da] mx-1" />

        {/* Admin profile */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-[#C9B194] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">A</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[12px] font-semibold text-gray-800 leading-none">
              Admin User
            </p>
            <p className="text-[10px] text-gray-500 leading-none mt-0.5">
              Super Admin
            </p>
          </div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9a7f5e"
            strokeWidth="2"
            className="group-hover:rotate-180 transition-transform duration-200"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </header>
  );
}
