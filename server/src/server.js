import "dotenv/config";

import "./config/cloudinary.js";
import { listen } from "./app.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
