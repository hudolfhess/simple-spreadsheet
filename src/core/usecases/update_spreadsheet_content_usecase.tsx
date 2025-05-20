import { SpreadSheetContentEntity } from "@/commons/entities/spreadsheet_content";
import SpreadSheetRepository from "@/core/repositories/spreadsheet_repository";

export default async function updateSpreadSheetContentUsecase(
  spreadsheetId: string,
  content: SpreadSheetContentEntity
): Promise<{ success: boolean }> {
  const spreadsheet = await SpreadSheetRepository.findSpreadSheetById(
    spreadsheetId
  );

  if (!spreadsheet) {
    throw new Error("SpreadSheet not found");
  }

  await SpreadSheetRepository.updateSpreadSheetContent(spreadsheetId, content);

  return { success: true };
}
