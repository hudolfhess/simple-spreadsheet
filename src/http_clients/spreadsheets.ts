import { SpreadSheetEntity } from "@/commons/entities/spreadsheet";

export function getAllSpreadSheets(): Promise<SpreadSheetEntity[]> {
  return fetch("/api/spreadsheets").then((res) => res.json());
}

export function getSpreadSheetById(id: string): Promise<SpreadSheetEntity> {
  return fetch(`/api/spreadsheets/${id}`).then((res) => res.json());
}
