// admin/Order.jsx

import { useEffect, useState } from "react";
import OrdersTable from "./components/OrdersTable";
import { getAllOrders } from "../services/orders";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllOrders();

      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // View order
  const handleViewOrder = (order) => {
    console.log("View Order:", order);

    // For now, just show the selected order
    alert(`Order ID: ${order._id}`);
  };

  // Edit order status
  const handleStatusEdit = (order) => {
    console.log("Edit Status:", order);

    // We'll implement the status modal next
    alert(`Current status: ${order.orderStatus}`);
  };

  // Loading
  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Loading Orders...
        </h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>

        <button
          onClick={fetchOrders}
          className="mt-3 px-4 py-2 bg-black text-white rounded-lg text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-[11px] font-medium tracking-widest text-[#C9B194] uppercase mb-1">
            Admin · Orders
          </p>

          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        </div>

        <div className="text-sm text-gray-500">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Orders Table */}
      <OrdersTable
        orders={orders}
        onView={handleViewOrder}
        onStatusEdit={handleStatusEdit}
      />
    </div>
  );
}
