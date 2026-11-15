import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { getCategories } from "../services/categories";
import { useSearchParams } from "react-router-dom";

const PRODUCTS_PER_PAGE = 12;

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "";
  const searchTerm = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("100000");
  const [appliedMinPrice, setAppliedMinPrice] = useState("0");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState("100000");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load active categories and available brands
  useEffect(() => {
    const loadShopData = async () => {
      try {
        const [categoryData, productData] = await Promise.all([
          getCategories(),
          getProducts({ page: 1, limit: 1000 }),
        ]);

        setCategories(categoryData.categories || []);

        const allProducts = productData.products || [];

        const uniqueBrands = [
          ...new Set(
            allProducts.map((product) => product.brand).filter(Boolean),
          ),
        ].sort((a, b) => a.localeCompare(b));

        setBrands(uniqueBrands);
      } catch (err) {
        console.error("Shop data loading error:", err);
      }
    };

    loadShopData();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setPage(1);
  }, [categoryFromUrl]);

  // Fetch products whenever a filter or page changes

  // Fetch products whenever a filter or page changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page,
          limit: PRODUCTS_PER_PAGE,
          minPrice: appliedMinPrice,
          maxPrice: appliedMaxPrice,
        };

        if (selectedCategory) params.category = selectedCategory;
        if (selectedBrand) params.brand = selectedBrand;
        if (searchTerm) params.keyword = searchTerm;
        if (sort) params.sort = sort;
        console.log("Shop request filters:", JSON.stringify(params, null, 2));

        const data = await getProducts(params);

        console.log("Products received:", data.products);

        setProducts(data.products || []);
        setTotalProducts(data.count || 0);
        setPages(data.pages || 1);
      } catch (error) {
        console.error("Shop products error:", error);
        setError("Unable to load products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    page,
    selectedCategory,
    selectedBrand,
    sort,
    appliedMinPrice,
    appliedMaxPrice,
    searchTerm,
  ]);

  const applyPriceFilter = (e) => {
    e.preventDefault();

    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (
      !Number.isFinite(min) ||
      !Number.isFinite(max) ||
      min < 0 ||
      max < min
    ) {
      setError("Please enter a valid price range.");
      return;
    }

    setAppliedMinPrice(String(min));
    setAppliedMaxPrice(String(max));
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setMinPrice("0");
    setMaxPrice("100000");
    setAppliedMinPrice("0");
    setAppliedMaxPrice("100000");
    setSort("");
    setPage(1);
    setSearchParams({});
  };

  const changeCategory = (category) => {
    setSelectedCategory(category);

    const nextParams = new URLSearchParams(searchParams);

    if (category) {
      nextParams.set("category", category);
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams);
    setPage(1);
  };

  const changeBrand = (brand) => {
    setSelectedBrand((current) => (current === brand ? "" : brand));
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-[#fdf9f5] px-4 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[#C9B194]">
            UrbanMart Collection
          </p>

          <h1
            className="text-3xl font-bold text-[#111827] sm:text-4xl"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            Shop All Products
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Discover products for your home and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* LEFT SIDEBAR */}
          <aside className="h-fit rounded-2xl border border-[#ede5da] bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

              <button
                onClick={clearFilters}
                className="text-xs font-medium text-[#9a7f5e] hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* CATEGORY FILTER */}
            <div className="border-b border-[#ede5da] pb-6">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Product Categories
              </h3>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ""}
                    onChange={() => changeCategory("")}
                    className="accent-[#C9B194]"
                  />
                  All Categories
                </label>

                {categories.map((category) => (
                  <label
                    key={category._id}
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => changeCategory(category.name)}
                      className="accent-[#C9B194]"
                    />

                    {category.name}
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE FILTER */}
            <form
              onSubmit={applyPriceFilter}
              className="border-b border-[#ede5da] py-6"
            >
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Filter by Price
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Minimum (₹)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full rounded-lg border border-[#ede5da] px-2 py-2 text-sm outline-none focus:border-[#C9B194]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Maximum (₹)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full rounded-lg border border-[#ede5da] px-2 py-2 text-sm outline-none focus:border-[#C9B194]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-3 w-full rounded-lg bg-[#C9B194] py-2 text-sm font-medium text-white transition hover:bg-[#9a7f5e]"
              >
                Apply Price
              </button>
            </form>

            {/* BRAND FILTER */}
            <div className="pt-6">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Filter by Brand
              </h3>

              {brands.length > 0 ? (
                <div className="max-h-52 space-y-3 overflow-y-auto">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrand === brand}
                        onChange={() => changeBrand(brand)}
                        className="h-4 w-4 accent-[#C9B194]"
                      />

                      {brand}
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No brands available.</p>
              )}
            </div>
          </aside>

          {/* RIGHT PRODUCT SECTION */}
          <section>
            {/* Product toolbar */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  All Products
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Showing {products.length} of {totalProducts} products
                </p>
              </div>

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-[#ede5da] bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[#C9B194]"
              >
                <option value="">Newest First</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>

            {/* Active filter labels */}
            {(selectedCategory || selectedBrand || searchTerm) && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {selectedCategory && (
                  <span className="rounded-full bg-[#f2e9dd] px-3 py-1.5 text-xs text-[#80684f]">
                    Category: {selectedCategory}
                  </span>
                )}

                {selectedBrand && (
                  <span className="rounded-full bg-[#f2e9dd] px-3 py-1.5 text-xs text-[#80684f]">
                    Brand: {selectedBrand}
                  </span>
                )}
                {searchTerm && (
                  <span className="rounded-full bg-[#f2e9dd] px-3 py-1.5 text-xs text-[#80684f]">
                    Search: {searchTerm}
                  </span>
                )}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="py-20 text-center text-sm text-gray-500">
                Loading products...
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Product grid */}
            {!loading && !error && products.length > 0 && (
              <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <article
                    key={product._id}
                    className="group overflow-hidden rounded-xl border border-[#ede5da] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#f7f5f2]">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-sm text-gray-400">
                          No image available
                        </div>
                      )}

                      {product.discountPercentage > 0 && (
                        <span className="absolute left-3 top-3 rounded-md bg-[#d9eee5] px-2 py-1 text-xs font-semibold text-[#32775d]">
                          -{product.discountPercentage}%
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <p className="mb-1 text-xs text-[#9a7f5e]">
                        {product.brand}
                      </p>

                      <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">
                        {product.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold text-gray-900">
                          {formatPrice(product.price)}
                        </span>

                        {product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {product.rating > 0 && (
                        <p className="mt-2 text-xs text-[#b28b38]">
                          ★ {product.rating}{" "}
                          <span className="text-gray-400">
                            ({product.numReviews || 0} reviews)
                          </span>
                        </p>
                      )}

                      <p className="mt-2 text-xs text-gray-500">
                        {product.stock > 0
                          ? "In Stock"
                          : "Currently Unavailable"}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* No products */}
            {!loading && !error && products.length === 0 && (
              <div className="rounded-xl border border-[#ede5da] bg-white py-20 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  No products found
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-full bg-[#C9B194] px-6 py-2 text-sm text-white hover:bg-[#9a7f5e]"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && pages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="rounded-lg border border-[#ede5da] bg-white px-4 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Page {page} of {pages}
                </span>

                <button
                  disabled={page === pages}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-lg border border-[#ede5da] bg-white px-4 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
