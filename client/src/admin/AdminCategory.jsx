import { useEffect, useState } from "react";

import {
  createCategory,
  deleteCategory,
  getAdminCategories,
  updateCategory,
} from "../services/categories";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [delTarget, setDelTarget] = useState(null);

  const [toast, setToast] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // TOAST
  // ===============================

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  // ===============================
  // FETCH CATEGORIES
  // ===============================

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminCategories();

      setCategories(data.categories || []);
    } catch (err) {
      console.error("Fetch categories error:", err);

      setError(err.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // LOAD ON PAGE OPEN
  // ===============================

  useEffect(() => {
    fetchCategories();
  }, []);

  // ===============================
  // ADD CATEGORY
  // ===============================

  const handleAdd = async (data) => {
    try {
      const response = await createCategory(data);

      setCategories((prev) =>
        [...prev, response.category].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      );

      showToast(`"${data.name}" category added`);

      setShowForm(false);
    } catch (err) {
      console.error("Add category error:", err);

      showToast(err.response?.data?.message || "Failed to add category");
    }
  };

  // ===============================
  // EDIT CATEGORY
  // ===============================

  const handleEdit = async (data) => {
    try {
      const response = await updateCategory(editTarget._id, data);

      setCategories((prev) =>
        prev
          .map((category) =>
            category._id === editTarget._id ? response.category : category,
          )
          .sort((a, b) => a.name.localeCompare(b.name)),
      );

      showToast(`"${data.name}" updated`);

      setEditTarget(null);
    } catch (err) {
      console.error("Update category error:", err);

      showToast(err.response?.data?.message || "Failed to update category");
    }
  };

  // ===============================
  // DELETE CATEGORY
  // ===============================

  const handleDelete = async () => {
    try {
      await deleteCategory(delTarget._id);

      setCategories((prev) =>
        prev.filter((category) => category._id !== delTarget._id),
      );

      showToast(`"${delTarget.name}" deleted`);

      setDelTarget(null);
    } catch (err) {
      console.error("Delete category error:", err);

      showToast(err.response?.data?.message || "Failed to delete category");
    }
  };

  // ===============================
  // TOGGLE ACTIVE / INACTIVE
  // ===============================

  const toggleStatus = async (category) => {
    try {
      const newStatus = !category.isActive;

      const response = await updateCategory(category._id, {
        isActive: newStatus,
      });

      setCategories((prev) =>
        prev.map((item) =>
          item._id === category._id ? response.category : item,
        ),
      );

      showToast(
        `"${category.name}" is now ${newStatus ? "Active" : "Inactive"}`,
      );
    } catch (err) {
      console.error("Toggle status error:", err);

      showToast(err.response?.data?.message || "Failed to update status");
    }
  };

  // ===============================
  // SEARCH + FILTER
  // ===============================

  const visible = categories.filter((category) => {
    const matchSearch = category.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ||
      (filter === "Active" && category.isActive) ||
      (filter === "Inactive" && !category.isActive);

    return matchSearch && matchFilter;
  });

  // ===============================
  // STATISTICS
  // ===============================

  const activeCount = categories.filter((category) => category.isActive).length;

  const inactiveCount = categories.length - activeCount;

  // Product count is not currently stored in the Category schema.
  // We will connect actual product counts separately.

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f3] p-5 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#ede5da] p-10 text-center">
            <p className="text-[13px] text-gray-500">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // ERROR
  // ===============================

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f6f3] p-5 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border border-red-200 p-10 text-center">
            <p className="text-[13px] text-red-500">{error}</p>

            <button
              onClick={fetchCategories}
              className="mt-4 bg-[#1a1a1a] text-white text-[12px] px-5 py-2.5 rounded-xl"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-5 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* PAGE HEADING */}

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

        {/* STAT CARDS */}

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
              value: inactiveCount,
              icon: "⛔",
              bg: "bg-red-50",
            },
            {
              label: "Product Counts",
              value: "—",
              icon: "🏷️",
              bg: "bg-[#eff6ff]",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-[#ede5da] p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center text-xl mb-3`}
              >
                {stat.icon}
              </div>

              <p className="text-[22px] font-bold text-gray-900 leading-none">
                {stat.value}
              </p>

              <p className="text-[11px] text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* SEARCH + FILTER */}

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
              placeholder="Search categories..."
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

        {/* CATEGORY GRID */}

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
                key={cat._id}
                className={`group bg-white rounded-2xl border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden ${
                  cat.isActive
                    ? "border-[#ede5da]"
                    : "border-dashed border-gray-300 opacity-70"
                }`}
              >
                {/* STRIP */}

                <div className="h-1.5 bg-gradient-to-r from-[#C9B194] to-[#e8d5bb]" />

                <div className="p-4">
                  {/* ICON + NAME + STATUS */}

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#fdf0e2] rounded-2xl flex items-center justify-center text-2xl shrink-0">
                        📂
                      </div>

                      <div>
                        <h3 className="text-[14px] font-semibold text-gray-900">
                          {cat.name}
                        </h3>

                        <p className="text-[11px] text-gray-400">
                          Slug: {cat.slug}
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}

                    <button
                      onClick={() => toggleStatus(cat)}
                      className={`text-[9px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                        cat.isActive
                          ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      }`}
                    >
                      {cat.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>

                  {/* DESCRIPTION */}

                  <p className="text-[12px] text-gray-500 leading-relaxed mb-5 line-clamp-2 min-h-10">
                    {cat.description || "No description added."}
                  </p>

                  {/* ACTIONS */}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditTarget(cat)}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-[#ede5da] hover:border-[#C9B194] text-gray-600 hover:text-[#C9B194] text-[12px] font-medium py-2 rounded-xl transition-all"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDelTarget(cat)}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-[#ede5da] hover:border-red-300 text-gray-600 hover:text-red-500 text-[12px] font-medium py-2 rounded-xl transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RESULT COUNT */}

        {visible.length > 0 && (
          <p className="text-[11px] text-gray-400 text-center">
            Showing {visible.length} of {categories.length} categories
          </p>
        )}
      </div>

      {/* ADD MODAL */}

      {showForm && (
        <CategoryFormModal
          initial={null}
          onSave={handleAdd}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* EDIT MODAL */}

      {editTarget && (
        <CategoryFormModal
          initial={editTarget}
          onSave={handleEdit}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* DELETE MODAL */}

      {delTarget && (
        <DeleteModal
          category={delTarget}
          onConfirm={handleDelete}
          onCancel={() => setDelTarget(null)}
        />
      )}

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[12px] font-medium px-5 py-2.5 rounded-full shadow-xl z-50 whitespace-nowrap">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}

// =====================================
// CATEGORY FORM MODAL
// ADD + EDIT
// =====================================

function CategoryFormModal({ initial, onSave, onClose }) {
  const [name, setName] = useState(initial?.name || "");

  const [description, setDescription] = useState(initial?.description || "");

  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter category name");
      return;
    }

    try {
      setSaving(true);

      await onSave({
        name: name.trim(),
        description: description.trim(),
        isActive,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            {initial ? "Edit Category" : "Add Category"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CATEGORY NAME */}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Category Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="w-full border border-[#ede5da] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9B194]"
              required
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
              rows="3"
              className="w-full border border-[#ede5da] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9B194] resize-none"
            />
          </div>

          {/* CATEGORY STATUS */}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Category Status
            </label>

            <select
              value={isActive ? "Active" : "Inactive"}
              onChange={(e) => setIsActive(e.target.value === "Active")}
              className="w-full border border-[#ede5da] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9B194] bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <p className="text-[11px] text-gray-400 mt-2">
              Inactive categories will not be displayed to customers.
            </p>
          </div>

          {/* BUTTONS */}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 border border-[#ede5da] rounded-xl py-3 text-sm text-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#1a1a1a] hover:bg-[#C9B194] text-white rounded-xl py-3 text-sm disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : initial
                  ? "Update Category"
                  : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =====================================
// DELETE CONFIRMATION MODAL
// =====================================

function DeleteModal({ category, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-2xl mb-4">
          🗑️
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Delete Category?
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete "{category.name}"? This action cannot
          be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-[#ede5da] rounded-xl py-3 text-sm text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
