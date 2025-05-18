import { NextRequest, NextResponse } from "next/server";
import { PostgresClient } from "../../../../prisma/prisma_clients";

export async function GET() {
  const spreadsheets = await PostgresClient.spreadsheet.findMany();
  return NextResponse.json(spreadsheets);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body;
  const spreadsheet = await PostgresClient.spreadsheet.create({
    data: { name: name },
  });
  return NextResponse.json(spreadsheet);
}
