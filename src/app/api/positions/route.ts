import { NextResponse } from "next/server";

import { fetchPositions } from "@/services/externalApi";

export async function GET() {
  const data = await fetchPositions();
  return NextResponse.json(data);
}
