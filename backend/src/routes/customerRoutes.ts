import { Router, Request, Response } from "express";
import { addCustomer, getCustomer, deleteCustomer } from "../services/customerService.js";
import { customerIdSchema } from "../utils/validation.js";
import { logger } from "../utils/logger.js";

const router = Router();

// POST /customer
router.post("/", (req: Request, res: Response) => {
  const { error, value } = customerIdSchema.validate(req.body);

  if (error) {
    logger.error("Validation error", { details: error.details });
    return res.status(400).json({ error: error.message });
  }

  try {
    const customer = addCustomer(value.id);
    logger.info("Customer created", { id: value.id });
    res.status(201).json(customer);
  } catch (err: any) {
    logger.error("Error creating customer", { error: err.message });
    res.status(400).json({ error: err.message });
  }
});

// GET /customer/:id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = getCustomer(id);

  if (!customer) {
    logger.warn("Customer not found", { id });
    return res.status(404).json({ error: "Customer not found" });
  }

  logger.info("Customer fetched", { id });
  res.json(customer);
});

// DELETE /customer/:id
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const success = deleteCustomer(id);

  if (!success) {
    logger.warn("Customer not found for delete", { id });
    return res.status(404).json({ error: "Customer not found" });
  }

  logger.info("Customer deleted", { id });
  res.json({ message: "Customer deleted" });
});

export default router;
