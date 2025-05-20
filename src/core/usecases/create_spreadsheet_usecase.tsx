import { SpreadSheetEntity } from "@/commons/entities/spreadsheet";
import SpreadSheetRepository from "@/core/repositories/spreadsheet_repository";

export default async function createSpreadSheetUsecase(
  name: string
): Promise<SpreadSheetEntity> {
  return await SpreadSheetRepository.createSpreadSheet(name);
}
