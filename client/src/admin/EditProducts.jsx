import { useState, useEffect, useRef } from "react";
import { updateProduct } from "../services/products";

const CATEGORIES = [
  "Lighting",
  "Electronics",
  "Furniture",
  "Decor",
  "Kitchen",
  "Plants",
  "Fashion",
  "Bedroom",
  "Office",
];

export default function EditProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!product) return;
    setForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      original: product.original || "",
      stock: product.stock || "",
      tag: product.tag || "",
      description: product.description || "",
      status: product.status || "Active",
    });
    setPreview(product.image || null);
    setErrors({});
    setSaved(false);
  }, [product]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!product) return null;

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = "Product name is required";
    if (!form.category) e.category = "Select a category";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = "Enter a valid price";
    if (!form.stock || isNaN(form.stock)) e.stock = "Stock is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const updated = {
      ...product,
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      original: form.original ? Number(form.original) : null,
      stock: Number(form.stock),
      tag: form.tag,
      description: form.description,
      status: form.status,
      image: preview || <product className="image"></product>,
    };
    try {
      await updateProduct(product._id, updated);

      setSaved(true);

      if (onSave) {
        await onSave();
      }

      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.log(err);

      alert("Failed to update product");
    }
  };

  // Discount preview
  const discount =
    form.price && form.original && Number(form.original) > Number(form.price)
      ? Math.round((1 - Number(form.price) / Number(form.original)) * 100)
      : null;

  return (
    // Overlay — click outside to close
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/45 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease]"
    >
      {/* Modal card */}
      <div className="bg-white rounded-[20px] border border-[#ede5da] w-full max-w-[560px] max-h-[90vh] overflow-y-auto shadow-2xl animate-[modalIn_0.28s_cubic-bezier(0.34,1.3,0.64,1)]">
        {/* ── HEADER ── */}
        <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-5 py-4 border-b border-[#f5ede0] rounded-t-[20px]">
          <div>
            <h2
              className="text-[16px] font-semibold text-gray-900"
              style={{ fontFamily: "Georgia,serif" }}
            >
              Edit product
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Changes are saved to the product catalog
            </p>
          </div>
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

        {/* ── PRODUCT PEEK ── */}
        <div className="mx-5 mt-4 flex items-center gap-3 bg-[#fdf9f5] border border-[#ede5da] rounded-2xl p-3">
          <img
            src={preview || product.image}
            alt={form.name}
            className="w-11 h-11 rounded-xl object-cover bg-[#fdf5ec] shrink-0 border border-[#ede5da]"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-gray-800 truncate">
              {form.name || "Untitled product"}
            </p>
            <p className="text-[11px] text-gray-400">
              {form.category || "No category"} · ID #
              {String(product.id).padStart(4, "0")}
            </p>
          </div>
          <span className="text-[9px] font-semibold bg-[#fdf0e2] text-[#9a7f5e] border border-[#e8d5bb] px-2.5 py-1 rounded-full shrink-0">
            {form.status}
          </span>
        </div>

        {/* ── FORM ── */}
        <form onSubmit={handleSave} className="px-5 pb-5">
          {/* Basic Info */}
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-5 mb-3">
            Basic information
          </p>
          <div className="grid grid-cols-2 gap-3">
            {/* Name - full width */}
            <div className="col-span-2">
              <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                Product name <span className="text-red-400">*</span>
              </label>
              <input
                value={form.name || ""}
                onChange={(e) => set("name", e.target.value)}
                className={`w-full bg-[#fdf9f5] border rounded-xl px-4 py-2.5 text-[13px] text-gray-800 outline-none transition-all ${
                  errors.name
                    ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-[#ede5da] focus:border-[#C9B194] focus:ring-2 focus:ring-[#C9B19425]"
                }`}
              />
              {errors.name && (
                <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={form.category || ""}
                onChange={(e) => set("category", e.target.value)}
                className={`w-full bg-[#fdf9f5] border rounded-xl px-4 py-2.5 text-[13px] text-gray-800 outline-none transition-all ${
                  errors.category
                    ? "border-red-400"
                    : "border-[#ede5da] focus:border-[#C9B194]"
                }`}
              >
                <option value="">Select…</option>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-[10px] text-red-500 mt-1">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                Status
              </label>
              <select
                value={form.status || "Active"}
                onChange={(e) => set("status", e.target.value)}
                className="w-full bg-[#fdf9f5] border border-[#ede5da] rounded-xl px-4 py-2.5 text-[13px] text-gray-800 outline-none focus:border-[#C9B194] transition-all"
              >
                <option>Active</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                Description
              </label>
              <textarea
                value={form.description || ""}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                className="w-full bg-[#fdf9f5] border border-[#ede5da] rounded-xl px-4 py-2.5 text-[13px] text-gray-800 outline-none focus:border-[#C9B194] focus:ring-2 focus:ring-[#C9B19425] transition-all resize-none"
              />
            </div>
          </div>

          {/* Pricing & Stock */}
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-5 mb-3">
            Pricing and stock
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Selling price (₹)", key: "price", required: true },
              { label: "Original price (₹)", key: "original", required: false },
              { label: "Stock quantity", key: "stock", required: true },
              { label: "Badge tag", key: "tag", required: false },
            ].map(({ label, key, required }) => (
              <div key={key}>
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                  {label} {required && <span className="text-red-400">*</span>}
                </label>
                <input
                  type={key === "tag" ? "text" : "number"}
                  value={form[key] || ""}
                  onChange={(e) => set(key, e.target.value)}
                  min="0"
                  className={`w-full bg-[#fdf9f5] border rounded-xl px-4 py-2.5 text-[13px] text-gray-800 outline-none transition-all ${
                    errors[key]
                      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-[#ede5da] focus:border-[#C9B194] focus:ring-2 focus:ring-[#C9B19425]"
                  }`}
                />
                {errors[key] && (
                  <p className="text-[10px] text-red-500 mt-1">{errors[key]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Live discount badge */}
          {discount && (
            <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
              >
                <path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              <span className="text-[11px] text-green-700 font-medium">
                {discount}% off · customer saves ₹
                {(Number(form.original) - Number(form.price)).toLocaleString()}
              </span>
            </div>
          )}

          {/* Image upload */}
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-5 mb-3">
            Product image
          </p>
          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-dashed flex items-center justify-center ${
                preview ? "border-[#C9B194]" : "border-[#ede5da] bg-[#fdf9f5]"
              }`}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9B194"
                  strokeWidth="1.5"
                  opacity="0.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              )}
            </div>
            <div>
              <label className="cursor-pointer inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#C9B194] text-white text-[12px] font-medium px-4 py-2.5 rounded-xl transition-colors">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Change image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
              <p className="text-[10px] text-gray-400 mt-1.5">
                PNG, JPG, WEBP · max 5 MB
              </p>
              {preview && preview !== product.image && (
                <button
                  type="button"
                  onClick={() => setPreview(product.image)}
                  className="text-[10px] text-red-400 hover:text-red-600 mt-1 transition-colors"
                >
                  Revert to original
                </button>
              )}
            </div>
          </div>
        </form>

        {/* ── FOOTER ── */}
        <div className="sticky bottom-0 bg-white border-t border-[#f5ede0] px-5 py-4 flex gap-3 rounded-b-[20px]">
          <button
            type="button"
            onClick={onClose}
            className="px-7 py-2.5 border border-[#ede5da] hover:border-[#C9B194] text-gray-600 hover:text-[#C9B194] rounded-xl text-[13px] font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-medium text-white transition-all duration-200 ${
              saved ? "bg-green-600" : "bg-[#1a1a1a] hover:bg-[#C9B194]"
            }`}
          >
            {saved ? "✓ Saved!" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
