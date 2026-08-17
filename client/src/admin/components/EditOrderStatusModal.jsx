// admin/components/EditOrderStatusModal.jsx

import { useEffect, useState } from "react";
import { updateOrderStatus } from "../../services/orders";

const ORDER_STATUSES = [
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
];

const statusStyles = {
  Processing: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  Shipped: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  Delivered: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  Cancelled: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  Returned: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
};

export default function EditOrderStatusModal({ order, onClose, onSave }) {
  const [status, setStatus] = useState(order?.orderStatus || "Processing");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  if (!order) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) {
      setError("Please select an order status.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      // Update status in backend
      await updateOrderStatus(order._id, status);

      // Refresh orders in parent component
      if (onSave) {
        await onSave();
      }

      // Close modal
      onClose();
    } catch (err) {
      console.error("Failed to update order status:", err);

      setError(err.response?.data?.message || "Failed to update order status.");
    } finally {
      setSaving(false);
    }
  };

  const currentStyle = statusStyles[status] || statusStyles.Processing;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/45 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f5ede0]">
          <div>
            <p className="text-[10px] font-medium tracking-widest text-[#C9B194] uppercase mb-1">
              Order Management
            </p>

            <h2
              className="text-lg font-semibold text-gray-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Edit Order Status
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#ede5da] bg-[#f8f5f1] hover:bg-[#efe8de] text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 6 6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="px-5 py-5 space-y-5">
            {/* Order Information */}
            <div className="bg-[#fdf9f5] border border-[#ede5da] rounded-xl p-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                    Order ID
                  </p>

                  <p className="text-[12px] font-semibold text-gray-900 break-all">
                    {order._id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                    Customer
                  </p>

                  <p className="text-[12px] font-semibold text-gray-800">
                    {order.user?.name || "Unknown User"}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mb-2">
                Current Status
              </label>

              <span
                className={`inline-flex text-[11px] font-semibold px-3 py-1.5 rounded-full border ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border}`}
              >
                {status}
              </span>
            </div>

            {/* Status Select */}
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mb-2">
                Change Status
              </label>

              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setError("");
                }}
                disabled={saving}
                className="w-full bg-[#fdf9f5] border border-[#ede5da] rounded-xl px-4 py-3 text-[13px] text-gray-800 outline-none transition-all focus:border-[#C9B194] focus:ring-2 focus:ring-[#C9B19425] disabled:opacity-60"
              >
                {ORDER_STATUSES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Preview */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">
                New Status
              </p>

              <span
                className={`inline-flex text-[11px] font-semibold px-3 py-1.5 rounded-full border ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border}`}
              >
                {status}
              </span>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-[11px] text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-[#f5ede0] flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 px-5 py-2.5 border border-[#ede5da] hover:border-[#C9B194] text-gray-600 hover:text-[#C9B194] rounded-xl text-[13px] font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#C9B194] text-white rounded-xl text-[13px] font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
            >
              {saving ? (
                <>
                  <svg
                    className="animate-spin"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
