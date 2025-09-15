import db from "../db.js";
import { Customer } from "../models/customer.js";

export const addCustomer = async (id: string): Promise<Customer> => {
  await db.read();
  const idStr = String(id);

  const existing = db.data?.customers.find((c) => c.id === idStr);
  if (existing) {
    throw new Error("Customer already exists");
  }

  const newCustomer: Customer = {
    id: idStr,
    createdAt: new Date().toISOString(),
  };

  db.data?.customers.push(newCustomer);
  await db.write();

  return newCustomer;
};

export const getCustomer = async (id: string): Promise<Customer | null> => {
  await db.read();
  return db.data?.customers.find((c) => c.id === String(id)) || null;
};

export const deleteCustomer = async (id: string): Promise<boolean> => {
  await db.read();
  const index = db.data?.customers.findIndex((c) => c.id === String(id));
  if (index === -1 || index === undefined) return false;

  db.data?.customers.splice(index, 1);
  await db.write();

  return true;
};
