// admin/categories/AdminCategories.jsx
import { useState, useRef } from "react";

// ── Initial data ─────────────────────────────────────────
const initialCategories = [
  {
    id: 1,
    name: "Lighting",
    icon: "💡",
    productCount: 24,
    status: "Active",
    description: "Lamps, bulbs, and ambient lighting solutions",
  },
  {
    id: 2,
    name: "Electronics",
    icon: "🎧",
    productCount: 18,
    status: "Active",
    description: "Gadgets, audio, and smart devices",
  },
  {
    id: 3,
    name: "Furniture",
    icon: "🛋️",
    productCount: 31,
    status: "Active",
    description: "Chairs, tables, shelves, and storage",
  },
  {
    id: 4,
    name: "Decor",
    icon: "🕯️",
    productCount: 42,
    status: "Active",
    description: "Candles, clocks, art, and home accents",
  },
  {
    id: 5,
    name: "Kitchen",
    icon: "🍳",
    productCount: 15,
    status: "Active",
    description: "Cookware, appliances, and serving essentials",
  },
  {
    id: 6,
    name: "Plants",
    icon: "🌿",
    productCount: 9,
    status: "Active",
    description: "Indoor plants, pots, and planters",
  },
  {
    id: 7,
    name: "Fashion",
    icon: "👗",
    productCount: 27,
    status: "Active",
    description: "Clothing, bags, accessories, and wallets",
  },
  {
    id: 8,
    name: "Bedroom",
    icon: "🛏️",
    productCount: 13,
    status: "Active",
    description: "Bedding, pillows, duvet covers, and linens",
  },
  {
    id: 9,
    name: "Office",
    icon: "💼",
    productCount: 7,
    status: "Inactive",
    description: "Organizers, stationery, and desk accessories",
  },
];

const EMPTY_FORM = { name: "", icon: "", description: "", status: "Active" };

// ── Reusable helpers ──────────────────────────────────────
const inputCls = (err) =>
  `w-full bg-[#fdf9f5] border rounded-xl px-4 py-2.5 text-[13px] text-gray-800 outline-none transition-all ${
    err
      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-[#ede5da] focus:border-[#C9B194] focus:ring-2 focus:ring-[#C9B19425]"
  }`;

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

// ── Add / Edit Modal ──────────────────────────────────────
function CategoryFormModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const overlayRef = useRef(null);

  const isEdit = !!initial;

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Category name is required";
    if (!form.icon.trim()) e.icon = "Icon emoji is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSave({ ...form, name: form.name.trim(), icon: form.icon.trim() });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1400);
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/45 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease]"
    >
      <div className="bg-white rounded-[20px] border border-[#ede5da] w-full max-w-[460px] shadow-2xl animate-[modalIn_0.28s_cubic-bezier(0.34,1.3,0.64,1)]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f5ede0]">
          <div>
            <h2
              className="text-[16px] font-semibold text-gray-900"
              style={{ fontFamily: "Georgia,serif" }}
            >
              {isEdit ? "Edit Category" : "Add New Category"}
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {isEdit
                ? `Editing: ${initial.name}`
                : "Fill in the details below"}
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

        {/* Form */}
        <form onSubmit={handleSave} className="px-5 py-5 space-y-4">
          {/* Icon + Name side by side */}
          <div className="grid grid-cols-[72px_1fr] gap-3">
            <Field label="Icon" required error={errors.icon}>
              <input
                value={form.icon}
                onChange={(e) => set("icon", e.target.value)}
                placeholder="💡"
                className={`${inputCls(errors.icon)} text-center text-2xl`}
                maxLength={2}
              />
            </Field>
            <Field label="Category name" required error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Lighting"
                className={inputCls(errors.name)}
              />
            </Field>
          </div>

          {/* Description */}
          <Field label="Description" error={errors.description}>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Short description for this category…"
              rows={2}
              className={`${inputCls()} resize-none`}
            />
          </Field>

          {/* Status */}
          <Field label="Status">
            <div className="flex gap-2">
              {["Active", "Inactive"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("status", s)}
                  className={`flex-1 py-2.5 rounded-xl text-[12px] font-medium border transition-all ${
                    form.status === s
                      ? s === "Active"
                        ? "bg-green-50 border-green-400 text-green-700"
                        : "bg-red-50 border-red-300 text-red-600"
                      : "bg-white border-[#ede5da] text-gray-500 hover:border-[#C9B194]"
                  }`}
                >
                  {s === "Active" ? "✅ " : "⛔ "}
                  {s}
                </button>
              ))}
            </div>
          </Field>

          {/* Live preview */}
          <div className="flex items-center gap-3 bg-[#fdf9f5] border border-[#ede5da] rounded-2xl px-4 py-3">
            <div className="w-11 h-11 bg-white border border-[#ede5da] rounded-xl flex items-center justify-center text-xl shrink-0">
              {form.icon || "?"}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-800">
                {form.name || "Category name"}
              </p>
              <p className="text-[11px] text-gray-400">
                {form.description || "No description"}
              </p>
            </div>
            <span
              className={`ml-auto text-[9px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                form.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {form.status}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-[#ede5da] hover:border-[#C9B194] text-gray-600 hover:text-[#C9B194] rounded-xl text-[13px] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 py-2.5 rounded-xl text-[13px] font-medium text-white transition-all duration-200 ${
                saved ? "bg-green-600" : "bg-[#1a1a1a] hover:bg-[#C9B194]"
              }`}
            >
              {saved ? "✓ Saved!" : isEdit ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ──────────────────────────────────
function DeleteModal({ category, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/45 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease]">
      <div className="bg-white rounded-[20px] border border-[#ede5da] w-full max-w-[380px] shadow-2xl animate-[modalIn_0.28s_cubic-bezier(0.34,1.3,0.64,1)] p-6">
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
          Delete Category?
        </h3>
        <p className="text-[12px] text-gray-500 text-center mb-5">
          <span className="font-semibold text-gray-700">{category.name}</span>{" "}
          and its{" "}
          <span className="font-semibold text-gray-700">
            {category.productCount} products
          </span>{" "}
          association will be permanently removed.
        </p>

        {/* Category preview */}
        <div className="flex items-center gap-3 bg-[#fdf9f5] border border-[#ede5da] rounded-2xl px-4 py-3 mb-5">
          <div className="w-10 h-10 bg-white border border-[#ede5da] rounded-xl flex items-center justify-center text-xl shrink-0">
            {category.icon}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-800">
              {category.name}
            </p>
            <p className="text-[11px] text-gray-400">
              {category.productCount} products
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-[#ede5da] hover:border-gray-300 text-gray-600 text-[13px] font-medium py-3 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-[13px] font-medium py-3 rounded-xl transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main AdminCategories ──────────────────────────────────
export default function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false); // add modal
  const [editTarget, setEditTarget] = useState(null); // edit modal
  const [delTarget, setDelTarget] = useState(null); // delete modal
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const visible = categories.filter((c) => {
    const matchSearch =
      !search || c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  // ── CRUD handlers ─────────────────────────────────────
  const handleAdd = (data) => {
    setCategories((prev) => [
      ...prev,
      { ...data, id: Date.now(), productCount: 0 },
    ]);
    showToast(`"${data.name}" category added`);
  };

  const handleEdit = (data) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === editTarget.id ? { ...c, ...data } : c)),
    );
    showToast(`"${data.name}" updated`);
    setEditTarget(null);
  };

  const handleDelete = () => {
    setCategories((prev) => prev.filter((c) => c.id !== delTarget.id));
    showToast(`"${delTarget.name}" deleted`);
    setDelTarget(null);
  };

  const toggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c,
      ),
    );
  };

  // Stats
  const totalProducts = categories.reduce((s, c) => s + c.productCount, 0);
  const activeCount = categories.filter((c) => c.status === "Active").length;

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-5 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ── Page heading ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium tracking-widest text-[#C9B194] uppercase mb-1">
              Admin
            </p>
            <h1
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "Georgia,serif" }}
            >
              Categories
            </h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#C9B194] text-white text-[13px] font-medium px-5 py-2.5 rounded-xl transition-colors duration-200 hover:-translate-y-px active:scale-95"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Category
          </button>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Total Categories",
              value: categories.length,
              icon: "📂",
              bg: "bg-[#fdf0e2]",
            },
            {
              label: "Active",
              value: activeCount,
              icon: "✅",
              bg: "bg-[#f0f9f4]",
            },
            {
              label: "Inactive",
              value: categories.length - activeCount,
              icon: "⛔",
              bg: "bg-red-50",
            },
            {
              label: "Total Products",
              value: totalProducts,
              icon: "🏷️",
              bg: "bg-[#eff6ff]",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-[#ede5da] p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center text-xl mb-3`}
              >
                {s.icon}
              </div>
              <p className="text-[22px] font-bold text-gray-900 leading-none">
                {s.value}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Search + filter ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center bg-white border border-[#ede5da] rounded-full max-w-sm w-full focus-within:border-[#C9B194] focus-within:ring-[3px] focus-within:ring-[#C9B19428] transition-all">
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
              placeholder="Search categories…"
              className="flex-1 bg-transparent outline-none border-none px-3 py-2.5 text-[13px] placeholder-[#b0a090]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mr-3 text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>
          <div className="flex gap-1.5">
            {["All", "Active", "Inactive"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-[11px] font-medium border transition-all ${
                  filter === f
                    ? "bg-[#C9B194] text-white border-[#C9B194]"
                    : "bg-white text-gray-500 border-[#ede5da] hover:border-[#C9B194] hover:text-[#C9B194]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Category grid ── */}
        {visible.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#ede5da] py-20 text-center">
            <div className="w-14 h-14 bg-[#fdf0e2] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              📂
            </div>
            <p className="text-[14px] font-medium text-gray-700 mb-1">
              No categories found
            </p>
            <p className="text-[12px] text-gray-400 mb-5">
              Try a different search or filter
            </p>
            <button
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="bg-[#1a1a1a] hover:bg-[#C9B194] text-white text-[13px] font-medium px-6 py-2.5 rounded-xl transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((cat) => (
              <div
                key={cat.id}
                className={`group bg-white rounded-2xl border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden ${
                  cat.status === "Active"
                    ? "border-[#ede5da]"
                    : "border-dashed border-gray-300 opacity-70"
                }`}
              >
                {/* Card header strip */}
                <div className="h-1.5 bg-gradient-to-r from-[#C9B194] to-[#e8d5bb]" />

                <div className="p-4">
                  {/* Icon + name + status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#fdf0e2] rounded-2xl flex items-center justify-center text-2xl shrink-0">
                        {cat.icon}
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-gray-900">
                          {cat.name}
                        </h3>
                        <p className="text-[11px] text-gray-400">
                          {cat.productCount} products
                        </p>
                      </div>
                    </div>

                    {/* Status toggle pill */}
                    <button
                      onClick={() => toggleStatus(cat.id)}
                      className={`text-[9px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                        cat.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      }`}
                      title="Click to toggle status"
                    >
                      {cat.status}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-[12px] text-gray-500 leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                    {cat.description || "No description added."}
                  </p>

                  {/* Progress bar — products relative to max */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                      <span>Products</span>
                      <span>{cat.productCount}</span>
                    </div>
                    <div className="h-1.5 bg-[#f5ede0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C9B194] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((cat.productCount / 50) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditTarget(cat)}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-[#ede5da] hover:border-[#C9B194] text-gray-600 hover:text-[#C9B194] text-[12px] font-medium py-2 rounded-xl transition-all"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => setDelTarget(cat)}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-[#ede5da] hover:border-red-300 text-gray-600 hover:text-red-500 text-[12px] font-medium py-2 rounded-xl transition-all"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Result count footer */}
        {visible.length > 0 && (
          <p className="text-[11px] text-gray-400 text-center">
            Showing {visible.length} of {categories.length} categories
          </p>
        )}
      </div>

      {/* ── Add Modal ── */}
      {showForm && (
        <CategoryFormModal
          initial={null}
          onSave={handleAdd}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* ── Edit Modal ── */}
      {editTarget && (
        <CategoryFormModal
          initial={editTarget}
          onSave={handleEdit}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* ── Delete Modal ── */}
      {delTarget && (
        <DeleteModal
          category={delTarget}
          onConfirm={handleDelete}
          onCancel={() => setDelTarget(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[12px] font-medium px-5 py-2.5 rounded-full shadow-xl z-50 animate-[fadeUp_0.3s_ease] whitespace-nowrap">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}
