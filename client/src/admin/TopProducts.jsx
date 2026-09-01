import { useEffect, useState } from "react";

export default function TopProducts() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH ORDERS
  // =========================

  const fetchTopProducts = async () => {
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
      // PRODUCT SALES MAP
      // =========================

      const productMap = {};

      orders.forEach((order) => {
        // Ignore orders without order items
        if (!order.orderItems?.length) return;

        // Only use current year's orders
        if (order.createdAt) {
          const orderYear = new Date(order.createdAt).getFullYear();

          if (orderYear !== currentYear) return;
        }

        order.orderItems.forEach((item) => {
          // Use product ID as unique identifier
          const productId = item.product?._id || item.product || item.name;

          if (!productId) return;

          if (!productMap[productId]) {
            productMap[productId] = {
              id: productId,
              name: item.name,
              img: item.image,
              sales: 0,
              revenue: 0,
            };
          }

          // Total quantity sold
          productMap[productId].sales += Number(item.quantity) || 0;

          // Total revenue
          productMap[productId].revenue +=
            (Number(item.price) || 0) * (Number(item.quantity) || 0);
        });
      });

      // =========================
      // SORT PRODUCTS
      // =========================

      const sortedProducts = Object.values(productMap)
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);

      setTopProducts(sortedProducts);
    } catch (err) {
      console.error("Top Products Error:", err);

      setError(err.message || "Failed to load top products");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH ON MOUNT
  // =========================

  useEffect(() => {
    fetchTopProducts();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
        {/* Header */}

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold text-gray-900">
            Top Products
          </h3>
        </div>

        <div className="h-45 flex items-center justify-center">
          <p className="text-[11px] text-gray-400">Loading products...</p>
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
          <h3 className="text-[14px] font-semibold text-gray-900">
            Top Products
          </h3>
        </div>

        <div className="h-45 flex flex-col items-center justify-center">
          <p className="text-[11px] text-red-500">{error}</p>

          <button
            onClick={fetchTopProducts}
            className="mt-2 text-[10px] text-[#C9B194] font-medium hover:text-[#9a7f5e]"
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
        <h3 className="text-[14px] font-semibold text-gray-900">
          Top Products
        </h3>

        <button className="text-[11px] text-[#C9B194] font-medium hover:text-[#9a7f5e] transition-colors">
          View all →
        </button>
      </div>

      {/* =========================
          PRODUCT ROWS
      ========================= */}

      {topProducts.length > 0 ? (
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.id} className="flex items-center gap-2.5">
              {/* =========================
                  RANK
              ========================= */}

              <span className="text-[10px] font-bold text-gray-400 w-3 shrink-0">
                {i + 1}
              </span>

              {/* =========================
                  PRODUCT IMAGE
              ========================= */}

              <img
                src={p.img || "https://via.placeholder.com/60"}
                alt={p.name}
                className="w-8 h-8 rounded-lg object-cover bg-[#fdf5ec] shrink-0"
              />

              {/* =========================
                  NAME + SALES
              ========================= */}

              <div className="flex-1 min-w-0">
                <p className="text-[11.5px] font-medium text-gray-800 truncate">
                  {p.name}
                </p>

                <p className="text-[10px] text-gray-400">{p.sales} sold</p>
              </div>

              {/* =========================
                  REVENUE
              ========================= */}

              <p className="text-[11px] font-semibold text-gray-700 shrink-0">
                ₹{p.revenue.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-45 flex flex-col items-center justify-center">
          <p className="text-[11px] font-medium text-gray-600">
            No sales data available
          </p>

          <p className="text-[10px] text-gray-400 mt-1">
            Products will appear here after orders are placed.
          </p>
        </div>
      )}
    </div>
  );
}
