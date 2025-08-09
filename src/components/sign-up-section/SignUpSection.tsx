import { cookies } from "next/headers";

import { SignUpForm } from "./SignUpForm";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const SignUpSection = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let positionsResponse = null;
  let error = null;

  try {
    const res = await fetch(`${baseUrl}/api/positions`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    positionsResponse = await res.json();
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
