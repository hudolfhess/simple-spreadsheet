import { NextRequest, NextResponse } from "next/server";
import { PostgresClient, MongoClient } from "@/../prisma/prisma_clients";

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

  const spreadsheetContent = await MongoClient.spreadsheetContent.create({
    data: {
      spreadsheet_id: spreadsheet.id,
      content: JSON.stringify({}),
    },
  });

  spreadsheet.content = spreadsheetContent;

  return NextResponse.json(spreadsheet);
}
