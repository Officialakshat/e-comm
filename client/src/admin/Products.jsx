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

      console.log("Product filters:", params);

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
      <div className="p-6">
        <h2 className="text-lg font-semibold">Loading Products...</h2>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Products</h1>

          <p className="text-sm text-gray-500 mt-1">{count} products found</p>
        </div>

        <button
          onClick={() => navigate("/admin/addProducts")}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + Add Product
        </button>
      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <div className="bg-white border border-[#ede5da] rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#C9B194]"
          />

          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 outline-none"
          >
            <option value="">All Categories</option>

            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* SORT */}

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 outline-none"
          >
            <option value="">Newest</option>

            <option value="low">Price: Low → High</option>

            <option value="high">Price: High → Low</option>
          </select>

          {/* STOCK */}

          <select
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 outline-none"
          >
            <option value="">All Stock</option>

            <option value="inStock">In Stock</option>

            <option value="lowStock">Low Stock</option>

            <option value="outOfStock">Out of Stock</option>
          </select>

          {/* MIN PRICE */}

          <input
            type="number"
            min="0"
            placeholder="Min price ₹"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 outline-none"
          />

          {/* MAX PRICE */}

          <input
            type="number"
            min="0"
            placeholder="Max price ₹"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 outline-none"
          />

          {/* FEATURED */}

          <label className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => {
                setFeatured(e.target.checked);
                setPage(1);
              }}
            />

            <span>Featured</span>
          </label>

          {/* NEW ARRIVAL */}

          <label className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer">
            <input
              type="checkbox"
              checked={newArrival}
              onChange={(e) => {
                setNewArrival(e.target.checked);
                setPage(1);
              }}
            />

            <span>New Arrival</span>
          </label>

          {/* BEST DEAL */}

          <label className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer">
            <input
              type="checkbox"
              checked={bestDeal}
              onChange={(e) => {
                setBestDeal(e.target.checked);
                setPage(1);
              }}
            />

            <span>Best Deal</span>
          </label>

          {/* CLEAR */}

          <button
            onClick={clearFilters}
            className="border border-red-300 text-red-500 rounded-lg px-3 py-2 hover:bg-red-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* =========================
          PRODUCT TABLE
      ========================= */}

      {products.length > 0 ? (
        <ProductsTable
          products={products}
          onEdit={setEditingProduct}
          onDelete={handleDelete}
        />
      ) : (
        <div className="bg-white border rounded-xl py-12 text-center text-gray-500">
          No products found.
        </div>
      )}

      {/* =========================
          PAGINATION
      ========================= */}

      {pages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          {/* PREVIOUS */}

          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Previous
          </button>

          {/* PAGE NUMBERS */}

          {Array.from({ length: pages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-3 py-2 rounded-lg ${
                  page === pageNumber
                    ? "bg-black text-white"
                    : "border hover:bg-gray-50"
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
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Next
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
