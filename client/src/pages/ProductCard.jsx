import { useState } from "react";
import useWishlist from "../hooks/useWishlist";
import { useCartContext } from "../context/CartContext";

export default function ProductCard({ item }) {
  const { addToCart, isInCart } = useCartContext();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [added, setAdded] = useState(false);

  // MongoDB product ID
  const productId = item._id;

  const wishlisted = isWishlisted(productId);
  const inCart = isInCart(productId);

  // Discount supplied by backend
  const discount = item.discountPercentage > 0 ? item.discountPercentage : null;

  const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart(item);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(item);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#ede5da] hover:border-[#C9B19460] hover:shadow-[0_8px_30px_#C9B19420] hover:-translate-y-1 transition-all duration-300">
      {/* ================================================= */}
      {/* PRODUCT IMAGE */}
      {/* ================================================= */}

      <div className="relative overflow-hidden bg-[#fdf5ec] h-48 sm:h-52">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}

        {/* ================================================= */}
        {/* DISCOUNT BADGE */}
        {/* ================================================= */}

        {discount && (
          <span className="absolute top-2.5 left-2.5 bg-green-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}

        {/* ================================================= */}
        {/* PRODUCT TAGS */}
        {/* ================================================= */}

        {!discount && item.newArrival && (
          <span className="absolute top-2.5 left-2.5 bg-[#C9B194] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            New
          </span>
        )}

        {!discount && item.featured && (
          <span className="absolute top-2.5 left-2.5 bg-[#1a1a1a] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}

        {/* ================================================= */}
        {/* WISHLIST */}
        {/* ================================================= */}

        <button
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={wishlisted ? "#C9B194" : "none"}
            stroke="#C9B194"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* ================================================= */}
        {/* QUICK ADD */}
        {/* ================================================= */}

        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full text-white text-[12px] font-medium py-2.5 transition-colors duration-200 ${
              added
                ? "bg-green-600"
                : inCart
                  ? "bg-[#C9B194] hover:bg-[#b89e7e]"
                  : "bg-[#1a1a1a]/90 hover:bg-[#1a1a1a]"
            }`}
          >
            {added ? "✓ Added!" : inCart ? "Add More" : "Quick Add to Cart"}
          </button>
        </div>
      </div>

      {/* ================================================= */}
      {/* PRODUCT INFORMATION */}
      {/* ================================================= */}

      <div className="p-3.5">
        {/* Category */}
        <p className="text-[10px] font-medium text-[#C9B194] uppercase tracking-widest mb-0.5">
          {item.category || "General"}
        </p>

        {/* Product Name */}
        <p className="text-[13.5px] font-medium text-gray-800 truncate mb-2">
          {item.name}
        </p>

        {/* ================================================= */}
        {/* RATING */}
        {/* ================================================= */}

        {item.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill={star <= Math.round(item.rating) ? "#C9B194" : "none"}
                stroke="#C9B194"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}

            <span className="text-[10px] text-gray-400 ml-0.5">
              ({item.numReviews || 0})
            </span>
          </div>
        )}

        {/* ================================================= */}
        {/* PRICE */}
        {/* ================================================= */}

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            {/* Selling Price */}
            <span className="text-[15px] font-bold text-gray-900">
              ₹{Number(item.price || 0).toLocaleString("en-IN")}
            </span>

            {/* Original Price */}
            {item.originalPrice &&
              Number(item.originalPrice) > Number(item.price) && (
                <span className="text-[11px] text-gray-400 line-through">
                  ₹{Number(item.originalPrice).toLocaleString("en-IN")}
                </span>
              )}

            {/* Discount */}
            {discount && (
              <span className="text-[10px] font-semibold text-green-600">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
              added
                ? "bg-green-500 scale-110"
                : "bg-[#1a1a1a] hover:bg-[#C9B194]"
            }`}
          >
            {added ? (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            )}
          </button>
        </div>

        {/* Already in cart */}
        {inCart && !added && (
          <p className="text-[10px] text-[#C9B194] font-medium mt-1.5 flex items-center gap-1">
            <svg
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Already in cart
          </p>
        )}
      </div>
    </div>
  );
}
