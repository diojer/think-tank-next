import { fetchWithAuth } from "@/lib/header";

export async function index(route) {
  const path = `${process.env.APP_API_URL}${route}`;
  const response = await fetch(path, { next: { tags: route } });
  return response.json();
}

export async function getById(route, id) {
  const path = `${process.env.APP_API_URL}${route}`;
  const response = await fetch(`${path}/${id}`, {
    next: { tags: route },
  });
  return response.json();
}

export async function postWithAuth(route, data, contentType) {
  const path = `${process.env.APP_API_URL}${route}`;
  const response = await fetchWithAuth({
    path: path,
    init: {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
      },
    },
  });
  return response.json();
}

export async function post(route, data, contentType) {
  const path = `${process.env.APP_API_URL}${route}`;
  const response = await fetch(path, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": contentType,
    },
  });
  return response.json();
}

export async function remove(route, id) {
  const path = `${process.env.APP_API_URL}${route}`;
  const response = await fetchWithAuth({
    path: `${path}/${id}`,
    init: {
      method: "DELETE",
    },
  });
  return response.json();
}
