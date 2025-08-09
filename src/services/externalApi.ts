import {
  type UsersResponse,
  type UsersParams,
  type PositionsResponse,
  type TokenResponse,
  type UserParams,
  type UserResponse,
} from "../types";

const BASE_EXTERNAL_URL = process.env.NEXT_PUBLIC_BASE_EXTERNAL_URL;

// Users
export async function fetchUsers({
  count,
}: UsersParams): Promise<UsersResponse> {
  const res = await fetch(`${BASE_EXTERNAL_URL}/users?page=1&count=${count}`, {
    cache: "no-store",
  });

  return res.json();
}

export async function addUser({
  name,
  email,
  phone,
  position_id,
  photo,
  token,
}: UserParams): Promise<UserResponse> {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("position_id", String(position_id));
  formData.append("photo", photo);

  const res = await fetch(`${BASE_EXTERNAL_URL}/users`, {
    method: "POST",
    cache: "no-store",
    headers: {
      token,
    },
    body: formData,
  });

  return res.json();
}

// Positions
export async function fetchPositions(): Promise<PositionsResponse> {
  const res = await fetch(`${BASE_EXTERNAL_URL}/positions`, {
    cache: "no-store",
  });

  return res.json();
}

// Token
export async function fetchToken(): Promise<TokenResponse> {
  const res = await fetch(`${BASE_EXTERNAL_URL}/token`, {
    cache: "no-store",
  });

  return res.json();
}
