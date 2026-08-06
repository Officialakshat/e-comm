// admin/AddProduct.jsx
import { useState } from "react";
import { createProduct } from "../services/products";

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

const EMPTY = {
  name: "",
  description: "",
  brand: "",
  category: "",
  price: "",
  stock: "",
  featured: false,
  newArrival: false,
  bestDeal: false,
};

// ── Reusable components ───────────────────────────────────
function Field({ label, required, error, children, className = "" }) {
  return (
    <div className={className}>
      <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const inputCls = (err) =>
  `w-full bg-[#fdf9f5] border rounded-xl px-4 py-2.5 text-[13.5px] text-gray-800 outline-none transition-all ${
    err
      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-[#ede5da] focus:border-[#C9B194] focus:ring-2 focus:ring-[#C9B19425]"
  }`;

function Toggle({ label, desc, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#f5ede0] last:border-0">
      <div>
        <p className="text-[13px] font-medium text-gray-800">{label}</p>
        <p className="text-[11px] text-gray-400">{desc}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0 ${value ? "bg-[#C9B194]" : "bg-gray-200"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${value ? "translate-x-5" : ""}`}
        />
      </button>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-[#ede5da] p-5">
      <h2 className="text-[13px] font-semibold text-gray-700 uppercase tracking-wider mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
export default function AddProduct({ onAdd, onCancel }) {
  const [form, setForm] = useState(EMPTY);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.brand.trim()) e.brand = "Brand name is required";
    if (!form.category) e.category = "Select a category";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = "Enter a valid price";
    if (form.stock === "" || isNaN(form.stock))
      e.stock = "Stock quantity is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newProduct = {
      name: form.name.trim(),
      description: form.description.trim(),
      brand: form.brand.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      image: preview || "",
      featured: form.featured,
      newArrival: form.newArrival,
      bestDeal: form.bestDeal,
      rating: 0,
      numReviews: 0,
    };

    try {
      setSaving(true);
      await createProduct(newProduct);
      if (onAdd) onAdd(newProduct);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setForm(EMPTY);
        setPreview(null);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to add product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const discount =
    form.price && form.original && Number(form.original) > Number(form.price)
      ? Math.round((1 - Number(form.price) / Number(form.original)) * 100)
      : null;

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
            Add New Product
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ── Basic Information ── */}
          <SectionCard title="Basic Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Product Name"
                required
                error={errors.name}
                className="sm:col-span-2"
              >
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Ceramic Table Lamp"
                  className={inputCls(errors.name)}
                />
              </Field>

              <Field label="Brand" required error={errors.brand}>
                <input
                  value={form.brand}
                  onChange={(e) => set("brand", e.target.value)}
                  placeholder="e.g. IKEA, Sony"
                  className={inputCls(errors.brand)}
                />
              </Field>

              <Field label="Category" required error={errors.category}>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className={inputCls(errors.category)}
                >
                  <option value="">Select category…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <Field
                label="Description"
                required
                error={errors.description}
                className="sm:col-span-2"
              >
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Short product description for the customer…"
                  rows={3}
                  className={`${inputCls(errors.description)} resize-none`}
                />
              </Field>
            </div>
          </SectionCard>

          {/* ── Pricing & Stock ── */}
          <SectionCard title="Pricing & Stock">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Selling Price (₹)" required error={errors.price}>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="1299"
                  className={inputCls(errors.price)}
                />
              </Field>

              <Field label="Stock Qty" required error={errors.stock}>
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => set("stock", e.target.value)}
                  placeholder="50"
                  className={inputCls(errors.stock)}
                />
              </Field>
            </div>

            {/* Live stock status */}
            {form.stock !== "" && !isNaN(form.stock) && (
              <div
                className={`mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full border ${
                  Number(form.stock) === 0
                    ? "bg-red-50 border-red-200 text-red-600"
                    : Number(form.stock) <= 10
                      ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                      : "bg-green-50 border-green-200 text-green-700"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {Number(form.stock) === 0
                  ? "Will be out of stock"
                  : Number(form.stock) <= 10
                    ? `Low stock — ${form.stock} units`
                    : `In stock — ${form.stock} units`}
              </div>
            )}
          </SectionCard>

          {/* ── Product Image ── */}
          <SectionCard title="Product Image">
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
                  <div className="flex flex-col items-center gap-1 text-[#C9B194] opacity-40">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="text-[10px] font-medium">No image</span>
                  </div>
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
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImage}
                  />
                </label>
                <p className="text-[11px] text-gray-400 mt-2">
                  PNG, JPG, WEBP — max 5 MB
                </p>
                {preview && (
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="text-[11px] text-red-400 hover:text-red-600 mt-1 transition-colors block"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>
          </SectionCard>

          {/* ── Product Flags ── */}
          <SectionCard title="Product Flags">
            <Toggle
              label="Featured product"
              desc="Appears on homepage featured section"
              value={form.featured}
              onChange={(v) => set("featured", v)}
            />
            <Toggle
              label="New arrival"
              desc="Appears in the New Arrivals section"
              value={form.newArrival}
              onChange={(v) => set("newArrival", v)}
            />
            <Toggle
              label="Best deal"
              desc="Appears in the Best Deals section with discount badge"
              value={form.bestDeal}
              onChange={(v) => set("bestDeal", v)}
            />
          </SectionCard>

          {/* ── Submit ── */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving || saved}
              className={`flex-1 sm:flex-none sm:px-12 py-3 rounded-xl text-[13px] font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                saved
                  ? "bg-green-600"
                  : saving
                    ? "bg-[#C9B194] cursor-wait"
                    : "bg-[#1a1a1a] hover:bg-[#C9B194]"
              }`}
            >
              {saved && "✓ Product Added!"}
              {saving && !saved && (
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
                  Adding…
                </>
              )}
              {!saving && !saved && "Add Product"}
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
