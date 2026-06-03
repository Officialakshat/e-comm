const brands = [
  { name: "IKEA", bg: "#0051BA", text: "#FFD700" },
  { name: "Sony", bg: "#000", text: "#fff" },
  { name: "H&M", bg: "#E50010", text: "#fff" },
  { name: "Apple", bg: "#f5f5f7", text: "#1d1d1f" },
  { name: "Nike", bg: "#111", text: "#fff" },
  { name: "Zara", bg: "#fff", text: "#111" },
];
export default function Brands() {
  return (
    <section className="bg-[#fdf9f5] py-12 px-5 sm:px-8 lg:px-12 border-y border-[#ede5da]">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs font-medium tracking-widest text-[#C9B194] uppercase mb-2">
          Trusted By
        </p>
        <h2
          className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-8"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Top Brands
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {brands.map(({ name, bg, text }) => (
            <div
              key={name}
              className="flex items-center justify-center h-16 py-6 rounded-2xl border border-[#ede5da] hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer font-bold text-sm tracking-wider"
              style={{ background: bg, color: text }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
