import { connect } from "mongoose";

const connectDDBB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (err) {
    console.log("MongoDB Connection Error: ", err.message);
    process.exit(1);
  }
};

export default connectDDBB;
