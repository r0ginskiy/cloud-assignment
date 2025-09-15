import { Customer } from "../models/customer.js";

const customers: Customer[] = [];

export const addCustomer = (id: string): Customer => {
  const idStr = String(id);

  const existing = customers.find((c) => c.id === idStr);
  if (existing) {
    throw new Error("Customer already exists");
  }

  const newCustomer: Customer = {
    id: idStr,
    createdAt: new Date(),
  };

  customers.push(newCustomer);
  return newCustomer;
};

export const getCustomer = (id: string): Customer | null => {
  return customers.find((c) => c.id === String(id)) || null;
};

export const deleteCustomer = (id: string): boolean => {
  const index = customers.findIndex((c) => c.id === String(id));
  if (index === -1) return false;

  customers.splice(index, 1);
  return true;
};
