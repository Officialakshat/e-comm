export default function ProductsTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-xl font-semibold">No Products Found</h2>

        <p className="text-gray-500 mt-2">Add your first product.</p>
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
              {/* Image */}

              <td className="px-4 py-3">
                <img
                  src={product.image || "https://via.placeholder.com/60"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>

              {/* Name */}

              <td className="px-4 py-3 font-medium">{product.name}</td>

              {/* Category */}

              <td className="px-4 py-3">{product.category}</td>

              {/* Price */}

              <td className="px-4 py-3">₹{product.price}</td>

              {/* Stock */}

              <td className="px-4 py-3">{product.stock}</td>

              {/* Status */}

              <td className="px-4 py-3">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-semibold">In Stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Out of Stock
                  </span>
                )}
              </td>

              {/* Actions */}

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(product)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
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
