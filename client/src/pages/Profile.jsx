import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Profile({ user, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const userMenu = [
    { label: "My Profile", icon: "👤", path: "/profile" },
    { label: "My Orders", icon: "📦", path: "/profile" },
    { label: "Wishlist", icon: "❤️", path: "/wishlist" },
    { label: "Help Center", icon: "💬", path: "/help" },
  ];

  const adminMenu = [
    { label: "Dashboard", icon: "🛡️", path: "/admin" },
    { label: "Manage Orders", icon: "📦", path: "/admin" },
    { label: "Manage Products", icon: "🏷️", path: "/admin" },
    { label: "Help Center", icon: "💬", path: "/help" },
  ];

  const menu = user.role === "admin" ? adminMenu : userMenu;

  const go = (path) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = () => {
    logout(); // Clear tokens and update context state
    onClose(); // Close the dropdown view
    navigate("/"); // Send them home
  };

  return (
    <div className="absolute right-0 top-12 w-60 bg-white border border-[#ede5da] rounded-2xl shadow-xl shadow-[#C9B19420] z-50 overflow-hidden animate-[fadeUp_0.2s_ease]">
      {/* User info */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#fdf9f5] border-b border-[#ede5da]">
        <div className="w-9 h-9 rounded-xl bg-[#C9B194] flex items-center justify-center shrink-0">
          <span
            className="text-white text-sm font-bold"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {user.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "U"}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-gray-900 truncate">
            {user.name}
          </p>
          <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
        </div>
        <span
          className={`shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full ${
            user.role === "admin"
              ? "bg-[#C9B194] text-white"
              : "bg-[#fdf0e2] text-[#9a7f5e]"
          }`}
        >
          {user.role === "admin" ? "ADMIN" : "PRO"}
        </span>
      </div>

      {/* Menu items */}
      <div className="py-1.5">
        {menu.map((item) => (
          <button
            key={item.label}
            onClick={() => go(item.path)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#fdf5ec] hover:text-gray-900 transition-colors text-left"
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Sign out */}
      <div className="border-t border-[#ede5da] py-1.5">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors text-left"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}
