const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    "x-api-key": API_KEY,
    ...(options.headers as Record<string, string>),
  };

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(
      `Request failed: ${res.status} ${res.statusText}. ${data ? JSON.stringify(data) : ""}`
    );
  }

  return data;
}

export async function addCustomer(id: string) {
  return request("/customer", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}

export async function getCustomer(id: string) {
  return request(`/customer/${id}`, { method: "GET" });
}

export async function deleteCustomer(id: string) {
  return request(`/customer/${id}`, { method: "DELETE" });
}
