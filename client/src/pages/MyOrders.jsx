import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orders";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getMyOrders();

        // Supports either an array response or an object containing orders
        const orderList = Array.isArray(response)
          ? response
          : response.orders || response.data || [];

        setOrders(orderList);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf9f5]">
        Loading your orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#fdf9f5]">
        <p className="text-red-600">{error}</p>
        <Link to="/" className="text-[#9a7f5e] underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf9f5] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500 mt-2">
            View and track your UrbanMart purchases.
          </p>
        </div>

        {/* Empty Orders */}
        {orders.length === 0 ? (
          <div className="bg-white border border-[#ede5da] rounded-xl p-10 text-center">
            <div className="text-5xl mb-4">📦</div>

            <h2 className="text-xl font-semibold text-gray-800">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/"
              className="inline-block bg-[#C9B194] hover:bg-[#9a7f5e] text-white px-6 py-3 rounded-lg transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-[#ede5da] rounded-xl p-5 md:p-6"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#ede5da] pb-4">
                  <div>
                    <p className="text-xs text-gray-500">ORDER ID</p>

                    <p className="font-semibold text-gray-800 break-all">
                      {order._id}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Ordered on {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(order.orderStatus)}`}
                  >
                    {order.orderStatus || "Processing"}
                  </span>
                </div>

                {/* Product List */}
                <div className="py-4 space-y-4">
                  {order.orderItems?.map((item, index) => (
                    <div
                      key={item._id || `${item.product}-${index}`}
                      className="flex items-center gap-4"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border border-[#ede5da]"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-[#f8f6f3] rounded-lg flex items-center justify-center">
                          📦
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-medium text-gray-800">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="border-t border-[#ede5da] pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Payment: {order.paymentMethod}
                    </p>

                    <p className="text-lg font-bold text-gray-900 mt-1">
                      Total: ₹
                      {Number(order.totalPrice || 0).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <Link
                    to={`/order-confirmation/${order._id}`}
                    className="text-center border border-[#C9B194] text-[#9a7f5e] hover:bg-[#C9B194] hover:text-white px-5 py-2.5 rounded-lg transition"
                  >
                    View Order Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
