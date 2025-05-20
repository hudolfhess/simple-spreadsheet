import { NextRequest, NextResponse } from "next/server";
import createSpreadsheetUsecase from "@/core/usecases/create_spreadsheet_usecase";
import SpreadsheetRepository from "@/core/repositories/spreadsheet_repository";

export async function GET() {
  const spreadsheets = await SpreadsheetRepository.getSpreadsheets();
  return NextResponse.json(spreadsheets);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body;

  const spreadsheet = await createSpreadsheetUsecase(name);

  return NextResponse.json(spreadsheet);
}
