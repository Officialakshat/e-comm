// ── Best Deals Data ──
const bestDeals = [
  {
    id: 1,
    name: "Boho Floor Lamp",
    price: 3499,
    original: 6999,
    discount: 50,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
    endsIn: "02:14:36",
  },
  {
    id: 2,
    name: "Minimalist Wall Art Set",
    price: 1199,
    original: 2499,
    discount: 52,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80",
    endsIn: "05:40:10",
  },
  {
    id: 3,
    name: "Aromatic Candle Bundle",
    price: 449,
    original: 899,
    discount: 50,
    img: "https://houseofaroma.in/wp-content/uploads/2023/10/simple-Pleasures-gift-sets-1.webp",
    endsIn: "01:08:55",
  },
];
export default function BestDeals() {
  return (
    <section className="bg-[#1a1a1a] py-12 px-5 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 max-w-6xl mx-auto">
        <div>
          <p className="text-xs font-medium tracking-widest text-[#C9B194] uppercase mb-1">
            Limited Time
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Best Deals
          </h2>
        </div>
        <a
          href="#"
          className="hidden sm:block text-sm text-[#C9B194] hover:text-[#e8d5bb] font-medium transition-colors"
        >
          View all →
        </a>
      </div>

      {/* Deal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {bestDeals.map((deal, i) => (
          <div
            key={deal.id}
            className="group relative bg-[#242424] rounded-2xl overflow-hidden border border-white/10 hover:border-[#C9B19450] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            {/* Discount ribbon */}
            <div className="absolute top-3 left-3 z-10 bg-[#C9B194] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              -{deal.discount}%
            </div>

            {/* Image */}
            <div className="h-52 overflow-hidden bg-[#2e2e2e]">
              <img
                src={deal.img}
                alt={deal.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
            </div>

            {/* Body */}
            <div className="p-4">
              {/* Countdown */}
              <div className="flex items-center gap-1.5 mb-3">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9B194"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-[11px] text-gray-400">Ends in</span>
                <span className="text-[11px] font-bold text-[#C9B194] font-mono">
                  {deal.endsIn}
                </span>
              </div>

              <p className="text-[14px] font-semibold text-white mb-2 truncate">
                {deal.name}
              </p>

              {/* Pricing */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-white">
                  ₹{deal.price.toLocaleString()}
                </span>
                <span className="text-[12px] text-gray-500 line-through">
                  ₹{deal.original.toLocaleString()}
                </span>
                <span className="ml-auto text-[11px] text-green-400 font-medium">
                  Save ₹{(deal.original - deal.price).toLocaleString()}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                  <span>Selling fast</span>
                  <span>{60 + i * 12}% sold</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9B194] rounded-full"
                    style={{ width: `${60 + i * 12}%` }}
                  />
                </div>
              </div>

              <button className="w-full bg-[#C9B194] hover:bg-[#b89e7e] text-white text-[13px] font-medium py-2.5 rounded-xl transition-colors duration-200">
                Grab Deal
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view all */}
      <div className="text-center mt-6 sm:hidden">
        <a href="#" className="text-sm text-[#C9B194] font-medium">
          View all deals →
        </a>
      </div>
    </section>
  );
}
