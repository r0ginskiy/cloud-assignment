const BASE_URL = "http://localhost:8000";

export async function addCustomer(id: string) {
  const res = await fetch(`${BASE_URL}/customer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export async function getCustomer(id: string) {
  const res = await fetch(`${BASE_URL}/customer/${id}`);
  return res.json();
}

export async function deleteCustomer(id: string) {
  const res = await fetch(`${BASE_URL}/customer/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
