import { useState } from "react";
import { initialProducts, productStatusStyle } from "../data/adminData";

function ConfirmModal({ product, onConfirm, onCancel }) {
  const [typing, setTyping] = useState("");
  const confirmed = typing === product?.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal card */}
      <div className="relative bg-white rounded-3xl border border-[#ede5da] shadow-2xl w-full max-w-md p-6 z-10">
        {/* Icon */}
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.8"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </div>

        <h3
          className="text-[17px] font-bold text-gray-900 text-center mb-1"
          style={{ fontFamily: "Georgia,serif" }}
        >
          Delete Product?
        </h3>
        <p className="text-[12px] text-gray-500 text-center mb-5">
          This action is permanent and cannot be undone. The product will be
          removed from all listings.
        </p>

        {/* Product preview */}
        <div className="flex items-center gap-3 bg-[#fdf9f5] border border-[#ede5da] rounded-2xl p-3 mb-5">
          <img
            src={product.img}
            alt={product.name}
            className="w-12 h-12 rounded-xl object-cover bg-[#fdf5ec] shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-gray-800 truncate">
              {product.name}
            </p>
            <p className="text-[11px] text-gray-500">
              {product.category} · ₹{product.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Type-to-confirm */}
        <div className="mb-5">
          <label className="text-[11px] font-medium text-gray-500 block mb-1.5">
            Type <span className="font-bold text-gray-700">{product.name}</span>{" "}
            to confirm
          </label>
          <input
            value={typing}
            onChange={(e) => setTyping(e.target.value)}
            placeholder="Type product name here…"
            className={`w-full border rounded-xl px-4 py-2.5 text-[13px] outline-none transition-all ${
              typing && !confirmed
                ? "border-red-300 bg-red-50"
                : confirmed
                  ? "border-green-400 bg-green-50"
                  : "border-[#ede5da] bg-[#fdf9f5] focus:border-[#C9B194]"
            }`}
          />
          {typing && !confirmed && (
            <p className="text-[11px] text-red-500 mt-1">Name doesn't match</p>
          )}
          {confirmed && (
            <p className="text-[11px] text-green-600 mt-1">
              ✓ Name matches — ready to delete
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-[#ede5da] hover:border-gray-300 text-gray-600 text-[13px] font-medium py-3 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!confirmed}
            className={`flex-1 text-white text-[13px] font-medium py-3 rounded-xl transition-all ${
              confirmed
                ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                : "bg-red-200 cursor-not-allowed"
            }`}
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main DeleteProduct page ───────────────────────────────
export default function DeleteProduct() {
  const [products, setProducts] = useState(initialProducts);
  const [toDelete, setToDelete] = useState(null); // product pending delete
  const [deletedIds, setDeletedIds] = useState([]); // for flash animation
  const [search, setSearch] = useState("");

  const visible = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const confirmDelete = () => {
    setDeletedIds((prev) => [...prev, toDelete.id]);
    setTimeout(() => {
      setProducts((prev) => prev.filter((p) => p.id !== toDelete.id));
      setDeletedIds((prev) => prev.filter((id) => id !== toDelete.id));
      setToDelete(null);
    }, 400);
  };

  const stockColor = (s) =>
    s === 0 ? "text-red-500" : s <= 5 ? "text-yellow-600" : "text-green-600";

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-5 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-7">
          <p className="text-[11px] font-medium tracking-widest text-[#C9B194] uppercase mb-1">
            Admin · Products
          </p>
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Georgia,serif" }}
          >
            Manage & Delete Products
          </h1>
        </div>

        {/* Search */}
        <div className="flex items-center bg-white border border-[#ede5da] rounded-full mb-5 focus-within:border-[#C9B194] focus-within:ring-[3px] focus-within:ring-[#C9B19428] transition-all">
          <svg
            className="ml-4 shrink-0 text-[#9a7f5e]"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or category…"
            className="flex-1 bg-transparent outline-none border-none px-3 py-2.5 text-[13.5px] placeholder-[#b0a090]"
          />
        </div>

        {/* Product table */}
        <div className="bg-white rounded-2xl border border-[#ede5da] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#fdf9f5] border-b border-[#ede5da] text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Stock</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5ede0]">
                {visible.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-14 text-center text-[13px] text-gray-400"
                    >
                      No products found
                    </td>
                  </tr>
                ) : (
                  visible.map((p) => (
                    <tr
                      key={p.id}
                      className={`transition-all duration-300 ${
                        deletedIds.includes(p.id)
                          ? "opacity-0 scale-95"
                          : "opacity-100"
                      } hover:bg-[#fdf9f5]`}
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.img}
                            alt={p.name}
                            className="w-9 h-9 rounded-xl object-cover bg-[#fdf5ec] shrink-0"
                          />
                          <span className="text-[13px] font-medium text-gray-800">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[12px] text-gray-500">
                        {p.category}
                      </td>
                      <td className="px-5 py-3 text-[12px] font-bold text-gray-900">
                        ₹{p.price.toLocaleString()}
                      </td>
                      <td
                        className={`px-5 py-3 text-[12px] font-semibold ${stockColor(p.stock)}`}
                      >
                        {p.stock}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${productStatusStyle[p.status]}`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => setToDelete(p)}
                          className="flex items-center gap-1.5 text-[11px] text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 hover:bg-red-50 px-3 py-1.5 rounded-xl font-medium transition-all"
                        >
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          <div className="px-5 py-3 border-t border-[#f5ede0] bg-[#fdf9f5]">
            <p className="text-[11px] text-gray-400">
              {products.length} product{products.length !== 1 ? "s" : ""} total
            </p>
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {toDelete && (
        <ConfirmModal
          product={toDelete}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}
