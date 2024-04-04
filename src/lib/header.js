//code to get current session token
const token = "";

export async function fetchWithAuth(path) {
  const response = await fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
