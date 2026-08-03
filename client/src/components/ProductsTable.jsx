import { useNavigate } from "react-router-dom";

export default function ProductsTable({ products }) {
  const navigate = useNavigate();
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">No Products Found</h2>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>

            <th className="px-4 py-3 text-left">Name</th>

            <th className="px-4 py-3 text-left">Category</th>

            <th className="px-4 py-3 text-left">Price</th>

            <th className="px-4 py-3 text-left">Stock</th>

            <th className="px-4 py-3 text-left">Status</th>

            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                <img
                  src={
                    product.images?.[0]?.url || "https://via.placeholder.com/60"
                  }
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>

              <td className="px-4 py-3 font-medium">{product.name}</td>

              <td className="px-4 py-3">{product.category}</td>

              <td className="px-4 py-3">₹{product.price}</td>

              <td className="px-4 py-3">{product.stock}</td>

              <td className="px-4 py-3">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => navigate("/admin/EditProduct")}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => navigate("/admin/deleteProduct")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
