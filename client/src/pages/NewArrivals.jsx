import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import ProductCard from "./ProductCard.jsx";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);

        const data = await getProducts({
          newArrival: true,
          limit: 8,
        });

        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
        setError("Unable to load new arrivals.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">Loading new arrivals...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-12 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">No new arrivals available right now.</p>
        </div>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 gap-6 max-w-6xl mx-auto">
      {products.map((product) => (
        <ProductCard key={product._id} item={product} />
      ))}
    </div>
  );
}
