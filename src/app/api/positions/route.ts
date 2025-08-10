import { NextResponse } from "next/server";

import { fetchPositions } from "@/services/externalApi";
import { type PositionsResponse } from "@/types";

export async function GET() {
  const data: PositionsResponse = await fetchPositions();
  return NextResponse.json<PositionsResponse>(data);
}
