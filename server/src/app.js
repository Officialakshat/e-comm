const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running ..");
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

module.exports = app;
