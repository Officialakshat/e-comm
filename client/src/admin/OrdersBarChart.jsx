// admin/OrdersBarChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueData } from "../data/adminData";

export default function OrdersBarChart() {
  return (
    <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
        Orders / Month
      </h3>
      <p className="text-[11px] text-gray-400 mb-4">This year</p>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={revenueData}
          margin={{ top: 0, right: 0, bottom: 0, left: -28 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0e8df"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 9, fill: "#9a8070" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fill: "#9a8070" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "0.5px solid #ede5da",
              borderRadius: 10,
              fontSize: 11,
            }}
            formatter={(v) => [v, "Orders"]}
          />
          <Bar
            dataKey="orders"
            fill="#C9B194"
            radius={[4, 4, 0, 0]}
            maxBarSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
