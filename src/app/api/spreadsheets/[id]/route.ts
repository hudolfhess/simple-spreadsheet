import { NextRequest, NextResponse } from "next/server";
import { PostgresClient } from "@/../prisma/prisma_clients";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const spreadsheet = await PostgresClient.spreadsheet.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(spreadsheet);
}
