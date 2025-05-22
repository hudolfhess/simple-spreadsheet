import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";
import { SpreadSheetContentEntity } from "@/commons/entities/SpreadSheetContentEntity";

interface ErrorResponse {
  success: false;
  error: string;
}

interface SpreadSheetSuccessResponse {
  success: true;
  spreadsheet: SpreadSheetEntity;
}

interface ContentSuccessResponse {
  success: true;
  content: SpreadSheetContentEntity;
}

type ContentResponse = ErrorResponse | ContentSuccessResponse;
type SpreadSheetResponse = ErrorResponse | SpreadSheetSuccessResponse;

export function getAllSpreadSheets(
  search?: string
): Promise<SpreadSheetEntity[]> {
  const searchQuery = search ? `?search=${search}` : "";
  return fetch(`/api/spreadsheets${searchQuery}`).then((res) => res.json());
}

export function getSpreadSheetById(
  spreadsheetId: string
): Promise<SpreadSheetResponse> {
  return fetch(`/api/spreadsheets/${spreadsheetId}`).then((res) => {
    if (res.status === 200) {
      return res.json().then((spreadsheet) => ({
        success: true,
        spreadsheet: spreadsheet,
      }));
    }
    return res.text().then((text) => ({
      success: false,
      error: JSON.parse(text)["error"],
    }));
  });
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
): Promise<ContentResponse> {
  return fetch(`/api/spreadsheets/${spreadsheetId}/content`).then((res) => {
    if (res.status === 200) {
      return res.json().then((content) => ({
        success: true,
        content: content,
      }));
    }
    return res.text().then((text) => ({
      success: false,
      error: JSON.parse(text)["error"],
    }));
  });
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
