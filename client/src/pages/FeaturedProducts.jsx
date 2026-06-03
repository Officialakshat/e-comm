import Products from "../data/products.js";

import ProductCard from "./ProductCard.jsx";

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 gap-6 p max-w-6xl mx-auto">
      {Products.map((card) => (
        <ProductCard item={card} />
      ))}
    </div>
  );
}
