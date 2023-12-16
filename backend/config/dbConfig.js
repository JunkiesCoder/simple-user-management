import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch(() => {
    console.log("DB connection failed");
  });
