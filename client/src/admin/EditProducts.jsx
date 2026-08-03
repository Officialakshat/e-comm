// admin/EditProduct.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const categories = [
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

export default function EditProducts({ product, onSave, onCancel }) {
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const { id } = useParams();

  // Pre-fill form when product prop changes
  useEffect(() => {
    if (product) {
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
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setPreview(product.img || null);
    }
  }, [product]);

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
    if (!form.price) e.price = "Price is required";
    if (!form.stock) e.stock = "Stock is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
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
      img: preview || product.img,
    };

    if (onSave) onSave(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!product)
    return (
      <div className="min-h-screen bg-[#f8f6f3] flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl mb-3">📦</p>
          <p className="text-[14px] font-medium text-gray-700">
            No product selected to edit.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-5 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Page heading */}
        <div className="mb-7">
          <p className="text-[11px] font-medium tracking-widest text-[#C9B194] uppercase mb-1">
            Admin · Products
          </p>
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Georgia,serif" }}
          >
            Edit Product
          </h1>
          <p className="text-[12px] text-gray-400 mt-0.5">
            Editing:{" "}
            <span className="font-medium text-gray-600">{product.name}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ── Basic Info ── */}
          <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
            <h2 className="text-[13px] font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.name || ""}
                  onChange={(e) => set("name", e.target.value)}
                  className={`w-full bg-[#fdf9f5] border rounded-xl px-4 py-2.5 text-[13.5px] outline-none transition-all ${
                    errors.name
                      ? "border-red-400"
                      : "border-[#ede5da] focus:border-[#C9B194] focus:ring-2 focus:ring-[#C9B19425]"
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.category || ""}
                  onChange={(e) => set("category", e.target.value)}
                  className={`w-full bg-[#fdf9f5] border rounded-xl px-4 py-2.5 text-[13.5px] outline-none transition-all ${
                    errors.category
                      ? "border-red-400"
                      : "border-[#ede5da] focus:border-[#C9B194]"
                  }`}
                >
                  <option value="">Select category…</option>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-[11px] text-red-500 mt-1">
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                  Status
                </label>
                <select
                  value={form.status || "Active"}
                  onChange={(e) => set("status", e.target.value)}
                  className="w-full bg-[#fdf9f5] border border-[#ede5da] rounded-xl px-4 py-2.5 text-[13.5px] outline-none focus:border-[#C9B194] transition-all"
                >
                  <option>Active</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                  Description
                </label>
                <textarea
                  value={form.description || ""}
                  onChange={(e) => set("description", e.target.value)}
                  rows={3}
                  className="w-full bg-[#fdf9f5] border border-[#ede5da] rounded-xl px-4 py-2.5 text-[13.5px] outline-none focus:border-[#C9B194] focus:ring-2 focus:ring-[#C9B19425] transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* ── Pricing & Stock ── */}
          <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
            <h2 className="text-[13px] font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Pricing & Stock
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Selling Price (₹)", key: "price", required: true },
                {
                  label: "Original Price (₹)",
                  key: "original",
                  required: false,
                },
                { label: "Stock Qty", key: "stock", required: true },
                { label: "Badge Tag", key: "tag", required: false },
              ].map(({ label, key, required }) => (
                <div key={key}>
                  <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                    {label}{" "}
                    {required && <span className="text-red-400">*</span>}
                  </label>
                  <input
                    type={key === "tag" ? "text" : "number"}
                    value={form[key] || ""}
                    onChange={(e) => set(key, e.target.value)}
                    min="0"
                    className={`w-full bg-[#fdf9f5] border rounded-xl px-4 py-2.5 text-[13.5px] outline-none transition-all ${
                      errors[key]
                        ? "border-red-400"
                        : "border-[#ede5da] focus:border-[#C9B194] focus:ring-2 focus:ring-[#C9B19425]"
                    }`}
                  />
                  {errors[key] && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {errors[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {form.price &&
              form.original &&
              Number(form.original) > Number(form.price) && (
                <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                  <span className="text-[11px] text-green-700 font-medium">
                    Discount:{" "}
                    {Math.round((1 - form.price / form.original) * 100)}% off
                  </span>
                </div>
              )}
          </div>

          {/* ── Image ── */}
          <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
            <h2 className="text-[13px] font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Product Image
            </h2>
            <div className="flex items-start gap-5">
              <div
                className={`w-28 h-28 rounded-2xl border-2 border-dashed flex items-center justify-center shrink-0 overflow-hidden ${
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
                  <span className="text-3xl opacity-30">📷</span>
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
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImage}
                  />
                </label>
                <p className="text-[11px] text-gray-400 mt-2">
                  PNG, JPG, WEBP — max 5MB
                </p>
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex gap-3">
            <button
              type="submit"
              className={`flex-1 sm:flex-none sm:px-10 py-3 rounded-xl text-[13px] font-medium text-white transition-all duration-200 ${
                saved ? "bg-green-600" : "bg-[#1a1a1a] hover:bg-[#C9B194]"
              }`}
            >
              {saved ? "✓ Changes Saved!" : "Save Changes"}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-8 py-3 border border-[#ede5da] hover:border-[#C9B194] text-gray-600 hover:text-[#C9B194] rounded-xl text-[13px] font-medium transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
