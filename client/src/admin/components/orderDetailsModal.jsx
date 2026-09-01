// admin/orders/OrderDetailsModal.jsx

import { useEffect, useRef } from "react";
import { statusStyle, paymentStyle } from "../../data/ordersData";

// ─────────────────────────────────────────────
// Format date
// ─────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return "-";

  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────
function Section({ title, icon, children }) {
  return (
    <div className="bg-[#fdf9f5] rounded-2xl border border-[#ede5da] p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">{icon}</span>

        <h3 className="text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export default function OrderDetailsModal({ order, onClose }) {
  const overlayRef = useRef(null);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Don't render if no order
  if (!order) return null;

  // ─────────────────────────────────────────────
  // Backend → actual order data
  // ─────────────────────────────────────────────

  const customerName = order.user?.name || "Unknown User";
  const customerEmail = order.user?.email || "-";

  const orderItems = order.orderItems || [];

  const orderStatus = order.orderStatus || "Processing";
  const paymentMethod = order.paymentMethod || "N/A";

  const shippingAddress = order.shippingAddress || {};

  // Use backend total instead of calculating again
  const itemsPrice = Number(order.itemsPrice || 0);
  const shippingPrice = Number(order.shippingPrice || 0);
  const totalPrice = Number(order.totalPrice || 0);

  // Status styling
  const statusClass = statusStyle?.[orderStatus] || "bg-gray-100 text-gray-600";

  // Payment styling
  const paymentClass =
    paymentStyle?.[paymentMethod] || "bg-gray-100 text-gray-600";

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
      className="fixed inset-0 z-100 flex items-center justify-center px-4 py-6 bg-black/45 backdrop-blur-[2px]"
    >
      {/* ─────────────────────────────────────
          MODAL
      ───────────────────────────────────── */}
      <div className="w-full max-w-3xl max-h-[92vh] bg-white rounded-[20px] shadow-2xl overflow-hidden flex flex-col">
        {/* ─────────────────────────────────────
            HEADER
        ───────────────────────────────────── */}
        <div className="shrink-0 bg-white flex items-center justify-between px-5 py-4 border-b border-[#f5ede0]">
          <div className="min-w-0">
            <h2
              className="text-[16px] font-semibold text-gray-900"
              style={{ fontFamily: "Georgia,serif" }}
            >
              Order Details
            </h2>

            <p className="text-[11px] text-gray-400 mt-0.5 truncate">
              #{order._id} · {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Status */}
            <span
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusClass}`}
            >
              {orderStatus}
            </span>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#ede5da] bg-[#f8f5f1] hover:bg-[#efe8de] text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────
            BODY
        ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {/* ─────────────────────────────────
              CUSTOMER INFORMATION
          ───────────────────────────────── */}
          <Section title="Customer Information" icon="👤">
            <div className="flex items-center gap-3 mb-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-[#C9B194]/20 text-[#C9B194] text-sm font-bold flex items-center justify-center shrink-0">
                {customerName.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-gray-900">
                  {customerName}
                </p>

                <p className="text-[11px] text-gray-400 truncate">
                  {customerEmail}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Customer ID */}
              <div className="bg-white rounded-xl px-3 py-2 border border-[#f0e8df]">
                <p className="text-[9px] text-[#C9B194] font-medium uppercase tracking-widest mb-0.5">
                  Customer ID
                </p>

                <p className="text-[11px] font-medium text-gray-800 truncate">
                  {order.user?._id || "-"}
                </p>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-xl px-3 py-2 border border-[#f0e8df]">
                <p className="text-[9px] text-[#C9B194] font-medium uppercase tracking-widest mb-1">
                  Payment
                </p>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${paymentClass}`}
                >
                  {paymentMethod}
                </span>
              </div>
            </div>
          </Section>

          {/* ─────────────────────────────────
              SHIPPING ADDRESS
          ───────────────────────────────── */}
          <Section title="Shipping Address" icon="📍">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white rounded-xl border border-[#f0e8df] flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9B194"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <div className="min-w-0">
                <p className="text-[13px] font-medium text-gray-800">
                  {shippingAddress.address || "-"}
                </p>

                <p className="text-[12px] text-gray-500 mt-0.5">
                  {shippingAddress.city || "-"},{" "}
                  {shippingAddress.postalCode || "-"}
                </p>

                <p className="text-[12px] text-gray-500 mt-0.5">
                  {shippingAddress.country || "-"}
                </p>
              </div>
            </div>
          </Section>

          {/* ─────────────────────────────────
              ORDERED PRODUCTS
          ───────────────────────────────── */}
          <Section title="Ordered Products" icon="📦">
            <div className="space-y-2.5">
              {orderItems.length === 0 ? (
                <p className="text-sm text-gray-400">No products found.</p>
              ) : (
                orderItems.map((item, index) => {
                  const price = Number(item.price || 0);
                  const quantity = Number(item.quantity || 0);
                  const itemTotal = price * quantity;

                  return (
                    <div
                      key={item._id || index}
                      className="flex items-center gap-3 bg-white rounded-xl p-2.5 border border-[#f0e8df]"
                    >
                      {/* Product image */}
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#fdf5ec] shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Product name */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-medium text-gray-800 truncate">
                          {item.name}
                        </p>

                        <p className="text-[10px] text-gray-400">Product</p>
                      </div>

                      {/* Price */}
                      <div className="text-center shrink-0 min-w-15">
                        <p className="text-[10px] text-gray-400">Price</p>

                        <p className="text-[12px] font-semibold text-gray-900">
                          ₹{price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="text-center shrink-0 min-w-9">
                        <p className="text-[10px] text-gray-400">Qty</p>

                        <p className="text-[12px] font-semibold text-gray-900">
                          ×{quantity}
                        </p>
                      </div>

                      {/* Total */}
                      <div className="text-right shrink-0 min-w-18">
                        <p className="text-[10px] text-gray-400">Total</p>

                        <p className="text-[13px] font-bold text-gray-900">
                          ₹{itemTotal.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* ─────────────────────────────
                PRICE SUMMARY
            ───────────────────────────── */}
            <div className="mt-3 bg-white rounded-xl border border-[#f0e8df] overflow-hidden">
              {/* Items price */}
              <div className="flex justify-between px-4 py-2.5 border-b border-[#f5ede0]">
                <span className="text-[12px] text-gray-500">Items Price</span>

                <span className="text-[12px] font-medium text-gray-900">
                  ₹{itemsPrice.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between px-4 py-2.5 border-b border-[#f5ede0]">
                <span className="text-[12px] text-gray-500">Delivery Fee</span>

                <span
                  className={`text-[12px] font-medium ${
                    shippingPrice === 0 ? "text-green-600" : "text-gray-900"
                  }`}
                >
                  {shippingPrice === 0
                    ? "Free"
                    : `₹${shippingPrice.toLocaleString("en-IN")}`}
                </span>
              </div>

              {/* Grand total */}
              <div className="flex justify-between px-4 py-3 bg-[#fdf9f5]">
                <span className="text-[13px] font-semibold text-gray-800">
                  Grand Total
                </span>

                <span className="text-[14px] font-bold text-gray-900">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </Section>

          {/* ─────────────────────────────────
              PAYMENT / DELIVERY INFORMATION
          ───────────────────────────────── */}
          <Section title="Order Status" icon="📋">
            <div className="grid grid-cols-2 gap-3">
              {/* Payment status */}
              <div className="bg-white rounded-xl p-3 border border-[#f0e8df]">
                <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                  Payment Status
                </p>

                <p
                  className={`text-[12px] font-semibold ${
                    order.isPaid ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </p>

                {order.paidAt && (
                  <p className="text-[10px] text-gray-400 mt-1">
                    {formatDate(order.paidAt)}
                  </p>
                )}
              </div>

              {/* Delivery status */}
              <div className="bg-white rounded-xl p-3 border border-[#f0e8df]">
                <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                  Delivery Status
                </p>

                <p
                  className={`text-[12px] font-semibold ${
                    order.isDelivered ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Not Delivered"}
                </p>

                {order.deliveredAt && (
                  <p className="text-[10px] text-gray-400 mt-1">
                    {formatDate(order.deliveredAt)}
                  </p>
                )}
              </div>
            </div>
          </Section>
        </div>

        {/* ─────────────────────────────────────
            FOOTER
        ───────────────────────────────────── */}
        <div className="shrink-0 bg-white border-t border-[#f5ede0] px-5 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-[#ede5da] hover:border-[#C9B194] text-gray-600 hover:text-[#C9B194] text-[13px] font-medium py-2.5 rounded-xl transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              alert("Invoice download will be added in the next step.");
            }}
            className="flex-1 bg-[#1a1a1a] hover:bg-[#C9B194] text-white text-[13px] font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
