import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
console.log("ENV LOADED:", process.env.JWT_SECRET);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});