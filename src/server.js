import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// в app.js или server.js
app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ ok: true, body: req.body });
});