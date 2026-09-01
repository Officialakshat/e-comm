import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth;
  const navigate = useNavigate();

  // Status styles
  const statusStyle = {
    Processing: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    "Out for Delivery": "bg-orange-100 text-orange-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    "Return Requested": "bg-pink-100 text-pink-700",
    Returned: "bg-gray-100 text-gray-700",
  };

  // Get all orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          // Sort newest orders first
          const sortedOrders = [...response.data.orders].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );

          // Show only 5 recent orders
          setOrders(sortedOrders.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching recent orders:", error);

        setError(
          error.response?.data?.message || "Failed to load recent orders",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Get customer initials
  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold text-gray-900">
          Recent Orders
        </h3>

        <button
          onClick={() => navigate("/admin/orders")}
          className="text-[11px] text-[#C9B194] font-medium hover:text-[#9a7f5e] transition-colors"
        >
          View all →
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-8 text-center">
          <p className="text-[12px] text-gray-400">Loading orders...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="py-8 text-center">
          <p className="text-[12px] text-red-500">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && orders.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-[12px] text-gray-400">No orders found.</p>
        </div>
      )}

      {/* Order rows */}
      {!loading && !error && orders.length > 0 && (
        <div className="space-y-1.5">
          {orders.map((order) => {
            // First product in the order
            const firstItem = order.orderItems?.[0];

            const customerName = order.user?.name || "Unknown Customer";

            const productName = firstItem?.name || "Product";

            const status = order.orderStatus || "Processing";

            return (
              <div
                key={order._id}
                onClick={() => navigate(`/admin/orders/${order._id}`)}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#fdf9f5] transition-colors cursor-pointer"
              >
                {/* Customer avatar */}
                <div className="w-8 h-8 rounded-full bg-[#C9B194]/20 text-[#C9B194] text-[10px] font-bold flex items-center justify-center shrink-0">
                  {getInitials(customerName)}
                </div>

                {/* Customer + product */}
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-800 truncate">
                    {customerName}
                  </p>

                  <p className="text-[10px] text-gray-400 truncate">
                    {productName}
                    {order.orderItems?.length > 1 &&
                      ` + ${order.orderItems.length - 1} more`}
                  </p>

                  <p className="text-[9px] text-gray-300 mt-0.5">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                {/* Amount */}
                <p className="text-[12px] font-bold text-gray-900 shrink-0">
                  ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}
                </p>

                {/* Status */}
                <span
                  className={`text-[9px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                    statusStyle[status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
