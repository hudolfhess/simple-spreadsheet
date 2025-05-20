import { NextRequest, NextResponse } from "next/server";
import SpreadSheetRepository from "@/core/repositories/spreadsheet_repository";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const spreadsheet = SpreadSheetRepository.findSpreadSheetById(id);

  return NextResponse.json(spreadsheet);
}
