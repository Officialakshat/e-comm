export default function ProductsTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#ede5da] p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-[#f8f5f1] flex items-center justify-center mx-auto mb-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9B194"
            strokeWidth="1.8"
          >
            <path d="M6 2h12l2 5H4l2-5Z" />
            <path d="M4 7v13h16V7" />
            <path d="M9 11h6" />
          </svg>
        </div>

        <h2 className="text-[13px] font-semibold text-gray-800">
          No Products Found
        </h2>

        <p className="text-[10px] text-gray-400 mt-1">
          Add your first product to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        {/* =========================
            TABLE HEADER
        ========================= */}

        <thead>
          <tr className="border-b border-[#f5ede0]">
            <th className="px-5 py-3.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              Product
            </th>

            <th className="px-5 py-3.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              Category
            </th>

            <th className="px-5 py-3.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              Price
            </th>

            <th className="px-5 py-3.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              Stock
            </th>

            <th className="px-5 py-3.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              Status
            </th>

            <th className="px-5 py-3.5 text-center text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        {/* =========================
            TABLE BODY
        ========================= */}

        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-b border-[#f5ede0] last:border-0 hover:bg-[#fdf9f5] transition-colors"
            >
              {/* =========================
                  PRODUCT
              ========================= */}

              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3 min-w-[220px]">
                  {/* Product Image */}

                  <div className="w-10 h-10 rounded-xl bg-[#f8f5f1] overflow-hidden shrink-0 border border-[#ede5da]">
                    <img
                      src={product.image || "https://via.placeholder.com/60"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Name */}

                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-gray-800 truncate max-w-[220px]">
                      {product.name}
                    </p>

                    <p className="text-[9px] text-gray-400 mt-0.5">
                      ID: {product._id?.slice(-6)}
                    </p>
                  </div>
                </div>
              </td>

              {/* =========================
                  CATEGORY
              ========================= */}

              <td className="px-5 py-3.5">
                <span className="text-[11px] text-gray-600">
                  {product.category || "—"}
                </span>
              </td>

              {/* =========================
                  PRICE
              ========================= */}

              <td className="px-5 py-3.5">
                <span className="text-[12px] font-semibold text-gray-800">
                  ₹{Number(product.price || 0).toLocaleString("en-IN")}
                </span>
              </td>

              {/* =========================
                  STOCK
              ========================= */}

              <td className="px-5 py-3.5">
                <span
                  className={`text-[11px] font-medium ${
                    product.stock === 0
                      ? "text-red-500"
                      : product.stock <= 10
                        ? "text-orange-500"
                        : "text-gray-700"
                  }`}
                >
                  {product.stock}
                </span>
              </td>

              {/* =========================
                  STATUS
              ========================= */}

              <td className="px-5 py-3.5">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold px-2 py-1 rounded-full bg-red-50 text-red-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Out of Stock
                  </span>
                )}
              </td>

              {/* =========================
                  ACTIONS
              ========================= */}

              <td className="px-5 py-3.5">
                <div className="flex justify-center items-center gap-1.5">
                  {/* EDIT */}

                  <button
                    onClick={() => onEdit(product)}
                    title="Edit product"
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f8f5f1] text-[#9a7f5e] hover:bg-[#C9B194] hover:text-white transition-colors"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                    </svg>
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() => onDelete(product._id)}
                    title="Delete product"
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
