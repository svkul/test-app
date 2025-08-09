import { NextResponse } from "next/server";

import { fetchToken } from "@/services/externalApi";

export async function GET() {
  const data = await fetchToken();

  if (data.success) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("token", data.token, {
      httpOnly: true,
      maxAge: 40 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } else {
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
