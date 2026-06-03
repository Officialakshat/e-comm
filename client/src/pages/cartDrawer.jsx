// components/CartDrawer.jsx

import { useCartContext } from "../context/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { cart, updateQty, removeFromCart, cartTotal, clearCart } =
    useCartContext();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#ede5da]">
          <div className="flex items-center gap-2">
            <h2
              className="text-lg font-bold text-gray-900"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Your Cart
            </h2>
            {cart.length > 0 && (
              <span className="text-[11px] bg-[#C9B194] text-white font-semibold px-2 py-0.5 rounded-full">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
            <div className="w-20 h-20 bg-[#fdf5ec] rounded-full flex items-center justify-center">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9B194"
                strokeWidth="1.2"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500">
              Your cart is empty
            </p>
            <p className="text-xs text-gray-400">Add items to get started</p>
            <button
              onClick={onClose}
              className="mt-1 bg-[#1a1a1a] hover:bg-[#C9B194] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 items-start p-3 bg-[#fdf9f5] rounded-2xl border border-[#ede5da]"
                >
                  {/* Image */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-[#f5ede0] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#C9B194] font-medium uppercase tracking-widest">
                      {item.category}
                    </p>
                    <p className="text-[13px] font-medium text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-[13px] font-bold text-gray-900 mt-0.5">
                      ₹{(item.price * item.qty).toLocaleString()}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-6 h-6 rounded-lg border border-[#ede5da] bg-white flex items-center justify-center text-gray-600 hover:border-[#C9B194] hover:text-[#C9B194] text-sm font-bold transition-colors"
                      >
                        −
                      </button>
                      <span className="text-[13px] font-semibold w-5 text-center text-gray-800">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-6 h-6 rounded-lg border border-[#ede5da] bg-white flex items-center justify-center text-gray-600 hover:border-[#C9B194] hover:text-[#C9B194] text-sm font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors shrink-0"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-[#ede5da] space-y-3 bg-white">
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Delivery</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-[13px] pt-2 border-t border-[#ede5da]">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-gray-900 text-[15px]">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>
              <button className="w-full bg-[#1a1a1a] hover:bg-[#C9B194] text-white font-medium py-3.5 rounded-xl text-[14px] transition-colors duration-200">
                Checkout — ₹{cartTotal.toLocaleString()}
              </button>
              <button
                onClick={onClose}
                className="w-full border border-[#ede5da] hover:border-[#C9B194] text-gray-600 hover:text-[#C9B194] font-medium py-2.5 rounded-xl text-[13px] transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
