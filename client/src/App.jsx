import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Layout from "./layout/layout";
import Contact from "./pages/Contact";
import NewArrivals from "./pages/NewArrivals";
import BestDeals from "./pages/BestDeals";
import Brands from "./pages/Brands";
import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import Categories from "./pages/Category";
import FeaturedProducts from "./pages/FeaturedProducts";
import CartDrawer from "./pages/cartDrawer";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import Conditions from "./pages/Conditions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<Categories />} />
          <Route path="newArrivals" element={<NewArrivals />} />
          <Route path="bestDeals" element={<BestDeals />} />
          <Route path="brands" element={<Brands />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="Cart" element={<CartDrawer />} />
          <Route path="products" element={<FeaturedProducts />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="signup" element={<Signup />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="help" element={<Help />} />
          <Route path="conditions" element={<Conditions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
