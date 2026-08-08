// admin/components/OrdersTable.jsx

function formatDate(iso) {
  if (!iso) return "-";

  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const statusStyle = {
  Processing: "bg-yellow-50 text-yellow-700",
  Confirmed: "bg-blue-50 text-blue-700",
  Shipped: "bg-purple-50 text-purple-700",
  Delivered: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-700",
  Returned: "bg-orange-50 text-orange-700",
};

const paymentStyle = {
  COD: "bg-gray-100 text-gray-700",
  Razorpay: "bg-blue-50 text-blue-700",
  Paid: "bg-green-50 text-green-700",
};

export default function OrdersTable({ orders, onView, onStatusEdit }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#ede5da] p-10 text-center">
        <p className="text-sm font-medium text-gray-700">No orders found</p>

        <p className="text-xs text-gray-400 mt-1">
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#ede5da] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* Header */}
          <thead className="bg-[#fdf9f5] border-b border-[#f5ede0]">
            <tr>
              {[
                "Order ID",
                "Customer",
                "Items",
                "Total",
                "Payment",
                "Status",
                "Date",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-5 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-[#f5ede0]">
            {orders.map((order) => {
              const totalItems = order.orderItems?.reduce(
                (sum, item) => sum + Number(item.quantity || 0),
                0,
              );

              const customerName = order.user?.name || "Unknown User";
              const customerEmail = order.user?.email || "-";

              const customerInitial = customerName.charAt(0).toUpperCase();

              return (
                <tr
                  key={order._id}
                  className="group hover:bg-[#fdf9f5] transition-colors"
                >
                  {/* Order ID */}
                  <td className="px-5 py-3.5">
                    <span className="text-[11px] font-bold text-gray-900">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#C9B194]/20 text-[#C9B194] text-[10px] font-bold flex items-center justify-center shrink-0">
                        {customerInitial}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                          {customerName}
                        </p>

                        <p className="text-[10px] text-gray-400 truncate max-w-[140px]">
                          {customerEmail}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Items */}
                  <td className="px-5 py-3.5">
                    <span className="text-[12px] font-medium text-gray-700">
                      {totalItems} item{totalItems !== 1 ? "s" : ""}
                    </span>
                  </td>

                  {/* Total */}
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] font-bold text-gray-900">
                      ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                        paymentStyle[order.paymentMethod] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.paymentMethod || "Unknown"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                        statusStyle[order.orderStatus] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.orderStatus || "Processing"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3.5">
                    <span className="text-[11px] text-gray-400 whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onView(order)}
                        className="text-[11px] text-[#C9B194] hover:text-[#9a7f5e] font-medium transition-colors"
                      >
                        View
                      </button>

                      <span className="text-gray-200">|</span>

                      <button
                        type="button"
                        onClick={() => onStatusEdit(order)}
                        className="text-[11px] text-gray-500 hover:text-gray-800 font-medium transition-colors"
                      >
                        Edit status
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
