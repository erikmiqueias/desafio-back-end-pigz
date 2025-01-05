import express from "express";
import { config } from "dotenv";
import router from "./routes/route";

config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
