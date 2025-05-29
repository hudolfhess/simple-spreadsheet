import { NextRequest, NextResponse } from "next/server";
import createSpreadSheetUsecase from "@/core/usecases/CreateSpreadsheetUsecase";
import SpreadSheetRepository from "@/core/repositories/SpreadSheetRepository";

export async function GET(request: NextRequest) {
  try {
    const searchQuery =
      request.nextUrl.searchParams.get("search")?.toString() || "";
    const spreadsheets = await SpreadSheetRepository.getSpreadSheets(
      searchQuery
    );
    return NextResponse.json(spreadsheets);
  } catch (error) {
    const e = new Error(error as string);
    return NextResponse.json({
      error: e.message,
      status: 500,
      error_s: e.toString(),
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    const spreadsheet = await createSpreadSheetUsecase(name);

    return NextResponse.json(spreadsheet);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
