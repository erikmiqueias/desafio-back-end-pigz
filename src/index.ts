import express from "express";
import { config } from "dotenv";

config();
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
