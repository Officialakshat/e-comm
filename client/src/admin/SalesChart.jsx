import { useEffect, useState } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart() {
  // Toggle between Revenue and Orders view
  const [chartType, setChartType] = useState("Revenue");

  // Chart data
  const [chartData, setChartData] = useState([]);

  // Loading / error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH ORDERS
  // =========================

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      const orders = data.orders || [];

      // =========================
      // CURRENT YEAR
      // =========================

      const currentYear = new Date().getFullYear();

      // =========================
      // MONTHS
      // =========================

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // =========================
      // CREATE INITIAL DATA
      // =========================

      const monthlyData = months.map((month) => ({
        month,
        revenue: 0,
        orders: 0,
      }));

      // =========================
      // CALCULATE SALES
      // =========================

      orders.forEach((order) => {
        if (!order.createdAt) return;

        const orderDate = new Date(order.createdAt);

        // Only current year
        if (orderDate.getFullYear() !== currentYear) {
          return;
        }

        const monthIndex = orderDate.getMonth();

        // Count order
        monthlyData[monthIndex].orders += 1;

        // Add revenue
        monthlyData[monthIndex].revenue += Number(order.totalPrice) || 0;
      });

      setChartData(monthlyData);
    } catch (err) {
      console.error("Sales chart error:", err);

      setError(err.message || "Failed to load sales data");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH ON MOUNT
  // =========================

  useEffect(() => {
    fetchSalesData();
  }, []);

  // =========================
  // CALCULATE TOTALS
  // =========================

  const totalRevenue = chartData.reduce(
    (total, item) => total + item.revenue,
    0,
  );

  const totalOrders = chartData.reduce((total, item) => total + item.orders, 0);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[14px] font-semibold text-gray-900">
              Sales Overview
            </h3>

            <p className="text-[11px] text-gray-400">Full year performance</p>
          </div>
        </div>

        <div className="h-50 flex items-center justify-center">
          <p className="text-[11px] text-gray-400">Loading sales data...</p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[14px] font-semibold text-gray-900">
              Sales Overview
            </h3>

            <p className="text-[11px] text-gray-400">Full year performance</p>
          </div>
        </div>

        <div className="h-50 flex flex-col items-center justify-center">
          <p className="text-[11px] text-red-500">{error}</p>

          <button
            onClick={fetchSalesData}
            className="mt-2 text-[10px] text-[#C9B194] hover:text-[#9a7f5e]"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[14px] font-semibold text-gray-900">
            Sales Overview
          </h3>

          <p className="text-[11px] text-gray-400">Full year performance</p>
        </div>

        {/* =========================
            TOGGLE PILLS
        ========================= */}

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

      {/* =========================
          SUMMARY
      ========================= */}

      <div className="flex items-center gap-5 mb-2">
        <div>
          <p className="text-[9px] text-gray-400">
            {chartType === "Revenue" ? "Total Revenue" : "Total Orders"}
          </p>

          <p className="text-[15px] font-bold text-gray-900">
            {chartType === "Revenue"
              ? `₹${totalRevenue.toLocaleString("en-IN")}`
              : totalOrders.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* =========================
          CHART
      ========================= */}

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={chartData}
          margin={{
            top: 4,
            right: 4,
            bottom: 0,
            left: -20,
          }}
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
            tick={{
              fontSize: 10,
              fill: "#9a8070",
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fontSize: 10,
              fill: "#9a8070",
            }}
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
            formatter={(value) =>
              chartType === "Revenue"
                ? [`₹${Number(value).toLocaleString("en-IN")}`, "Revenue"]
                : [value, "Orders"]
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
