import { NextResponse } from "next/server";

import { fetchToken } from "@/services/externalApi";
import {
  type TokenResponse,
  type ErrorResponse,
  type SuccessResponse,
} from "@/types";

export async function GET() {
  const data: TokenResponse = await fetchToken();
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (data.success) {
    const response = NextResponse.json<SuccessResponse>({ success: true });
    response.cookies.set("token", data.token, {
      httpOnly: true,
      maxAge: 40 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } else {
    return NextResponse.json<ErrorResponse>(
      { error: "Failed to get token" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const response = NextResponse.json<SuccessResponse>({ success: true });
  response.cookies.set("token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
