import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/products";

import { useNavigate } from "react-router-dom";
import ProductsTable from "./components/ProductsTable";
import EditProductModal from "./EditProducts";

const CATEGORIES = [
  "Lighting",
  "Electronics",
  "Furniture",
  "Decor",
  "Kitchen",
  "Plants",
  "Fashion",
  "Bedroom",
  "Office",
];

export default function Products() {
  const navigate = useNavigate();

  // =========================
  // PRODUCTS
  // =========================

  const [products, setProducts] = useState([]);

  // =========================
  // LOADING / ERROR
  // =========================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // EDIT PRODUCT
  // =========================

  const [editingProduct, setEditingProduct] = useState(null);

  // =========================
  // FILTERS
  // =========================

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [sort, setSort] = useState("");
  const [stock, setStock] = useState("");

  const [featured, setFeatured] = useState(false);
  const [newArrival, setNewArrival] = useState(false);
  const [bestDeal, setBestDeal] = useState(false);

  // =========================
  // PAGINATION
  // =========================

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(0);

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        keyword: keyword || undefined,
        category: category || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        sort: sort || undefined,
        stock: stock || undefined,

        featured: featured ? true : undefined,
        newArrival: newArrival ? true : undefined,
        bestDeal: bestDeal ? true : undefined,
      };

      const data = await getProducts(params);

      setProducts(data.products);
      setPages(data.pages);
      setCount(data.count);
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH WHEN FILTERS CHANGE
  // =========================

  useEffect(() => {
    fetchProducts();
  }, [
    page,
    keyword,
    category,
    minPrice,
    maxPrice,
    sort,
    stock,
    featured,
    newArrival,
    bestDeal,
  ]);

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      await fetchProducts();

      alert("Product deleted successfully.");
    } catch (err) {
      console.error(err);

      alert("Failed to delete product.");
    }
  };

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setKeyword("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setStock("");

    setFeatured(false);
    setNewArrival(false);
    setBestDeal(false);

    setPage(1);
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="p-5 sm:p-6">
        <div className="bg-white border border-[#ede5da] rounded-2xl p-10 text-center">
          <p className="text-[13px] text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="p-5 sm:p-6">
        <div className="bg-white border border-[#ede5da] rounded-2xl p-10 text-center">
          <p className="text-[13px] text-red-500">{error}</p>

          <button
            onClick={fetchProducts}
            className="mt-3 text-[11px] font-medium text-[#C9B194] hover:text-[#9a7f5e]"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-6">
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h1 className="text-[20px] sm:text-[22px] font-bold text-gray-900">
            Products
          </h1>

          <p className="text-[11px] text-gray-400 mt-1">
            Manage your products and inventory
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/addProducts")}
          className="flex items-center justify-center gap-2 bg-[#C9B194] text-white text-[11px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#b99e80] transition-colors shadow-sm"
        >
          <span className="text-base leading-none">+</span>
          Add Product
        </button>
      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <div className="bg-white border border-[#ede5da] rounded-2xl p-4 sm:p-5 mb-5">
        {/* Filter heading */}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#f8f5f1] flex items-center justify-center">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9a7f5e"
                strokeWidth="2"
              >
                <path d="M4 6h16" />
                <path d="M7 12h10" />
                <path d="M10 18h4" />
              </svg>
            </div>

            <h3 className="text-[13px] font-semibold text-gray-800">Filters</h3>
          </div>

          <button
            onClick={clearFilters}
            className="text-[10px] font-medium text-gray-400 hover:text-red-500 transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* =========================
              SEARCH
          ========================= */}

          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a7f5e]"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#f8f5f1] border border-[#ede5da] rounded-xl pl-9 pr-3 py-2.5 text-[11px] text-gray-700 outline-none focus:border-[#C9B194] transition-colors placeholder:text-[#b0a090]"
            />
          </div>

          {/* =========================
              CATEGORY
          ========================= */}

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="bg-[#f8f5f1] border border-[#ede5da] rounded-xl px-3 py-2.5 text-[11px] text-gray-600 outline-none focus:border-[#C9B194] transition-colors"
          >
            <option value="">All Categories</option>

            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* =========================
              SORT
          ========================= */}

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="bg-[#f8f5f1] border border-[#ede5da] rounded-xl px-3 py-2.5 text-[11px] text-gray-600 outline-none focus:border-[#C9B194] transition-colors"
          >
            <option value="">Newest</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>

          {/* =========================
              STOCK
          ========================= */}

          <select
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
              setPage(1);
            }}
            className="bg-[#f8f5f1] border border-[#ede5da] rounded-xl px-3 py-2.5 text-[11px] text-gray-600 outline-none focus:border-[#C9B194] transition-colors"
          >
            <option value="">All Stock</option>
            <option value="inStock">In Stock</option>
            <option value="lowStock">Low Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>

          {/* =========================
              MIN PRICE
          ========================= */}

          <input
            type="number"
            min="0"
            placeholder="Min price ₹"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setPage(1);
            }}
            className="bg-[#f8f5f1] border border-[#ede5da] rounded-xl px-3 py-2.5 text-[11px] text-gray-700 outline-none focus:border-[#C9B194] transition-colors placeholder:text-[#b0a090]"
          />

          {/* =========================
              MAX PRICE
          ========================= */}

          <input
            type="number"
            min="0"
            placeholder="Max price ₹"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
            className="bg-[#f8f5f1] border border-[#ede5da] rounded-xl px-3 py-2.5 text-[11px] text-gray-700 outline-none focus:border-[#C9B194] transition-colors placeholder:text-[#b0a090]"
          />

          {/* =========================
              FEATURED
          ========================= */}

          <label
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${
              featured
                ? "bg-[#fdf9f5] border-[#C9B194]"
                : "bg-[#f8f5f1] border-[#ede5da]"
            }`}
          >
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => {
                setFeatured(e.target.checked);
                setPage(1);
              }}
              className="accent-[#C9B194]"
            />

            <span className="text-[11px] text-gray-600">Featured</span>
          </label>

          {/* =========================
              NEW ARRIVAL
          ========================= */}

          <label
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${
              newArrival
                ? "bg-[#fdf9f5] border-[#C9B194]"
                : "bg-[#f8f5f1] border-[#ede5da]"
            }`}
          >
            <input
              type="checkbox"
              checked={newArrival}
              onChange={(e) => {
                setNewArrival(e.target.checked);
                setPage(1);
              }}
              className="accent-[#C9B194]"
            />

            <span className="text-[11px] text-gray-600">New Arrival</span>
          </label>

          {/* =========================
              BEST DEAL
          ========================= */}

          <label
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${
              bestDeal
                ? "bg-[#fdf9f5] border-[#C9B194]"
                : "bg-[#f8f5f1] border-[#ede5da]"
            }`}
          >
            <input
              type="checkbox"
              checked={bestDeal}
              onChange={(e) => {
                setBestDeal(e.target.checked);
                setPage(1);
              }}
              className="accent-[#C9B194]"
            />

            <span className="text-[11px] text-gray-600">Best Deal</span>
          </label>
        </div>
      </div>

      {/* =========================
          PRODUCT TABLE CARD
      ========================= */}

      <div className="bg-white border border-[#ede5da] rounded-2xl overflow-hidden">
        {/* Table Header */}

        <div className="px-5 py-4 border-b border-[#f5ede0] flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-gray-900">
              All Products
            </h3>

            <p className="text-[10px] text-gray-400 mt-0.5">
              {count} products found
            </p>
          </div>

          <div className="text-[10px] text-gray-400">
            Page {page} of {pages}
          </div>
        </div>

        {/* Product Table */}

        {products.length > 0 ? (
          <ProductsTable
            products={products}
            onEdit={setEditingProduct}
            onDelete={handleDelete}
          />
        ) : (
          <div className="py-14 text-center">
            <div className="w-12 h-12 rounded-full bg-[#f8f5f1] flex items-center justify-center mx-auto mb-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9B194"
                strokeWidth="1.8"
              >
                <path d="M6 2h12l2 5H4l2-5Z" />
                <path d="M4 7v13h16V7" />
                <path d="M9 11h6" />
              </svg>
            </div>

            <p className="text-[12px] font-medium text-gray-700">
              No products found
            </p>

            <p className="text-[10px] text-gray-400 mt-1">
              Try changing your filters or search keyword.
            </p>
          </div>
        )}
      </div>

      {/* =========================
          PAGINATION
      ========================= */}

      {pages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-1.5 mt-5">
          {/* PREVIOUS */}

          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-3 py-2 rounded-xl border border-[#ede5da] bg-white text-[10px] font-medium text-gray-600 hover:bg-[#fdf9f5] hover:border-[#C9B194] disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-[#ede5da] transition-colors"
          >
            ← Previous
          </button>

          {/* PAGE NUMBERS */}

          {Array.from({ length: pages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`w-8 h-8 rounded-xl text-[10px] font-medium transition-colors ${
                  page === pageNumber
                    ? "bg-[#C9B194] text-white"
                    : "bg-white border border-[#ede5da] text-gray-600 hover:bg-[#fdf9f5] hover:border-[#C9B194]"
                }`}
              >
                {pageNumber}
              </button>
            ),
          )}

          {/* NEXT */}

          <button
            disabled={page === pages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-2 rounded-xl border border-[#ede5da] bg-white text-[10px] font-medium text-gray-600 hover:bg-[#fdf9f5] hover:border-[#C9B194] disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-[#ede5da] transition-colors"
          >
            Next →
          </button>
        </div>
      )}

      {/* =========================
          EDIT MODAL
      ========================= */}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={fetchProducts}
        />
      )}
    </div>
  );
}
