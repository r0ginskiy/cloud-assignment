import db from "../db.js";

import {
  addCustomer,
  deleteCustomer,
  getCustomer,
} from "../services/customerService.js";

beforeEach(async () => {
  // очищаем "базу" перед каждым тестом
  await db.read();
  db.data = { customers: [] };
  await db.write();
});

describe("Customer Service", () => {
  test("добавление нового customer", async () => {
    const customer = await addCustomer("123");

    expect(customer).toMatchObject({
      id: "123",
    });
    expect(typeof customer.createdAt).toBe("string"); // createdAt в ISO формате
  });

  test("не даёт добавить дубликат", async () => {
    await addCustomer("111");
    await expect(addCustomer("111")).rejects.toThrow("Customer already exists");
  });

  test("получение существующего customer", async () => {
    await addCustomer("456");
    const customer = await getCustomer("456");

    expect(customer).not.toBeNull();
    expect(customer?.id).toBe("456");
  });

  test("возвращает null для несуществующего customer", async () => {
    const customer = await getCustomer("not-exist");
    expect(customer).toBeNull();
  });

  test("успешное удаление customer", async () => {
    await addCustomer("789");
    const result = await deleteCustomer("789");

    expect(result).toBe(true);

    const customer = await getCustomer("789");
    expect(customer).toBeNull();
  });

  test("неудачное удаление несуществующего customer", async () => {
    const result = await deleteCustomer("not-exist");
    expect(result).toBe(false);
  });
});
