import { NextRequest, NextResponse } from "next/server";
import SpreadSheetRepository from "@/core/repositories/SpreadSheetRepository";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const spreadsheet = await SpreadSheetRepository.findSpreadSheetById(id);

  return NextResponse.json(spreadsheet);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  await SpreadSheetRepository.destroySpreadSheetById(id);

  return NextResponse.json({ success: true });
}
