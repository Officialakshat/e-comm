import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/products";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        setProduct(data.product);
      } catch (err) {
        console.error("Product details error:", err);

        setError(
          err.response?.data?.message || "Unable to load product details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf9f5] flex items-center justify-center">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#fdf9f5] flex flex-col items-center justify-center px-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Product Not Found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {error || "This product is unavailable."}
        </p>

        <Link
          to="/productsListing"
          className="mt-5 rounded-lg bg-[#C9B194] px-6 py-2 text-white hover:bg-[#9a7f5e]"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const discount = product.discountPercentage || 0;

  return (
    <main className="min-h-screen bg-[#fdf9f5] px-4 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#9a7f5e]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/productsListing" className="hover:text-[#9a7f5e]">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 gap-10 rounded-2xl border border-[#ede5da] bg-white p-5 sm:p-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative flex min-h-87.5 items-center justify-center overflow-hidden rounded-xl bg-[#f7f5f2] sm:min-h-125">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full max-h-137.5 w-full object-contain"
              />
            ) : (
              <p className="text-sm text-gray-400">No image available</p>
            )}

            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold text-white">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center py-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9B194]">
              {product.category || "General"}
            </p>

            <h1
              className="text-3xl font-bold text-gray-900 sm:text-4xl"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {product.name}
            </h1>

            {product.brand && (
              <p className="mt-3 text-sm text-gray-500">
                Brand:{" "}
                <span className="font-medium text-gray-800">
                  {product.brand}
                </span>
              </p>
            )}

            {/* Rating */}
            {product.rating > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[#C9B194]">★ {product.rating}</span>
                <span className="text-xs text-gray-400">
                  ({product.numReviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>

              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {discount > 0 && (
              <p className="mt-2 text-sm font-medium text-green-600">
                You save {formatPrice(product.originalPrice - product.price)}
              </p>
            )}

            <div className="my-6 border-t border-[#ede5da]" />

            {/* Description */}
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-900">
                Product Description
              </h2>

              <p className="text-sm leading-7 text-gray-600">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Stock */}
            <div className="mt-6">
              {product.stock > 0 ? (
                <p className="text-sm font-medium text-green-600">
                  ✓ In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-sm font-medium text-red-500">
                  Currently Out of Stock
                </p>
              )}
            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-gray-800">
                  Quantity
                </p>

                <div className="flex w-fit items-center overflow-hidden rounded-lg border border-[#ede5da]">
                  <button
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    disabled={quantity <= 1}
                    className="px-4 py-2 text-gray-700 hover:bg-[#f7f5f2] disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="min-w-12 text-center text-sm">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((current) =>
                        Math.min(product.stock, current + 1),
                      )
                    }
                    disabled={quantity >= product.stock}
                    className="px-4 py-2 text-gray-700 hover:bg-[#f7f5f2] disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Cart buttons will be connected in the next step */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                disabled={product.stock <= 0}
                className="rounded-xl bg-[#1a1a1a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#C9B194] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                Add to Cart
              </button>

              <button
                disabled={product.stock <= 0}
                className="rounded-xl border border-[#C9B194] px-5 py-3 text-sm font-medium text-[#80684f] transition hover:bg-[#f7f1e9] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
