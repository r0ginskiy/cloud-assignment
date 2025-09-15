import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Cloud Assignment API running" });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
