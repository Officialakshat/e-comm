// data/adminData.js  — shared data for all admin components

export const revenueData = [
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

export const recentOrders = [
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

export const topProducts = [
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

export const statCards = [
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

export const sidebarGroups = [
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

export const statusStyle = {
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-600",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};
