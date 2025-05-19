import { SpreadSheetEntity } from "@/commons/entities/spreadsheet";
import { SpreadSheetContentEntity } from "@/commons/entities/spreadsheet-content";

export function getAllSpreadSheets(): Promise<SpreadSheetEntity[]> {
  return fetch("/api/spreadsheets").then((res) => res.json());
}

export function getSpreadSheetContentBySpreadSheetId(
  spreadsheet_id: string
): Promise<SpreadSheetEntity> {
  return fetch(`/api/spreadsheets/${spreadsheet_id}/content`).then((res) =>
    res.json()
  );
}
export function updateSpreadSheetContentBySpreadSheetId(
  spreadsheet_id: string,
  content: SpreadSheetContentEntity
): Promise<SpreadSheetEntity> {
  return fetch(`/api/spreadsheets/${spreadsheet_id}/content`, {
    method: "PUT",
    body: JSON.stringify({ content }),
  }).then((res) => res.json());
}
