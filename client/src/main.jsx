import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <StrictMode>
      <AuthProvider>
        {" "}
        <App />
      </AuthProvider>
    </StrictMode>
  </CartProvider>,
);
