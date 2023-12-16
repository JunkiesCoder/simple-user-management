import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import "./config/dbConfig.js";
import listRoute from "./routes/route.js";

configDotenv();
app.use(morgan("dev"));

app.use(
  cors({
    origin: [process.env.FRONTEND],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use("/api/", listRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
