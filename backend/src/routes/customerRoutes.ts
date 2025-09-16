import { Router, Request, Response, NextFunction } from "express";
import { addCustomer, getCustomer, deleteCustomer } from "../services/customerService.js";
import { customerIdSchema } from "../utils/validation.js";
import { AppError } from "../utils/errorHandler.js";
import { logger } from "../utils/logger.js";

const router = Router();

// POST /customer
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = customerIdSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));

  const customer = await addCustomer(value.id);
  logger.info("Customer created", { id: value.id });
  res.status(201).json(customer);
});

// GET /customer/:id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const customer = await getCustomer(req.params.id);
  if (!customer) return next(new AppError("Customer not found", 404));

  logger.info("Customer fetched", { id: req.params.id });
  res.json(customer);
});

// DELETE /customer/:id
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const success = await deleteCustomer(req.params.id);
  if (!success) return next(new AppError("Customer not found", 404));

  logger.info("Customer deleted", { id: req.params.id });
  res.json({ message: "Customer deleted" });
});

export default router;
