import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

function Checkout() {
  const navigate = useNavigate();

  const { cart, updateQty, removeFromCart, cartTotal } = useCartContext();

  const shippingCharge = cart.length > 0 ? 0 : 0;
  const totalAmount = cartTotal + shippingCharge;

  // Empty Cart
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#fdf9f5] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 text-6xl">🛒</div>

          <h1 className="text-2xl font-semibold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add some products before proceeding to checkout.
          </p>

          <Link
            to="/productsListing"
            className="mt-6 inline-block rounded-xl bg-[#1a1a1a] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#C9B194]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdf9f5] px-4 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9B194]">
            UrbanMart
          </p>

          <h1
            className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review your shopping cart before placing your order.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Products */}
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-2xl border border-[#ede5da] bg-white p-5 sm:p-7">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Order Items ({cart.length})
              </h2>

              <div className="space-y-6">
                {cart.map((item) => {
                  const productId = item._id || item.id;

                  return (
                    <div
                      key={productId}
                      className="flex flex-col gap-4 border-b border-[#ede5da] pb-6 last:border-0 last:pb-0 sm:flex-row"
                    >
                      {/* Product Image */}
                      <div className="flex h-28 w-full items-center justify-center rounded-xl bg-[#f7f5f2] sm:w-28">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full rounded-xl object-contain p-2"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            No image
                          </span>
                        )}
                      </div>

                      {/* Product Information */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>

                          {item.brand && (
                            <p className="mt-1 text-xs text-gray-500">
                              Brand: {item.brand}
                            </p>
                          )}

                          <p className="mt-2 text-sm font-semibold text-[#9a7f5e]">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center overflow-hidden rounded-lg border border-[#ede5da]">
                            <button
                              onClick={() => updateQty(productId, item.qty - 1)}
                              disabled={item.qty <= 1}
                              className="px-3 py-1.5 hover:bg-[#f7f5f2] disabled:opacity-40"
                            >
                              −
                            </button>

                            <span className="min-w-10 text-center text-sm">
                              {item.qty}
                            </span>

                            <button
                              onClick={() => updateQty(productId, item.qty + 1)}
                              disabled={
                                Number.isFinite(Number(item.stock)) &&
                                item.qty >= Number(item.stock)
                              }
                              className="px-3 py-1.5 hover:bg-[#f7f5f2] disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>

                          {/* Item Total */}
                          <p className="text-sm font-semibold text-gray-900">
                            {formatPrice(item.price * item.qty)}
                          </p>

                          {/* Remove Item */}
                          <button
                            onClick={() => removeFromCart(productId)}
                            className="text-xs font-medium text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link
              to="/productsListing"
              className="inline-block text-sm font-medium text-[#80684f] hover:text-[#9a7f5e]"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-[#ede5da] bg-white p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="border-t border-[#ede5da] pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">
                      Total Amount
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-7 w-full rounded-xl bg-[#1a1a1a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#C9B194]"
              >
                Proceed to Place Order
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                Your order will be reviewed before confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
