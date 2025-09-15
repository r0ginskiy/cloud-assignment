import { Router, Request, Response } from "express";
import {
  addCustomer,
  getCustomer,
  deleteCustomer,
} from "../services/customerService.js";

const router = Router();

// POST /customer
router.post("/", (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "id is required" });

    const customer = addCustomer(id);
    res.status(201).json(customer);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// GET /customer/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = getCustomer(id);

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.json(customer);
});

// DELETE /customer/:id
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const success = deleteCustomer(id);

  if (!success) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.json({ message: "Customer deleted" });
});

export default router;
