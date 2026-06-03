// ── Categories Data ──
const categories = [
  { icon: "🛋️", label: "Furniture" },
  { icon: "💡", label: "Lighting" },
  { icon: "🎧", label: "Electronics" },
  { icon: "👗", label: "Fashion" },
  { icon: "🌿", label: "Plants" },
  { icon: "🍳", label: "Kitchen" },
];

export default function Categories() {
  return (
    <section className="bg-white py-12 px-5 sm:px-8 lg:px-12">
      {/* Heading */}
      <div className="text-center mb-8">
        <p className="text-xs font-medium tracking-widest text-[#C9B194] uppercase mb-1">
          Shop by
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Categories
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-3xl mx-auto">
        {categories.map(({ icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#fdf9f5] hover:bg-[#f5ede0] border border-[#ede5da] hover:border-[#C9B194] hover:scale-105 transition-all duration-200 group"
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-[12px] font-medium text-gray-600 group-hover:text-[#9a7f5e]">
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
