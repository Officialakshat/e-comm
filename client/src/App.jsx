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
import MyOrders from "./pages/MyOrder";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Products from "./admin/Products";
import AdminOrdersPanel from "./admin/OrdersBarChart";
import Users from "./admin/Users";
import TopProducts from "./admin/TopProducts";
import AdminCategory from "./admin/AdminCategory";
import AddProduct from "./admin/AddProducts";
import EditProducts from "./admin/EditProducts";

function App() {
  return (
    <BrowserRouter>
      {/* dafault layout */}
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
          <Route path="MyOrders" element={<MyOrders />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="help" element={<Help />} />
          <Route path="conditions" element={<Conditions />} />
        </Route>

        {/* admin layout */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<AdminOrdersPanel />} />
          <Route path="users" element={<Users />} />
          <Route path="editProduct" element={<EditProducts />} />
          <Route path="addProducts" element={<AddProduct />} />
          <Route path="topProducts" element={<TopProducts />} />
          <Route path="Categories" element={<AdminCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
