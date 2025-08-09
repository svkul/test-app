import { useAuthStore } from "@/stores/useAuthStore";

export async function fetchWithAuth(
  url: RequestInfo,
  init: RequestInit = {},
  withAuth: boolean = false
): Promise<Response> {
  const headers = new Headers(init.headers);

  if (withAuth) {
    const token = useAuthStore.getState().token;

    if (token) {
      headers.set("Token", token);
    }
  }

  return fetch(url, {
    ...init,
    headers,
  });
}
