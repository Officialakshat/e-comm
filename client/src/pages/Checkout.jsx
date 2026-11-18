import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { createOrder } from "../services/orders";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

function Checkout() {
  const navigate = useNavigate();

  const { cart, updateQty, removeFromCart, cartTotal, clearCart } =
    useCartContext();

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shippingPrice = 0;
  const totalPrice = cartTotal + shippingPrice;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Convert cart items into backend order format
      const orderItems = cart.map((item) => ({
        product: item._id || item.id,
        quantity: item.qty,
      }));

      const orderData = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,

        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },

        paymentMethod: "Cash on Delivery",
        orderItems,
      };

      // Send order to backend
      const response = await createOrder(orderData);

      if (!response.success || !response.order?._id) {
        throw new Error(response.message || "Unable to place your order.");
      }

      // Clear cart only after successful order creation
      clearCart();

      // Navigate to confirmation page
      navigate(`/order-confirmation/${response.order._id}`);
    } catch (err) {
      console.error("Place Order Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Empty cart
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#fdf9f5] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 text-6xl">🛒</div>

          <h1 className="text-2xl font-semibold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add products before proceeding to checkout.
          </p>

          <Link
            to="/productsListing"
            className="mt-6 inline-block rounded-xl bg-[#1a1a1a] px-7 py-3 text-sm font-medium text-white hover:bg-[#C9B194]"
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
        {/* Heading */}
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
            Enter your delivery details to complete your order.
          </p>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {/* Customer Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Customer Details */}
            <section className="rounded-2xl border border-[#ede5da] bg-white p-5 sm:p-7">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Customer Information
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    maxLength={100}
                    className="w-full rounded-lg border border-[#ede5da] px-4 py-3 text-sm outline-none focus:border-[#C9B194]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    pattern="[+]?[0-9 -]{7,15}"
                    required
                    className="w-full rounded-lg border border-[#ede5da] px-4 py-3 text-sm outline-none focus:border-[#C9B194]"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="rounded-2xl border border-[#ede5da] bg-white p-5 sm:p-7">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Shipping Address
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    House No. / Street Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete delivery address"
                    rows={3}
                    required
                    maxLength={300}
                    className="w-full rounded-lg border border-[#ede5da] px-4 py-3 text-sm outline-none focus:border-[#C9B194]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      required
                      className="w-full rounded-lg border border-[#ede5da] px-4 py-3 text-sm outline-none focus:border-[#C9B194]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>

                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Enter postal code"
                      required
                      className="w-full rounded-lg border border-[#ede5da] px-4 py-3 text-sm outline-none focus:border-[#C9B194]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Country
                  </label>

                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#ede5da] px-4 py-3 text-sm outline-none focus:border-[#C9B194]"
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="rounded-2xl border border-[#ede5da] bg-white p-5 sm:p-7">
              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Payment Method
              </h2>

              <div className="flex items-center gap-3 rounded-xl border border-[#C9B194] bg-[#fdf9f5] p-4">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="accent-[#9a7f5e]"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Cash on Delivery
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Pay when your order is delivered.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-[#ede5da] bg-white p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Order Summary ({cart.length})
              </h2>

              <div className="max-h-80 space-y-5 overflow-y-auto">
                {cart.map((item) => {
                  const productId = item._id || item.id;

                  return (
                    <div
                      key={productId}
                      className="flex gap-3 border-b border-[#ede5da] pb-4"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#f7f5f2]">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full rounded-lg object-contain"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {formatPrice(item.price)}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQty(productId, item.qty - 1)}
                            disabled={item.qty <= 1}
                            className="rounded border border-[#ede5da] px-2 disabled:opacity-40"
                          >
                            −
                          </button>

                          <span className="text-xs">{item.qty}</span>

                          <button
                            type="button"
                            onClick={() => updateQty(productId, item.qty + 1)}
                            disabled={
                              Number.isFinite(Number(item.stock)) &&
                              item.qty >= Number(item.stock)
                            }
                            className="rounded border border-[#ede5da] px-2 disabled:opacity-40"
                          >
                            +
                          </button>

                          <button
                            type="button"
                            onClick={() => removeFromCart(productId)}
                            className="ml-auto text-xs text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-gray-900">
                        {formatPrice(item.price * item.qty)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 space-y-4 text-sm">
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
                    <span className="font-semibold text-gray-900">Total</span>

                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {error && (
                <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="mt-7 w-full rounded-xl bg-[#1a1a1a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#C9B194] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                Your order will be placed using Cash on Delivery.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
