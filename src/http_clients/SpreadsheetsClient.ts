import { SpreadSheetContentEntity } from "@/commons/entities/SpreadSheetContentEntity";
import {
  ErrorResponse,
  SpreadSheetContentResponse,
  SpreadSheetContentUpdateResponse,
  SpreadSheetDeleteResponse,
  SpreadSheetListResponse,
  SpreadSheetResponse,
} from "./SpreadsheetsClientTypes";

export async function getAllSpreadSheets(
  search?: string
): Promise<SpreadSheetListResponse> {
  const searchQuery = search ? `?search=${search}` : "";
  const response = await fetch(`/api/spreadsheets${searchQuery}`);

  if (!response.ok) return responseError(response);

  const spreadsheets = await response.json();
  return {
    success: true,
    spreadsheets: spreadsheets,
  };
}

export async function getSpreadSheetById(
  spreadsheetId: string
): Promise<SpreadSheetResponse> {
  const response = await fetch(`/api/spreadsheets/${spreadsheetId}`);

  if (!response.ok) return responseError(response);

  const spreadsheet = await response.json();
  return {
    success: true,
    spreadsheet: spreadsheet,
  };
}

export async function updateSpreadSheetById(
  spreadsheetId: string,
  name: string
): Promise<SpreadSheetResponse> {
  const response = await fetch(`/api/spreadsheets/${spreadsheetId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) return responseError(response);

  const spreadsheet = await response.json();
  return {
    success: true,
    spreadsheet: spreadsheet,
  };
}

export async function deleteSpreadSheetById(
  id: string
): Promise<SpreadSheetDeleteResponse> {
  const response = await fetch(`/api/spreadsheets/${id}`, { method: "DELETE" });

  if (!response.ok) return responseError(response);

  return {
    success: true,
  };
}

export async function getSpreadSheetContentBySpreadSheetId(
  spreadsheetId: string
): Promise<SpreadSheetContentResponse> {
  const response = await fetch(`/api/spreadsheets/${spreadsheetId}/content`);

  if (!response.ok) return responseError(response);

  const content = await response.json();
  return {
    success: true,
    content: content,
  };
}

export async function updateSpreadSheetContentBySpreadSheetId(
  spreadsheetId: string,
  content: SpreadSheetContentEntity
): Promise<SpreadSheetContentUpdateResponse> {
  const response = await fetch(`/api/spreadsheets/${spreadsheetId}/content`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) return responseError(response);

  return {
    success: true,
  };
}

async function responseError(response: Response): Promise<ErrorResponse> {
  const text = await response.text();
  const errorMessage = JSON.parse(text)["error"];
  return {
    success: false,
    error: errorMessage,
  };
}
