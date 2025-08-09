import { NextRequest, NextResponse } from "next/server";

import { fetchUsers, addUser } from "@/services/externalApi";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url, BASE_URL);

  const count = searchParams.get("count");
  const data = await fetchUsers({ count: count ? +count : 6 });

  if (data.success) {
    return NextResponse.json(data);
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
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const position_id = formData.get("position_id") as string;
  const photo = formData.get("photo") as File;

  const data = await addUser({
    name,
    email,
    phone,
    position_id: Number(position_id),
    photo,
    token,
  });

  return NextResponse.json(data);
}
