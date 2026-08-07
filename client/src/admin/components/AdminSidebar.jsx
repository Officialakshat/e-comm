// admin/AdminSidebar.jsx

import { NavLink } from "react-router-dom";
import { sidebarGroups } from "../../data/AdminData";

export default function AdminSidebar({
  collapsed,
  setCollapsed,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <aside
      className={`
fixed
lg:static
top-0
left-0
h-full
bg-[#1a1a1a]
flex
flex-col
z-50
transition-all
duration-300

${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}

${collapsed ? "w-16" : "w-64"}
`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-xl bg-[#C9B194] flex items-center justify-center shrink-0">
          <span
            className="text-white text-xs font-bold"
            style={{ fontFamily: "Georgia, serif" }}
          >
            U
          </span>
        </div>

        {!collapsed && (
          <span
            className="text-white font-bold text-[15px] truncate"
            style={{ fontFamily: "Georgia, serif" }}
          >
            UrbanMart
          </span>
        )}

        {/* Desktop Collapse Button */}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="hidden lg:flex ml-auto text-gray-500 hover:text-white transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {collapsed ? (
              <path d="M9 18l6-6-6-6" />
            ) : (
              <path d="M15 18l-6-6 6-6" />
            )}
          </svg>
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden ml-auto text-gray-400 hover:text-white"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-4">
        {sidebarGroups.map((group) => (
          <div key={group.section}>
            {!collapsed && (
              <p className="text-[9px] font-semibold text-gray-600 uppercase tracking-widest px-4 mb-1">
                {group.section}
              </p>
            )}

            {group.items.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-all duration-150 ${
                    isActive
                      ? "bg-[#C9B194]/20 text-[#C9B194] border-r-2 border-[#C9B194]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <span className="text-base shrink-0">{item.icon}</span>

                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#C9B194] flex items-center justify-center text-white text-sm font-bold">
            A
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium text-white truncate">
              Admin User
            </p>
            <p className="text-[10px] text-gray-500 truncate">Super Admin</p>
          </div>
        </div>
      )}
    </aside>
  );
}
