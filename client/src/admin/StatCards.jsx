// admin/StatCards.jsx

import { statCards } from "../data/AdminData";

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-2xl border border-[#ede5da] p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
          {/* Icon + change badge */}
          <div className="flex items-center justify-between mb-3">
            <div
              className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-xl`}
            >
              {s.icon}
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                s.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
              }`}
            >
              {s.up ? "↑" : "↓"} {s.change}
            </span>
          </div>

          {/* Value + label */}
          <p className="text-[22px] font-bold text-gray-900 leading-none">
            {s.value}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
