import { NextRequest, NextResponse } from "next/server";
import createSpreadSheetUsecase from "@/core/usecases/create_spreadsheet_usecase";
import SpreadSheetRepository from "@/core/repositories/spreadsheet_repository";

export async function GET() {
  const spreadsheets = await SpreadSheetRepository.getSpreadSheets();
  return NextResponse.json(spreadsheets);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body;

  const spreadsheet = await createSpreadSheetUsecase(name);

  return NextResponse.json(spreadsheet);
}
