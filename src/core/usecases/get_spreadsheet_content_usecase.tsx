import { SpreadSheetContentEntity } from "@/commons/entities/spreadsheet_content";
import SpreadSheetRepository from "@/core/repositories/spreadsheet_repository";

export default async function getSpreadSheetContentUsecase(
  spreadsheetId: string
): Promise<SpreadSheetContentEntity> {
  const spreadsheet = await SpreadSheetRepository.findSpreadSheetById(
    spreadsheetId
  );

  if (!spreadsheet) {
    throw new Error("SpreadSheet not found");
  }

  const content = await SpreadSheetRepository.loadSpreadSheetContentFrom(
    spreadsheet.id
  );

  return content;
}
