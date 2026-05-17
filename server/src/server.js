require("dotenv").config();

const app = require("./app");
const connectDDBB = require("./config/db");

connectDDBB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
