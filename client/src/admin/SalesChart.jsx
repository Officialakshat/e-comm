// admin/SalesChart.jsx
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueData } from "../data/adminData";

export default function SalesChart() {
  // Toggle between Revenue and Orders view
  const [chartType, setChartType] = useState("Revenue");

  return (
    <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[14px] font-semibold text-gray-900">
            Sales Overview
          </h3>
          <p className="text-[11px] text-gray-400">Full year performance</p>
        </div>

        {/* Toggle pills */}
        <div className="flex gap-1 bg-[#f8f5f1] rounded-xl p-1">
          {["Revenue", "Orders"].map((t) => (
            <button
              key={t}
              onClick={() => setChartType(t)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                chartType === t
                  ? "bg-[#C9B194] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={revenueData}
          margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C9B194" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#C9B194" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0e8df" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: "#9a8070" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#9a8070" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "0.5px solid #ede5da",
              borderRadius: 10,
              fontSize: 12,
            }}
            formatter={(v) =>
              chartType === "Revenue"
                ? [`₹${v.toLocaleString()}`, "Revenue"]
                : [v, "Orders"]
            }
          />
          <Area
            type="monotone"
            dataKey={chartType === "Revenue" ? "revenue" : "orders"}
            stroke="#C9B194"
            strokeWidth={2.5}
            fill="url(#areaGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
