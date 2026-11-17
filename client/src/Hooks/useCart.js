import { useState, useEffect } from "react";

const KEY = "urbanmart_cart";

// Support both MongoDB _id and existing cart id
const getProductId = (item) => item._id || item.id;

export default function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(cart));
  }, [cart]);

  // Add product with selected quantity
  const addToCart = (item, qty = 1) => {
    const itemId = getProductId(item);

    if (!itemId) return;

    const requestedQty = Math.max(1, Math.floor(Number(qty) || 1));
    const stock = Number(item.stock);

    if (Number.isFinite(stock) && stock <= 0) return;

    setCart((prev) => {
      const existing = prev.find((i) => getProductId(i) === itemId);

      if (existing) {
        return prev.map((i) => {
          if (getProductId(i) !== itemId) return i;

          const currentQty = Number(i.qty) || 0;
          const maxStock = Number(item.stock ?? i.stock);

          const newQty = Number.isFinite(maxStock)
            ? Math.min(currentQty + requestedQty, maxStock)
            : currentQty + requestedQty;

          return { ...i, qty: newQty };
        });
      }

      const finalQty = Number.isFinite(stock)
        ? Math.min(requestedQty, stock)
        : requestedQty;

      return [...prev, { ...item, id: itemId, qty: finalQty }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => getProductId(i) !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);

    setCart((prev) =>
      prev.map((i) => {
        if (getProductId(i) !== id) return i;

        const stock = Number(i.stock);
        const finalQty = Number.isFinite(stock) ? Math.min(qty, stock) : qty;

        return { ...i, qty: finalQty };
      }),
    );
  };

  const clearCart = () => setCart([]);

  const isInCart = (id) => cart.some((i) => getProductId(i) === id);

  const cartCount = cart.reduce((sum, i) => sum + (Number(i.qty) || 0), 0);

  const cartTotal = cart.reduce(
    (sum, i) => sum + (Number(i.price) || 0) * (Number(i.qty) || 0),
    0,
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    isInCart,
    cartCount,
    cartTotal,
  };
}
