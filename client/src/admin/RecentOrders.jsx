// admin/RecentOrders.jsx
import { recentOrders, statusStyle } from "../data/adminData";

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold text-gray-900">
          Recent Orders
        </h3>
        <button className="text-[11px] text-[#C9B194] font-medium hover:text-[#9a7f5e] transition-colors">
          View all →
        </button>
      </div>

      {/* Order rows */}
      <div className="space-y-1.5">
        {recentOrders.map((o) => (
          <div
            key={o.id}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#fdf9f5] transition-colors"
          >
            {/* Customer initials avatar */}
            <div className="w-8 h-8 rounded-full bg-[#C9B194]/20 text-[#C9B194] text-[10px] font-bold flex items-center justify-center shrink-0">
              {o.avatar}
            </div>

            {/* Customer name + product */}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-gray-800 truncate">
                {o.customer}
              </p>
              <p className="text-[10px] text-gray-400 truncate">{o.product}</p>
            </div>

            {/* Amount */}
            <p className="text-[12px] font-bold text-gray-900 shrink-0">
              ₹{o.amount.toLocaleString()}
            </p>

            {/* Status badge */}
            <span
              className={`text-[9px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusStyle[o.status]}`}
            >
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
