import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";
import { SpreadSheetContentEntity } from "@/commons/entities/SpreadSheetContentEntity";

export function getAllSpreadSheets(
  search?: string
): Promise<SpreadSheetEntity[]> {
  const searchQuery = search ? `?search=${search}` : "";
  return fetch(`/api/spreadsheets${searchQuery}`).then((res) => res.json());
}

export function getSpreadSheetById(
  spreadsheetId: string
): Promise<SpreadSheetEntity> {
  return fetch(`/api/spreadsheets/${spreadsheetId}`).then((res) => res.json());
}

export function updateSpreadSheetById(
  spreadsheetId: string,
  name: string
): Promise<SpreadSheetEntity> {
  return fetch(`/api/spreadsheets/${spreadsheetId}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  }).then((res) => res.json());
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
): Promise<SpreadSheetContentEntity> {
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
