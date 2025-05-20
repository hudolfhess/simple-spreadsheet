import { NextRequest, NextResponse } from "next/server";
import getSpreadSheetContentUsecase from "@/core/usecases/get_spreadsheet_content_usecase";
import updateSpreadSheetContentUsecase from "@/core/usecases/update_spreadsheet_content_usecase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const content = await getSpreadSheetContentUsecase(id);

  return NextResponse.json(content);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await request.json();
  const { content } = body;

  const result = await updateSpreadSheetContentUsecase(id, content);

  return NextResponse.json(result);
}
