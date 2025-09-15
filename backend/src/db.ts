import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

type Customer = {
  id: string;
  createdAt: string;
};

type Data = {
  customers: Customer[];
};

const adapter = new JSONFile<Data>("./db.json");
const db = new Low<Data>(adapter, { customers: [] });

export const initDB = async () => {
  await db.read();
  if (!db.data) {
    db.data = { customers: [] };
  }
  await db.write();
};

export default db;
