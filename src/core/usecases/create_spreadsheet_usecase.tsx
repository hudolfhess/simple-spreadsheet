import { SpreadSheetEntity } from "@/commons/entities/spreadsheet";
import SpreadsheetRepository from "@/core/repositories/spreadsheet_repository";

export default async function createSpreadsheetUsecase(
  name: string
): Promise<SpreadSheetEntity> {
  return await SpreadsheetRepository.createSpreadsheet(name);
}
