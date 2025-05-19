import { NextRequest, NextResponse } from "next/server";
import { MongoClient, PostgresClient } from "@/../prisma/prisma_clients";

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

  const spreadsheetContent = await MongoClient.spreadsheetContent.findFirst({
    where: {
      spreadsheet_id: spreadsheet.id,
    },
  });

  return NextResponse.json(JSON.parse(spreadsheetContent?.content));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await request.json();
  const { content } = body;

  const spreadsheet = await PostgresClient.spreadsheet.findUnique({
    where: {
      id: id,
    },
  });

  await MongoClient.spreadsheetContent.updateMany({
    data: {
      content: JSON.stringify(content),
    },
    where: {
      spreadsheet_id: spreadsheet.id,
    },
  });

  return NextResponse.json({ success: true });
}
