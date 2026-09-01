import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({ onSearch }) {
  const [query, setQuery] = useState("");
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

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

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(query.trim());
    }
  };

  // Logout
  const handleLogout = () => {
    setShowProfile(false);

    logout();

    navigate("/login");
  };

  // Back to Store
  const handleBackToStore = () => {
    setShowProfile(false);

    navigate("/");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifs(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-14 bg-white border-b border-[#ede5da] flex items-center justify-between px-6 shrink-0 relative z-10">
      {/* ================= SEARCH ================= */}
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

              if (onSearch) {
                onSearch("");
              }
            }}
            className="mr-2 text-gray-400 hover:text-gray-600 text-lg leading-none"
          >
            ×
          </button>
        )}
      </form>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex items-center gap-2">
        {/* ================= NOTIFICATIONS ================= */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setShowNotifs((v) => !v);
              setShowProfile(false);
            }}
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
                  className={`flex items-start gap-3 px-4 py-3 border-b border-[#f5ede0] last:border-0 ${
                    !n.read ? "bg-[#fdf9f5]" : ""
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      !n.read ? "bg-[#C9B194]" : "bg-gray-200"
                    }`}
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

        {/* ================= ADMIN PROFILE ================= */}
        <div className="relative" ref={profileRef}>
          {/* Profile Button */}
          <button
            onClick={() => {
              setShowProfile((v) => !v);
              setShowNotifs(false);
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-[#C9B194] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-[12px] font-semibold text-gray-800 leading-none">
                {user?.name || "Admin"}
              </p>

              <p className="text-[10px] text-gray-500 leading-none mt-0.5 capitalize">
                {user?.role || "Admin"}
              </p>
            </div>

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9a7f5e"
              strokeWidth="2"
              className={`transition-transform duration-200 ${
                showProfile ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* ================= PROFILE DROPDOWN ================= */}
          {showProfile && (
            <div className="absolute right-0 top-11 w-64 bg-white border border-[#ede5da] rounded-2xl shadow-xl z-50 overflow-hidden">
              {/* Profile Info */}
              <div className="px-4 py-4 bg-[#fdf9f5] border-b border-[#f5ede0]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9B194] flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user?.name || "Admin"}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || "admin@example.com"}
                    </p>

                    <span className="inline-block mt-1 text-[9px] uppercase font-semibold tracking-wide text-[#9a7f5e]">
                      {user?.role || "Admin"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {/* Profile */}
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/admin/profile");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f8f5f1] transition-colors text-left"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
                  </svg>

                  <span className="text-[12px] font-medium text-gray-700">
                    My Profile
                  </span>
                </button>

                {/* Settings */}
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/admin/settings");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f8f5f1] transition-colors text-left"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.6v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6v-2.6h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.6v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2.6h-.1a1.7 1.7 0 0 0-1.6 1Z" />
                  </svg>

                  <span className="text-[12px] font-medium text-gray-700">
                    Settings
                  </span>
                </button>

                <div className="my-1 border-t border-[#f5ede0]" />

                {/* Back to Store */}
                <button
                  onClick={handleBackToStore}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f8f5f1] transition-colors text-left"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="2"
                  >
                    <path d="M19 12H5" />
                    <path d="m12 19-7-7 7-7" />
                  </svg>

                  <span className="text-[12px] font-medium text-gray-700">
                    Back to Store
                  </span>
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-left"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>

                  <span className="text-[12px] font-medium text-red-600">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
