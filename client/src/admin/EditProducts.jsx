// components/EditProductModal.jsx
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

// ── Reusable field components ─────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const inputCls = (err) =>
  `w-full bg-[#fdf9f5] border rounded-xl px-4 py-2.5 text-[13px] text-gray-800 outline-none transition-all ${
    err
      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-[#ede5da] focus:border-[#C9B194] focus:ring-2 focus:ring-[#C9B19425]"
  }`;

// ── Toggle switch ─────────────────────────────────────────
function Toggle({ label, desc, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#f5ede0] last:border-0">
      <div>
        <p className="text-[13px] font-medium text-gray-800">{label}</p>
        <p className="text-[10px] text-gray-400">{desc}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 shrink-0 ${
          value ? "bg-[#C9B194]" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

// ── Section heading inside modal ──────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-5 mb-3">
      {children}
    </p>
  );
}

// ── Main Modal ────────────────────────────────────────────
const EMPTY = {
  name: "",
  description: "",
  brand: "",
  category: "",
  price: "",
  stock: "",
  image: "",
  featured: false,
  newArrival: false,
  bestDeal: false,
};

export default function EditProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const overlayRef = useRef(null);

  // Pre-fill when product changes
  useEffect(() => {
    if (!product) return;
    setForm({
      name: product.name ?? "",
      description: product.description ?? "",
      brand: product.brand ?? "",
      category: product.category ?? "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      image: product.image ?? "",
      featured: product.featured ?? false,
      newArrival: product.newArrival ?? false,
      bestDeal: product.bestDeal ?? false,
    });
    setPreview(product.image || null);
    setErrors({});
    setSaved(false);
  }, [product]);

  // Close on Escape
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
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
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.brand.trim()) e.brand = "Brand is required";
    if (!form.category) e.category = "Select a category";
    if (!form.price || Number(form.price) <= 0) e.price = "Enter a valid price";
    if (form.stock === "" || isNaN(form.stock)) e.stock = "Stock is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updated = {
      ...product,
      name: form.name.trim(),
      description: form.description.trim(),
      brand: form.brand.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      image: preview || product.image,
      featured: form.featured,
      newArrival: form.newArrival,
      bestDeal: form.bestDeal,
    };

    try {
      setSaving(true);
      await updateProduct(product._id, updated);
      setSaved(true);
      if (onSave) await onSave();
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1400);
    } catch (err) {
      console.error(err);
      alert("Failed to update product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const discount =
    form.price && form.original && Number(form.original) > Number(form.price)
      ? Math.round((1 - Number(form.price) / Number(form.original)) * 100)
      : null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/45 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease]"
    >
      <div className="bg-white rounded-[20px] border border-[#ede5da] w-full max-w-[600px] max-h-[92vh] overflow-y-auto shadow-2xl animate-[modalIn_0.28s_cubic-bezier(0.34,1.3,0.64,1)]">
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
              All fields marked * are required
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
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#ede5da] bg-[#fdf5ec]">
            {preview ? (
              <img
                src={preview}
                alt={form.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#C9B194] opacity-50">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-gray-800 truncate">
              {form.name || "Untitled product"}
            </p>
            <p className="text-[11px] text-gray-400">
              {form.brand || "No brand"} · {form.category || "No category"}
            </p>
          </div>
          <div className="flex gap-1.5 flex-wrap justify-end shrink-0">
            {form.featured && (
              <span className="text-[9px] font-semibold bg-[#fdf0e2] text-[#9a7f5e] border border-[#e8d5bb] px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
            {form.newArrival && (
              <span className="text-[9px] font-semibold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                New
              </span>
            )}
            {form.bestDeal && (
              <span className="text-[9px] font-semibold bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full">
                Deal
              </span>
            )}
          </div>
        </div>

        {/* ── FORM ── */}
        <form onSubmit={handleSave} className="px-5 pb-5">
          {/* ─ Basic Info ─ */}
          <SectionLabel>Basic information</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Field label="Product name" required error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Ceramic Table Lamp"
                  className={inputCls(errors.name)}
                />
              </Field>
            </div>

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
                <option value="">Select…</option>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>

            <div className="col-span-2">
              <Field label="Description" required error={errors.description}>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Short product description for customers…"
                  rows={3}
                  className={`${inputCls(errors.description)} resize-none`}
                />
              </Field>
            </div>
          </div>

          {/* ─ Pricing & Stock ─ */}
          <SectionLabel>Pricing and stock</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price (₹)" required error={errors.price}>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="1299"
                className={inputCls(errors.price)}
              />
            </Field>

            <Field label="Stock quantity" required error={errors.stock}>
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

          {/* Stock status pill */}
          {form.stock !== "" && !isNaN(form.stock) && (
            <div
              className={`mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full border ${
                Number(form.stock) === 0
                  ? "bg-red-50 border-red-200 text-red-600"
                  : Number(form.stock) <= 10
                    ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                    : "bg-green-50 border-green-200 text-green-700"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {Number(form.stock) === 0
                ? "Out of stock"
                : Number(form.stock) <= 10
                  ? `Low stock — ${form.stock} units left`
                  : `In stock — ${form.stock} units`}
            </div>
          )}

          {/* ─ Product Image ─ */}
          <SectionLabel>Product image</SectionLabel>
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
                  className="text-[10px] text-red-400 hover:text-red-600 mt-1 transition-colors block"
                >
                  Revert to original
                </button>
              )}
            </div>
          </div>

          {/* ─ Flags / Toggles ─ */}
          <SectionLabel>Product flags</SectionLabel>
          <div className="bg-[#fdf9f5] border border-[#ede5da] rounded-2xl px-4 py-1">
            <Toggle
              label="Featured product"
              desc="Show on homepage featured section"
              value={form.featured}
              onChange={(v) => set("featured", v)}
            />
            <Toggle
              label="New arrival"
              desc="Show in new arrivals section"
              value={form.newArrival}
              onChange={(v) => set("newArrival", v)}
            />
            <Toggle
              label="Best deal"
              desc="Show in best deals section with discount badge"
              value={form.bestDeal}
              onChange={(v) => set("bestDeal", v)}
            />
          </div>

          {/* ─ Read-only meta ─ */}
          <SectionLabel>Product metadata</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Rating", value: product.rating ?? 0 },
              { label: "Reviews", value: product.numReviews ?? 0 },
              {
                label: "Product ID",
                value: product._id
                  ? `#${product._id.toString().slice(-6).toUpperCase()}`
                  : "—",
              },
              {
                label: "Created",
                value: product.createdAt
                  ? new Date(product.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-[#fdf9f5] border border-[#f0e8df] rounded-xl p-3"
              >
                <p className="text-[9px] font-medium text-[#C9B194] uppercase tracking-widest mb-0.5">
                  {label}
                </p>
                <p className="text-[13px] font-semibold text-gray-700">
                  {String(value)}
                </p>
              </div>
            ))}
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
            disabled={saving || saved}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
              saved
                ? "bg-green-600"
                : saving
                  ? "bg-[#C9B194] cursor-wait"
                  : "bg-[#1a1a1a] hover:bg-[#C9B194]"
            }`}
          >
            {saved && "✓ Saved!"}
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
                Saving…
              </>
            )}
            {!saving && !saved && "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
