import express from "express";
import cors from "cors";

import serviceRoutes from "./routes/service.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend works ✅");
});

app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);

export default app;