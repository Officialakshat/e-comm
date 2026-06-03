import { useState, useEffect } from "react";

const KEY = "urbanmart_cart";

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

  // useEffect(() => {
  //   const sync = () => setCart(readCart());
  //   window.addEventListener("storage", sync);
  //   return () => window.removeEventListener("storage", sync);
  // }, []);

  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i,
        );
      }

      return [...prev, { ...item, qty }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setCart([]);

  const isInCart = (id) => cart.some((i) => i.id === id);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

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
