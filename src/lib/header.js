//code to get current session token
import { cookies } from "next/headers";

export async function fetchWithAuth(request) {
  const token = cookies().get("__session");
  const response = await fetch(request.path, {
    ...request.init,
    headers: {
      authorization: `${token}`,
    },
  });
  return response;
}
