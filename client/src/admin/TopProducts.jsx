// admin/TopProducts.jsx
import { topProducts } from "../data/adminData";

export default function TopProducts() {
  return (
    <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold text-gray-900">
          Top Products
        </h3>
        <button className="text-[11px] text-[#C9B194] font-medium hover:text-[#9a7f5e] transition-colors">
          View all →
        </button>
      </div>

      {/* Product rows */}
      <div className="space-y-3">
        {topProducts.map((p, i) => (
          <div key={p.name} className="flex items-center gap-2.5">
            {/* Rank number */}
            <span className="text-[10px] font-bold text-gray-400 w-3 shrink-0">
              {i + 1}
            </span>

            {/* Product image */}
            <img
              src={p.img}
              alt={p.name}
              className="w-8 h-8 rounded-lg object-cover bg-[#fdf5ec] shrink-0"
            />

            {/* Name + sold count */}
            <div className="flex-1 min-w-0">
              <p className="text-[11.5px] font-medium text-gray-800 truncate">
                {p.name}
              </p>
              <p className="text-[10px] text-gray-400">{p.sales} sold</p>
            </div>

            {/* Revenue */}
            <p className="text-[11px] font-semibold text-gray-700 shrink-0">
              ₹{(p.revenue / 1000).toFixed(0)}k
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
