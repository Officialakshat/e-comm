import { createContext, useContext } from "react";
import useCart from "../Hooks/useCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cart = useCart();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
