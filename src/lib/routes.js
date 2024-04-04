export async function index(route) {
  const path = `${process.env.APP_API_URL}${route}`;
  const response = await fetch(path);
  const data = await response.json();
  return data.data;
}

export async function getById(route, id) {
  const path = `${process.env.APP_API_URL}${route}`;
  const response = await fetch(`${path}/${id}`);
  const data = await response.json();
  return data.data;
}
