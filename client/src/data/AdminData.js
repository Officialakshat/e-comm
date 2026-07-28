// data/adminData.js

const revenueData = [
  { month: "Jan", revenue: 18000, orders: 120 },
  { month: "Feb", revenue: 22000, orders: 145 },
  { month: "Mar", revenue: 19500, orders: 130 },
  { month: "Apr", revenue: 27000, orders: 178 },
  { month: "May", revenue: 24000, orders: 160 },
  { month: "Jun", revenue: 31000, orders: 205 },
  { month: "Jul", revenue: 28500, orders: 189 },
  { month: "Aug", revenue: 35000, orders: 230 },
  { month: "Sep", revenue: 32000, orders: 212 },
  { month: "Oct", revenue: 29000, orders: 195 },
  { month: "Nov", revenue: 38000, orders: 248 },
  { month: "Dec", revenue: 42000, orders: 280 },
];

const initialOrders = [
  {
    id: "#UM-4532",
    customer: "Priya Sharma",
    product: "Ceramic Table Lamp",
    amount: 1299,
    status: "Processing",
    avatar: "PS",
    date: "27 Jul 2025",
  },
  {
    id: "#UM-4531",
    customer: "Ravi Kumar",
    product: "Sony WH-1000XM5",
    amount: 24990,
    status: "Shipped",
    avatar: "RK",
    date: "26 Jul 2025",
  },
  {
    id: "#UM-4530",
    customer: "Neha Patel",
    product: "Rattan Accent Chair",
    amount: 8499,
    status: "Delivered",
    avatar: "NP",
    date: "25 Jul 2025",
  },
  {
    id: "#UM-4529",
    customer: "Amit Verma",
    product: "Leather Passport Wallet",
    amount: 899,
    status: "Delivered",
    avatar: "AV",
    date: "24 Jul 2025",
  },
  {
    id: "#UM-4528",
    customer: "Sunita Yadav",
    product: "Aromatic Candle Bundle",
    amount: 449,
    status: "Cancelled",
    avatar: "SY",
    date: "23 Jul 2025",
  },
  {
    id: "#UM-4527",
    customer: "Deepak Mehta",
    product: "Monstera Deliciosa",
    amount: 699,
    status: "Processing",
    avatar: "DM",
    date: "22 Jul 2025",
  },
  {
    id: "#UM-4526",
    customer: "Anjali Singh",
    product: "Matte Black Kettle",
    amount: 2199,
    status: "Shipped",
    avatar: "AS",
    date: "21 Jul 2025",
  },
];

const initialProducts = [
  {
    id: 1,
    name: "Ceramic Table Lamp",
    category: "Lighting",
    price: 1299,
    stock: 34,
    status: "Active",
    img: "https://www.ikea.com/in/en/images/products/blidvaeder-table-lamp-off-white-ceramic-beige__1059594_pe849715_s5.jpg?f=xl",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    category: "Electronics",
    price: 24990,
    stock: 8,
    status: "Active",
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=60&q=80",
  },
  {
    id: 3,
    name: "Rattan Accent Chair",
    category: "Furniture",
    price: 8499,
    stock: 0,
    status: "Out of Stock",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=60&q=80",
  },
  {
    id: 4,
    name: "Aromatic Candle Bundle",
    category: "Decor",
    price: 449,
    stock: 112,
    status: "Active",
    img: "https://images.unsplash.com/photo-1602607144573-ebb29eda0c4d?w=60&q=80",
  },
  {
    id: 5,
    name: "Matte Black Kettle",
    category: "Kitchen",
    price: 2199,
    stock: 3,
    status: "Low Stock",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&q=80",
  },
  {
    id: 6,
    name: "Monstera Deliciosa",
    category: "Plants",
    price: 699,
    stock: 22,
    status: "Active",
    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=60&q=80",
  },
];

const initialCustomers = [
  {
    id: 1,
    name: "Arjun Singh",
    email: "arjun@example.com",
    orders: 4,
    spent: 45730,
    joined: "Jan 2024",
    badge: "Premium",
    avatar: "AS",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    orders: 2,
    spent: 5297,
    joined: "Mar 2024",
    badge: "Regular",
    avatar: "PS",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    email: "ravi@example.com",
    orders: 7,
    spent: 89420,
    joined: "Sep 2023",
    badge: "Premium",
    avatar: "RK",
  },
  {
    id: 4,
    name: "Neha Patel",
    email: "neha@example.com",
    orders: 1,
    spent: 6445,
    joined: "Nov 2024",
    badge: "New",
    avatar: "NP",
  },
  {
    id: 5,
    name: "Deepak Mehta",
    email: "deepak@example.com",
    orders: 3,
    spent: 12300,
    joined: "Feb 2024",
    badge: "Regular",
    avatar: "DM",
  },
];

const topProducts = [
  {
    name: "Sony WH-1000XM5",
    sales: 340,
    revenue: 84966,
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=60&q=80",
  },
  {
    name: "Rattan Accent Chair",
    sales: 64,
    revenue: 54394,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=60&q=80",
  },
  {
    name: "Ceramic Table Lamp",
    sales: 128,
    revenue: 16627,
    img: "https://www.ikea.com/in/en/images/products/blidvaeder-table-lamp-off-white-ceramic-beige__1059594_pe849715_s5.jpg?f=xl",
  },
  {
    name: "Matte Black Kettle",
    sales: 67,
    revenue: 14733,
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&q=80",
  },
  {
    name: "Monstera Deliciosa",
    sales: 78,
    revenue: 5454,
    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=60&q=80",
  },
];

const sidebarGroups = [
  {
    section: "MAIN",
    items: [
      { icon: "⊞", label: "Dashboard" },
      { icon: "📦", label: "Orders" },
      { icon: "🏷️", label: "Products" },
      { icon: "👥", label: "Customers" },
    ],
  },
  {
    section: "CATALOG",
    items: [
      { icon: "📂", label: "Categories" },
      { icon: "🌟", label: "Brands" },
      { icon: "🎁", label: "Deals" },
    ],
  },
  {
    section: "REPORTS",
    items: [
      { icon: "📊", label: "Analytics" },
      { icon: "💳", label: "Revenue" },
      { icon: "⚙️", label: "Settings" },
    ],
  },
];
const statusStyle = {
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-600",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

const productStatusStyle = {
  Active: "bg-green-100 text-green-700",
  "Out of Stock": "bg-red-100 text-red-600",
  "Low Stock": "bg-yellow-100 text-yellow-700",
};

const badgeStyle = {
  Premium: "bg-[#fdf0e2] text-[#9a7f5e]",
  Regular: "bg-blue-50 text-blue-600",
  New: "bg-green-50 text-green-600",
};
const statCards = [
  {
    label: "Total Revenue",
    value: "₹2,48,560",
    change: "+12.4%",
    up: true,
    icon: "💰",
    bg: "bg-[#fdf0e2]",
  },
  {
    label: "Total Orders",
    value: "1,284",
    change: "+8.1%",
    up: true,
    icon: "📦",
    bg: "bg-[#f0f9f4]",
  },
  {
    label: "Total Customers",
    value: "342",
    change: "+5.3%",
    up: true,
    icon: "👥",
    bg: "bg-[#eff6ff]",
  },
  {
    label: "Return Rate",
    value: "3.2%",
    change: "-0.8%",
    up: false,
    icon: "↩️",
    bg: "bg-[#fdf4ff]",
  },
];

const recentOrders = [
  {
    id: "#UM-4532",
    customer: "Priya Sharma",
    product: "Ceramic Table Lamp",
    amount: 1299,
    status: "Processing",
    avatar: "PS",
  },
  {
    id: "#UM-4531",
    customer: "Ravi Kumar",
    product: "Sony WH-1000XM5",
    amount: 24990,
    status: "Shipped",
    avatar: "RK",
  },
  {
    id: "#UM-4530",
    customer: "Neha Patel",
    product: "Rattan Accent Chair",
    amount: 8499,
    status: "Delivered",
    avatar: "NP",
  },
  {
    id: "#UM-4529",
    customer: "Amit Verma",
    product: "Leather Passport Wallet",
    amount: 899,
    status: "Delivered",
    avatar: "AV",
  },
  {
    id: "#UM-4528",
    customer: "Sunita Yadav",
    product: "Aromatic Candle Bundle",
    amount: 449,
    status: "Cancelled",
    avatar: "SY",
  },
];

export {
  badgeStyle,
  productStatusStyle,
  statusStyle,
  statCards,
  recentOrders,
  sidebarGroups,
  topProducts,
  initialCustomers,
  initialOrders,
  initialProducts,
  revenueData,
};
