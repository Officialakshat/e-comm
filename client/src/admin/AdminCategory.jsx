import { useState } from "react";
import { useEffect } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
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

  const showToast = (msg) => {
    setToast(msg);

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

      const data = await getCategories();

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
  // ADD
  // ===============================

  const handleAdd = async (data) => {
    try {
      const response = await createCategory(data);

      setCategories((prev) => [...prev, response.category]);

      showToast(`"${data.name}" category added`);

      setShowForm(false);
    } catch (err) {
      console.error("Add category error:", err);

      showToast(err.response?.data?.message || "Failed to add category");
    }
  };

  // ===============================
  // EDIT
  // ===============================

  const handleEdit = async (data) => {
    try {
      const response = await updateCategory(editTarget._id, data);

      setCategories((prev) =>
        prev.map((category) =>
          category._id === editTarget._id ? response.category : category,
        ),
      );

      showToast(`"${data.name}" updated`);

      setEditTarget(null);
    } catch (err) {
      console.error("Update category error:", err);

      showToast(err.response?.data?.message || "Failed to update category");
    }
  };

  // ===============================
  // DELETE
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
  // TOGGLE STATUS
  // ===============================

  const toggleStatus = async (category) => {
    try {
      const newStatus = category.status === "Active" ? "Inactive" : "Active";

      const response = await updateCategory(category._id, {
        status: newStatus,
      });

      setCategories((prev) =>
        prev.map((item) =>
          item._id === category._id ? response.category : item,
        ),
      );

      showToast(`"${category.name}" is now ${newStatus}`);
    } catch (err) {
      console.error("Toggle status error:", err);

      showToast(err.response?.data?.message || "Failed to update status");
    }
  };

  // ===============================
  // SEARCH + FILTER
  // ===============================

  const visible = categories.filter((category) => {
    const matchSearch =
      !search || category.name.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" || category.status === filter;

    return matchSearch && matchFilter;
  });

  // ===============================
  // STATS
  // ===============================

  const totalProducts = categories.reduce(
    (total, category) => total + (category.productCount || 0),
    0,
  );

  const activeCount = categories.filter(
    (category) => category.status === "Active",
  ).length;

  const inactiveCount = categories.length - activeCount;

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
              style={{
                fontFamily: "Georgia,serif",
              }}
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
                  cat.status === "Active"
                    ? "border-[#ede5da]"
                    : "border-dashed border-gray-300 opacity-70"
                }`}
              >
                {/* STRIP */}

                <div className="h-1.5 bg-linear-to-r from-[#C9B194] to-[#e8d5bb]" />

                <div className="p-4">
                  {/* ICON + NAME + STATUS */}

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
                          {cat.productCount || 0} products
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}

                    <button
                      onClick={() => toggleStatus(cat)}
                      className={`text-[9px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                        cat.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      }`}
                    >
                      {cat.status}
                    </button>
                  </div>

                  {/* DESCRIPTION */}

                  <p className="text-[12px] text-gray-500 leading-relaxed mb-4 line-clamp-2 min-h-10">
                    {cat.description || "No description added."}
                  </p>

                  {/* PRODUCT PROGRESS */}

                  <div className="mb-4">
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                      <span>Products</span>

                      <span>{cat.productCount || 0}</span>
                    </div>

                    <div className="h-1.5 bg-[#f5ede0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C9B194] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            ((cat.productCount || 0) / 50) * 100,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

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

      {/* ADD */}

      {showForm && (
        <CategoryFormModal
          initial={null}
          onSave={handleAdd}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* EDIT */}

      {editTarget && (
        <CategoryFormModal
          initial={editTarget}
          onSave={handleEdit}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* DELETE */}

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
