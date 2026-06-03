// import { useNavigate } from "react-router-dom";

export default function WishlistCard({ item, onRemove }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#ede5da] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[#f5ede0]">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-2 left-2 bg-[#1a1a1a] text-white text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wide uppercase">
          {item.category || "Saved"}
        </span>

        {/* Remove (heart) button */}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="#C9B194"
            stroke="#C9B194"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[10px] text-[#C9B194] font-medium uppercase tracking-wider mb-0.5">
          {item.category || "Uncategorized"}
        </p>
        <p className="text-[13px] font-medium text-gray-800 truncate mb-1">
          {item.name}
        </p>
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-[14px] font-bold text-gray-900">
            ₹{item.price}
          </span>
          {item.original && (
            <span className="text-[11px] text-gray-400 line-through">
              ₹{item.original}
            </span>
          )}
        </div>
        <button className="w-full bg-[#C9B194] hover:bg-[#b89e7e] text-white text-[12px] font-medium py-2 rounded-xl transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
