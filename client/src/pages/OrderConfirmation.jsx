import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../services/orders";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

function OrderConfirmation() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        const data = await getOrderById(id);

        setOrder(data.order);
      } catch (err) {
        console.error("Order fetch error:", err);

        setError(
          err.response?.data?.message || "Unable to load order details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdf9f5] flex items-center justify-center">
        <p className="text-gray-500">Loading your order...</p>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#fdf9f5] flex flex-col items-center justify-center px-4">
        <h1 className="text-xl font-semibold text-gray-900">Order Not Found</h1>

        <p className="mt-2 text-sm text-gray-500">
          {error || "We could not find this order."}
        </p>

        <Link
          to="/productsListing"
          className="mt-5 rounded-lg bg-[#C9B194] px-6 py-2 text-white"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdf9f5] px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Success Message */}
        <div className="rounded-2xl border border-[#ede5da] bg-white p-6 text-center sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
            ✓
          </div>

          <h1
            className="mt-5 text-3xl font-bold text-gray-900"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Thank you for shopping with UrbanMart. Your order has been received.
          </p>

          <p className="mt-5 text-sm text-gray-600">
            Order ID:
            <span className="ml-2 font-semibold text-gray-900">
              {order._id}
            </span>
          </p>

          <div className="mt-6 inline-block rounded-lg bg-[#fdf9f5] px-5 py-3">
            <p className="text-xs text-gray-500">Order Status</p>

            <p className="mt-1 font-semibold text-[#9a7f5e]">
              {order.orderStatus}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-7 rounded-2xl border border-[#ede5da] bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Order Details
          </h2>

          <div className="space-y-5">
            {order.orderItems.map((item, index) => (
              <div
                key={item._id || index}
                className="flex items-center gap-4 border-b border-[#ede5da] pb-4 last:border-0"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#f7f5f2]">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full rounded-lg object-contain"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-semibold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3 border-t border-[#ede5da] pt-5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(order.itemsPrice)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{formatPrice(order.shippingPrice)}</span>
            </div>

            <div className="flex justify-between text-base font-bold text-gray-900">
              <span>Total</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="mt-7 rounded-2xl border border-[#ede5da] bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Delivery Information
          </h2>

          <p className="text-sm font-medium text-gray-900">
            {order.customerName}
          </p>

          <p className="mt-1 text-sm text-gray-600">{order.customerPhone}</p>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mt-4 text-sm text-gray-600">
            Payment Method:{" "}
            <span className="font-medium text-gray-900">
              {order.paymentMethod}
            </span>
          </p>
        </div>

        <div className="mt-7 text-center">
          <Link
            to="/productsListing"
            className="inline-block rounded-xl bg-[#1a1a1a] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#C9B194]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderConfirmation;
