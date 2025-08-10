import { NextRequest, NextResponse } from "next/server";

import { UserResponse, type UserParams, type UsersResponse } from "@/types";
import { fetchUsers, addUser } from "@/services/externalApi";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url, BASE_URL);

  const count = searchParams.get("count");
  const data = await fetchUsers({ count: count ? +count : 6 });
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (data.success) {
    return NextResponse.json<UsersResponse>(data);
  } else {
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  const formData = await req.formData();

  const params: UserParams = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    position_id: Number(formData.get("position_id")),
    photo: formData.get("photo") as File,
  };

  const data: UserResponse = await addUser(params, { headers: { token } });
  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json<UserResponse>(data);
}
