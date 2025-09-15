import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";
import { initDB } from "./db.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.use("/customer", customerRoutes);

initDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
