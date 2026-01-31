import express from "express";
import cors from "cors";

import serviceRoutes from "./routes/service.routes.js";
import orderRoutes from "./routes/order.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend works ✅");
});

app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", authRoutes);

export default app;