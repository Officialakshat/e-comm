import Products from "../data/products";
import ProductCard from "./ProductCard.jsx";

export default function NewArrivals() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 gap-6 max-w-6xl mx-auto">
      {Products.filter((card) => card.tagName === "newArrival").map((card) => (
        <ProductCard key={card.id} item={card} />
      ))}
    </div>
  );
}
