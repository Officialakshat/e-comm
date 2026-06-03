import WishlistCard from "../components/WishlistCards";
import useWishlist from "../hooks/useWishlist";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-[#fdf9f5] px-5 sm:px-8 lg:px-12 py-12">
      <div className="max-w-6xl mx-auto mb-8">
        <p className="text-xs font-medium tracking-widest text-[#C9B194] uppercase mb-1">
          Your Collection
        </p>
        <div className="flex items-end justify-between">
          <h1
            className="text-2xl sm:text-3xl font-bold text-gray-900"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Wishlist
            <span className="ml-2 text-base font-normal text-gray-400">
              ({wishlist.length} items)
            </span>
          </h1>
          {wishlist.length > 0 && (
            <button className="hidden sm:block text-sm text-[#C9B194] hover:text-[#9a7f5e] font-medium transition-colors">
              Add all to Cart →
            </button>
          )}
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9B194"
            strokeWidth="1.2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="text-base font-medium text-gray-500">
            Your wishlist is empty
          </p>
          <p className="text-sm text-gray-400">
            Browse products and hit the ♡ to save them here
          </p>
          <a
            href="/"
            className="mt-2 bg-[#1a1a1a] hover:bg-[#C9B194] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors duration-200"
          >
            Browse Products
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {wishlist.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={removeFromWishlist}
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <button className="text-sm text-[#C9B194] font-medium">
              Add all to Cart →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
