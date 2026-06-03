import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CartDrawer from "../pages/cartDrawer";
import useCart from "../Hooks/useCart";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/category" },
  { name: "New Arrivals", path: "/newArrivals" },
  { name: "Deals", path: "/bestDeals" },
  { name: "Brands", path: "/brands" },
  { name: "Products", path: "/products" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mobileSearchRef = useRef(null);

  const cartCount = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setMenuOpen(false);
      setSearchOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Shrink nav on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-focus mobile search input when opened
  useEffect(() => {
    if (searchOpen && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#ede5da] transition-all duration-300 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        {/* ── TOP BAR ── */}
        <div
          className={`flex items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 transition-all duration-300 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 text-[#C9B194] text-2xl sm:text-[28px] font-bold tracking-tight leading-none hover:opacity-80 transition-opacity duration-200"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            UrbanMart
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-120 items-center bg-[#f8f5f1] border border-[#ede5da] rounded-full overflow-hidden focus-within:border-[#C9B194] focus-within:ring-[3px] focus-within:ring-[#C9B19428] transition-all duration-200"
          >
            <svg
              className="ml-4 shrink-0 text-[#9a7f5e]"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands…"
              className="flex-1 bg-transparent outline-none border-none px-3 py-2.5 text-[13.5px] text-gray-800 placeholder-[#b0a090]"
            />
            <button
              type="submit"
              className="m-1 shrink-0 bg-[#C9B194] hover:bg-[#b89e7e] text-white text-xs font-medium rounded-full px-5 py-2 transition-all duration-200 hover:-translate-y-px active:scale-95"
            >
              Search
            </button>
          </form>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => navigate("/login")}
              className="border-[1.5px] cursor-pointer border-[#C9B194] text-[#C9B194] hover:bg-[#C9B19415] text-[13px] font-medium rounded-full px-5 py-2 transition-all duration-200 hover:-translate-y-px active:scale-95"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#C9B194] cursor-pointer hover:bg-[#b89e7e] text-white text-[13px] font-medium rounded-full px-5 py-2 transition-all duration-200 hover:-translate-y-px active:scale-95"
            >
              Sign Up
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              aria-label="Wishlist"
              className="relative w-9 h-9 flex items-center justify-center bg-[#f8f5f1] hover:bg-[#efe8de] rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9B194"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9B194] text-white text-[9px] font-bold rounded-full flex items-center justify-center"></span>
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative w-9 h-9 flex items-center justify-center bg-[#f8f5f1] hover:bg-[#efe8de] rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9B194"
                strokeWidth="2"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-[#C9B194] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 animate-[fadeUp_0.3s_ease]">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            {/* Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              aria-label="Wishlist"
              className="relative w-9 h-9 flex items-center justify-center bg-[#f8f5f1] rounded-full transition-all duration-200 active:scale-95"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9B194"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9B194] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative w-9 h-9 flex items-center justify-center bg-[#f8f5f1] rounded-full transition-all duration-200 active:scale-95"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9B194"
                strokeWidth="2"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-[#C9B194] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Toggle search"
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 ${
                searchOpen
                  ? "bg-[#C9B19420]"
                  : "bg-[#f8f5f1] hover:bg-[#efe8de]"
              }`}
            >
              {searchOpen ? (
                // X icon when open
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9B194"
                  strokeWidth="2.5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B7280"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.25 bg-[#f8f5f1] hover:bg-[#efe8de] rounded-full transition-colors duration-200"
            >
              <span
                className={`block w-4.5 h-[1.5px] bg-gray-500 rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
                }`}
              />
              <span
                className={`block w-4.5 h-[1.5px] bg-gray-500 rounded-full transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-4.5 h-[1.5px] bg-gray-500 rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* ── MOBILE SEARCH SLIDE ── */}
        <div
          className={`lg:hidden px-5 border-t border-[#f5ede0] overflow-hidden transition-all duration-300 ${
            searchOpen ? "max-h-20 py-3 opacity-100" : "max-h-0 py-0 opacity-0"
          }`}
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-[#f8f5f1] border border-[#ede5da] rounded-full overflow-hidden focus-within:border-[#C9B194] focus-within:ring-[3px] focus-within:ring-[#C9B19428] transition-all duration-200"
          >
            <svg
              className="ml-4 shrink-0 text-[#9a7f5e]"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={mobileSearchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products…"
              className="flex-1 bg-transparent outline-none border-none px-3 py-2.5 text-sm text-gray-800 placeholder-[#b0a090]"
            />
            <button
              type="submit"
              className="m-1 bg-[#C9B194] hover:bg-[#b89e7e] text-white text-xs font-medium rounded-full px-4 py-2 transition-colors duration-200 active:scale-95"
            >
              Go
            </button>
          </form>
        </div>

        {/* ── MOBILE MENU DRAWER ── */}
        <div
          className={`lg:hidden border-t border-[#f5ede0] overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-5 pt-2 pb-5 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] transition-colors duration-150 ${
                    active
                      ? "text-[#8a6d45] bg-[#fdf5ec] font-medium border-l-[3px] border-[#C9B194]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-[#fdf5ec]"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C9B194]" />
                  )}
                </Link>
              );
            })}

            <div className="flex gap-2.5 mt-3 pt-3 border-t border-[#ede5da]">
              <button
                onClick={() => navigate("/login")}
                className="flex-1 cursor-pointer border-[1.5px] border-[#C9B194] text-[#C9B194] rounded-full py-2 text-sm font-medium hover:bg-[#C9B19415] transition-colors duration-200"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="flex-1 cursor-pointer bg-[#C9B194] hover:bg-[#b89e7e] text-white rounded-full py-2 text-sm font-medium transition-colors duration-200"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* ── DESKTOP BOTTOM NAV LINKS ── */}
        <div className="hidden lg:flex items-center gap-7 px-12 pb-3 border-t border-[#f5ede0]">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-1 text-[13.5px] transition-colors duration-200 group ${
                  active
                    ? "text-gray-900 font-medium"
                    : "text-gray-500 hover:text-gray-900 font-normal"
                }`}
              >
                {link.name}
                {/* Underline indicator */}
                <span
                  className={`absolute left-0 bottom-0 h-[1.5px] bg-[#C9B194] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
