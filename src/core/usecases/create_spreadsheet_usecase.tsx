import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";
import SpreadSheetRepository from "@/core/repositories/SpreadSheetRepository";

export default async function createSpreadSheetUsecase(
  name: string
): Promise<SpreadSheetEntity> {
  return await SpreadSheetRepository.createSpreadSheet(name);
}
