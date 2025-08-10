import {
  type UsersResponse,
  type UsersParams,
  type PositionsResponse,
  type TokenResponse,
  type UserParams,
  type UserResponse,
} from "../types";

const BASE_EXTERNAL_URL = process.env.NEXT_PUBLIC_BASE_EXTERNAL_URL;

export async function typedFetch<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

function buildUrl<TParams extends Record<string, string | number>>(
  base: string,
  params?: TParams
) {
  if (!params) return base;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) =>
    searchParams.append(key, String(value))
  );

  return `${base}?${searchParams.toString()}`;
}

export function fetchUsers(params: UsersParams) {
  return typedFetch<UsersResponse>(
    buildUrl(`${BASE_EXTERNAL_URL}/users`, { page: 1, ...params }),
    {
      cache: "no-store",
    }
  );
}

export function addUser(
  { name, email, phone, position_id, photo }: UserParams,
  init?: RequestInit
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("position_id", String(position_id));
  formData.append("photo", photo);

  return typedFetch<UserResponse>(`${BASE_EXTERNAL_URL}/users`, {
    method: "POST",
    cache: "no-store",
    headers: { ...(init?.headers ?? {}) },
    body: formData,
  });
}

// Positions
export function fetchPositions() {
  return typedFetch<PositionsResponse>(`${BASE_EXTERNAL_URL}/positions`, {
    cache: "no-store",
  });
}

// Token
export function fetchToken() {
  return typedFetch<TokenResponse>(`${BASE_EXTERNAL_URL}/token`, {
    cache: "no-store",
  });
}
