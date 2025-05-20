import { NextRequest, NextResponse } from "next/server";
import createSpreadSheetUsecase from "@/core/usecases/create_spreadsheet_usecase";
import SpreadSheetRepository from "@/core/repositories/SpreadSheetRepository";

export async function GET(request: NextRequest) {
  const searchQuery =
    request.nextUrl.searchParams.get("search")?.toString() || "";
  const spreadsheets = await SpreadSheetRepository.getSpreadSheets(searchQuery);
  return NextResponse.json(spreadsheets);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body;

  const spreadsheet = await createSpreadSheetUsecase(name);

  return NextResponse.json(spreadsheet);
}
