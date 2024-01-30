import dotenv from "dotenv";

import connectDatabase from "./database.js";
import express from "express";

// Our routes
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDatabase();

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log("Server started on port: ", port);
});
