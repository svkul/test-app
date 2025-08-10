import { cookies } from "next/headers";

import { typedFetch } from "@/services/externalApi";
import { SignUpForm } from "./SignUpForm";
import { type PositionsResponse } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const SignUpSection = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let positionsResponse: PositionsResponse | null = null;
  let error = null;

  try {
    positionsResponse = await typedFetch<PositionsResponse>(
      `${baseUrl}/api/positions`,
      { cache: "no-store" }
    );
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <section
      id="signUp"
      className="container mx-auto flex flex-col items-center justify-center py-[70px] mb-[30px]"
    >
      <h2 className="h1 mb-[50px] text-center">Working with POST request</h2>

      <SignUpForm
        isToken={Boolean(token)}
        positions={
          !positionsResponse || error ? [] : positionsResponse.positions
        }
      />
    </section>
  );
};
