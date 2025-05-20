import { SpreadSheetEntity } from "@/commons/entities/spreadsheet";
import { SpreadSheetContentEntity } from "@/commons/entities/spreadsheet_content";

export function getAllSpreadSheets(): Promise<SpreadSheetEntity[]> {
  return fetch("/api/spreadsheets").then((res) => res.json());
}

export function deleteSpreadSheetById(
  id: string
): Promise<SpreadSheetEntity[]> {
  return fetch(`/api/spreadsheets/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export function getSpreadSheetContentBySpreadSheetId(
  spreadsheetId: string
): Promise<SpreadSheetEntity> {
  return fetch(`/api/spreadsheets/${spreadsheetId}/content`).then((res) =>
    res.json()
  );
}

export function updateSpreadSheetContentBySpreadSheetId(
  spreadsheetId: string,
  content: SpreadSheetContentEntity
): Promise<SpreadSheetEntity> {
  return fetch(`/api/spreadsheets/${spreadsheetId}/content`, {
    method: "PUT",
    body: JSON.stringify({ content }),
  }).then((res) => res.json());
}
