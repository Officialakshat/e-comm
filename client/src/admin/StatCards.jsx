// admin/StatCards.jsx

import { useEffect, useState } from "react";
import axios from "axios";

export default function StatCards() {
  const [stats, setStats] = useState([
    {
      label: "Total Orders",
      value: 0,
      icon: "🛍️",
      bg: "bg-[#f8f1ea]",
      change: "0%",
      up: true,
    },
    {
      label: "Total Revenue",
      value: 0,
      icon: "₹",
      bg: "bg-[#f5efe8]",
      change: "0%",
      up: true,
    },
    {
      label: "Pending Orders",
      value: 0,
      icon: "⏳",
      bg: "bg-[#faf5e9]",
      change: "0%",
      up: true,
    },
    {
      label: "Delivered Orders",
      value: 0,
      icon: "✓",
      bg: "bg-[#eef7f0]",
      change: "0%",
      up: true,
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data.success) return;

        const orders = response.data.orders;

        // -----------------------------
        // Current period
        // -----------------------------

        const now = new Date();

        // Current month start
        const currentMonthStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          1,
        );

        // Previous month start
        const previousMonthStart = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1,
        );

        // Previous month end
        const previousMonthEnd = new Date(
          now.getFullYear(),
          now.getMonth(),
          0,
          23,
          59,
          59,
        );

        // -----------------------------
        // Current month orders
        // -----------------------------

        const currentMonthOrders = orders.filter(
          (order) => new Date(order.createdAt) >= currentMonthStart,
        );

        // -----------------------------
        // Previous month orders
        // -----------------------------

        const previousMonthOrders = orders.filter((order) => {
          const date = new Date(order.createdAt);

          return date >= previousMonthStart && date <= previousMonthEnd;
        });

        // -----------------------------
        // Total Orders
        // -----------------------------

        const totalOrders = orders.length;

        const currentOrders = currentMonthOrders.length;
        const previousOrders = previousMonthOrders.length;

        const orderChange = calculateChange(currentOrders, previousOrders);

        // -----------------------------
        // Total Revenue
        // -----------------------------

        const totalRevenue = orders.reduce(
          (total, order) => total + Number(order.totalPrice || 0),
          0,
        );

        const currentRevenue = currentMonthOrders.reduce(
          (total, order) => total + Number(order.totalPrice || 0),
          0,
        );

        const previousRevenue = previousMonthOrders.reduce(
          (total, order) => total + Number(order.totalPrice || 0),
          0,
        );

        const revenueChange = calculateChange(currentRevenue, previousRevenue);

        // -----------------------------
        // Pending Orders
        // -----------------------------

        const pendingStatuses = [
          "Processing",
          "Confirmed",
          "Shipped",
          "Out for Delivery",
          "Return Requested",
        ];

        const pendingOrders = orders.filter((order) =>
          pendingStatuses.includes(order.orderStatus),
        ).length;

        const currentPendingOrders = currentMonthOrders.filter((order) =>
          pendingStatuses.includes(order.orderStatus),
        ).length;

        const previousPendingOrders = previousMonthOrders.filter((order) =>
          pendingStatuses.includes(order.orderStatus),
        ).length;

        const pendingChange = calculateChange(
          currentPendingOrders,
          previousPendingOrders,
        );

        // -----------------------------
        // Delivered Orders
        // -----------------------------

        const deliveredOrders = orders.filter(
          (order) => order.orderStatus === "Delivered",
        ).length;

        const currentDeliveredOrders = currentMonthOrders.filter(
          (order) => order.orderStatus === "Delivered",
        ).length;

        const previousDeliveredOrders = previousMonthOrders.filter(
          (order) => order.orderStatus === "Delivered",
        ).length;

        const deliveredChange = calculateChange(
          currentDeliveredOrders,
          previousDeliveredOrders,
        );

        // -----------------------------
        // Update cards
        // -----------------------------

        setStats([
          {
            label: "Total Orders",
            value: totalOrders.toLocaleString("en-IN"),
            icon: "🛍️",
            bg: "bg-[#f8f1ea]",
            change: orderChange.value,
            up: orderChange.up,
          },
          {
            label: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            icon: "₹",
            bg: "bg-[#f5efe8]",
            change: revenueChange.value,
            up: revenueChange.up,
          },
          {
            label: "Pending Orders",
            value: pendingOrders.toLocaleString("en-IN"),
            icon: "⏳",
            bg: "bg-[#faf5e9]",
            change: pendingChange.value,
            up: pendingChange.up,
          },
          {
            label: "Delivered Orders",
            value: deliveredOrders.toLocaleString("en-IN"),
            icon: "✓",
            bg: "bg-[#eef7f0]",
            change: deliveredChange.value,
            up: deliveredChange.up,
          },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
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
            {loading ? "..." : s.value}
          </p>

          <p className="text-[11px] text-gray-500 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ------------------------------------
// Calculate percentage change
// ------------------------------------

function calculateChange(current, previous) {
  if (previous === 0) {
    if (current === 0) {
      return {
        value: "0%",
        up: true,
      };
    }

    return {
      value: "100%",
      up: true,
    };
  }

  const change = ((current - previous) / previous) * 100;

  return {
    value: `${Math.abs(change).toFixed(1)}%`,
    up: change >= 0,
  };
}
