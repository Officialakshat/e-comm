import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { useNavigate } from "react-router-dom";
import ProductsTable from "./components/ProductsTable";
import EditProductModal from "./EditProducts";
import { deleteProduct } from "../services/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data.products);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      // Refresh list
      fetchProducts();

      alert("Product deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Loading Products...</h2>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        <button
          onClick={() => navigate("/admin/addProducts")}
          className="bg-black text-white px-4 cursor-pointer py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      <ProductsTable
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />

      {/* Edit Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={fetchProducts}
        />
      )}

      {/* Delete Modal */}
      {deletingProduct && (
        <DeleteProductModal
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
          refreshProducts={fetchProducts}
        />
      )}
    </div>
  );
}
