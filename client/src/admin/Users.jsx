import { useEffect, useState } from "react";
import { badgeStyle } from "../data/AdminData";
import { getAllUsers } from "../services/users";

// ── Delete confirm modal ────────────────────────────────
function DeleteModal({ user, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-3xl border border-[#ede5da] shadow-2xl w-full max-w-sm p-6 z-10">
        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h3
          className="text-[16px] font-bold text-gray-900 text-center mb-1"
          style={{ fontFamily: "Georgia,serif" }}
        >
          Remove User?
        </h3>
        <p className="text-[12px] text-gray-500 text-center mb-5">
          <span className="font-semibold text-gray-700">{user?.name}</span> will
          be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-[#ede5da] text-gray-600 text-[13px] font-medium py-2.5 rounded-xl hover:border-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-[13px] font-medium py-2.5 rounded-xl transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Edit User Modal ─────────────────────────────────────
function EditModal({ user, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    badge: user.badge,
  });

  const save = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    onSave({ ...user, ...form });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-3xl border border-[#ede5da] shadow-2xl w-full max-w-sm p-6 z-10">
        <h3
          className="text-[16px] font-bold text-gray-900 mb-5"
          style={{ fontFamily: "Georgia,serif" }}
        >
          Edit User
        </h3>

        <div className="space-y-4">
          {[
            ["Full Name", "name", "text"],
            ["Email", "email", "email"],
          ].map(([label, key, type]) => (
            <div key={key}>
              <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
                {label}
              </label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                className="w-full bg-[#fdf9f5] border border-[#ede5da] rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-[#C9B194] focus:ring-2 focus:ring-[#C9B19425] transition-all"
              />
            </div>
          ))}
          <div>
            <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1">
              Badge
            </label>
            <select
              value={form.badge}
              onChange={(e) =>
                setForm((f) => ({ ...f, badge: e.target.value }))
              }
              className="w-full bg-[#fdf9f5] border border-[#ede5da] rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-[#C9B194] transition-all"
            >
              <option>New</option>
              <option>Regular</option>
              <option>Premium</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onCancel}
            className="flex-1 border border-[#ede5da] text-gray-600 text-[13px] py-2.5 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="flex-1 bg-[#1a1a1a] hover:bg-[#C9B194] text-white text-[13px] font-medium py-2.5 rounded-xl transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Users Page ─────────────────────────────────────
const BADGE_FILTERS = ["All", "Premium", "Regular", "New"];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null); // detail view
  const [toDelete, setToDelete] = useState(null);
  const [toEdit, setToEdit] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllUsers();

      setUsers(data.users || []);
    } catch (error) {
      console.error("Fetch Users Error:", error);

      setError(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const visible = users.filter((u) => {
    const matchBadge = filter === "All" || u.badge === filter;
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchBadge && matchSearch;
  });

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== toDelete.id));
    if (selected?.id === toDelete.id) setSelected(null);
    showToast(`${toDelete.name} removed`);
    setToDelete(null);
  };

  const handleEdit = (updated) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    if (selected?.id === updated.id) setSelected(updated);
    showToast("User updated successfully");
    setToEdit(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-5 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-7">
          <p className="text-[11px] font-medium tracking-widest text-[#C9B194] uppercase mb-1">
            Admin
          </p>
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Georgia,serif" }}
          >
            Users Management
          </h1>
        </div>

        {/* Stat pills */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            {
              label: "Total Users",
              value: users.length,
              bg: "bg-[#fdf0e2]",
              icon: "👥",
            },
            {
              label: "Premium Users",
              value: users.filter((u) => u.badge === "Premium").length,
              bg: "bg-[#f0f9f4]",
              icon: "⭐",
            },
            {
              label: "New Users",
              value: users.filter((u) => u.badge === "New").length,
              bg: "bg-[#eff6ff]",
              icon: "🆕",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-[#ede5da] p-4 flex items-center gap-3"
            >
              <div
                className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center text-lg shrink-0`}
              >
                {s.icon}
              </div>
              <div>
                <p className="text-[18px] font-bold text-gray-900 leading-none">
                  {s.value}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex items-center bg-white border border-[#ede5da] rounded-full flex-1 focus-within:border-[#C9B194] focus-within:ring-[3px] focus-within:ring-[#C9B19428] transition-all">
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
              placeholder="Search by name or email…"
              className="flex-1 bg-transparent outline-none border-none px-3 py-2.5 text-[13.5px] placeholder-[#b0a090]"
            />
          </div>
          <div className="flex gap-1.5">
            {BADGE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-full text-[11px] font-medium border transition-all ${
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

        {/* Main layout */}
        <div
          className={`grid gap-5 ${selected ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {/* User list */}
          <div
            className={`bg-white rounded-2xl border border-[#ede5da] overflow-hidden ${selected ? "lg:col-span-2" : ""}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#fdf9f5] border-b border-[#ede5da] text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="px-5 py-3">User</th>
                    <th className="px-5 py-3">Orders</th>
                    <th className="px-5 py-3">Total Spent</th>
                    <th className="px-5 py-3">Badge</th>
                    <th className="px-5 py-3">Joined</th>
                    <th className="px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5ede0]">
                  {visible.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-12 text-center text-[13px] text-gray-400"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    visible.map((u) => (
                      <tr
                        key={u.id}
                        onClick={() =>
                          setSelected(selected?.id === u.id ? null : u)
                        }
                        className={`cursor-pointer transition-colors ${
                          selected?.id === u.id
                            ? "bg-[#fdf5ec]"
                            : "hover:bg-[#fdf9f5]"
                        }`}
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#C9B194]/20 text-[#C9B194] text-[10px] font-bold flex items-center justify-center shrink-0">
                              {u.avatar}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[12.5px] font-semibold text-gray-800 truncate">
                                {u.name}
                              </p>
                              <p className="text-[10px] text-gray-400 truncate">
                                {u.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-[12px] font-semibold text-gray-700">
                          {u.orders}
                        </td>
                        <td className="px-5 py-3 text-[12px] font-bold text-gray-900">
                          ₹{u.spent.toLocaleString()}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`text-[9px] font-semibold px-2.5 py-1 rounded-full ${badgeStyle[u.badge]}`}
                          >
                            {u.badge}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-[11px] text-gray-400">
                          {u.joined}
                        </td>
                        <td className="px-5 py-3">
                          <div
                            className="flex gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => setToEdit(u)}
                              className="text-[11px] text-[#C9B194] hover:text-[#9a7f5e] font-medium transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setToDelete(u)}
                              className="text-[11px] text-red-400 hover:text-red-600 font-medium transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-[#f5ede0] bg-[#fdf9f5]">
              <p className="text-[11px] text-gray-400">
                {users.length} user{users.length !== 1 ? "s" : ""} total
              </p>
            </div>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="bg-white rounded-2xl border border-[#C9B194] p-5 self-start">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-[14px] font-semibold text-gray-900">
                  User Detail
                </h4>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  ×
                </button>
              </div>

              {/* Avatar + name */}
              <div className="flex flex-col items-center text-center mb-5">
                <div className="w-16 h-16 rounded-2xl bg-[#C9B194] flex items-center justify-center text-white text-xl font-bold mb-3">
                  {selected.avatar}
                </div>
                <p className="text-[15px] font-bold text-gray-900">
                  {selected.name}
                </p>
                <p className="text-[11px] text-gray-500">{selected.email}</p>
                <span
                  className={`mt-2 text-[9px] font-semibold px-2.5 py-1 rounded-full ${badgeStyle[selected.badge]}`}
                >
                  {selected.badge}
                </span>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[
                  { label: "Orders", value: selected.orders },
                  {
                    label: "Total Spent",
                    value: `₹${selected.spent.toLocaleString()}`,
                  },
                  { label: "Member Since", value: selected.joined },
                  {
                    label: "User ID",
                    value: `#U-${selected.id.toString().padStart(4, "0")}`,
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#fdf9f5] rounded-xl p-2.5 border border-[#f0e8df]"
                  >
                    <p className="text-[9px] text-[#C9B194] font-medium uppercase tracking-widest">
                      {s.label}
                    </p>
                    <p className="text-[13px] font-bold text-gray-900 mt-0.5">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => setToEdit(selected)}
                  className="w-full bg-[#1a1a1a] hover:bg-[#C9B194] text-white text-[12px] font-medium py-2.5 rounded-xl transition-colors"
                >
                  Edit User
                </button>
                <button
                  onClick={() => setToDelete(selected)}
                  className="w-full border border-red-200 hover:bg-red-50 text-red-500 text-[12px] font-medium py-2.5 rounded-xl transition-colors"
                >
                  Remove User
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {toDelete && (
        <DeleteModal
          user={toDelete}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
      {toEdit && (
        <EditModal
          user={toEdit}
          onSave={handleEdit}
          onCancel={() => setToEdit(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[12px] font-medium px-5 py-2.5 rounded-full shadow-lg z-50 animate-[fadeUp_0.3s_ease]">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}
