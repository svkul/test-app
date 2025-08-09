import { cookies } from "next/headers";

import { RequestSectionClient } from "./RequestSectionClient";
import { type UsersResponse, type PositionsResponse } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const count = process.env.NEXT_PUBLIC_USER_PER_PAGE
  ? Number(process.env.NEXT_PUBLIC_USER_PER_PAGE)
  : 6;

export const RequestsSection = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let positionsResponse = null;
  let positionsError = null;
  let usersResponse = null;
  let usersError = null;

  try {
    const res = await fetch(`${baseUrl}/api/positions`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch users");
    positionsResponse = (await res.json()) as PositionsResponse;
  } catch (e) {
    positionsError = e instanceof Error ? e.message : "Unknown error";
  }

  try {
    const res = await fetch(`${baseUrl}/api/users?count=${count}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    usersResponse = (await res.json()) as UsersResponse;
  } catch (e) {
    usersError = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <section className="container mx-auto">
      <RequestSectionClient
        isToken={Boolean(token)}
        positionsResponse={positionsResponse}
        positionsError={positionsError}
        usersResponse={usersResponse}
        usersError={usersError}
      />
    </section>
  );
};
