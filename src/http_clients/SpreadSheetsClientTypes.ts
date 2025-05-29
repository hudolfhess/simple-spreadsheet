import { SpreadSheetContentEntity } from "@/commons/entities/SpreadSheetContentEntity";
import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";

interface SpreadSheetListSuccessResponse {
  success: true;
  spreadsheets: SpreadSheetEntity[];
}

interface SpreadSheetSuccessResponse {
  success: true;
  spreadsheet: SpreadSheetEntity;
}

interface SpreadSheetDeleteSuccessResponse {
  success: true;
}

interface SpreadSheetContentSuccessResponse {
  success: true;
  content: SpreadSheetContentEntity;
}

interface SpreadSheetContentUpdateSuccessResponse {
  success: true;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export type SpreadSheetListResponse =
  | ErrorResponse
  | SpreadSheetListSuccessResponse;

export type SpreadSheetResponse = ErrorResponse | SpreadSheetSuccessResponse;

export type SpreadSheetContentResponse =
  | ErrorResponse
  | SpreadSheetContentSuccessResponse;

export type SpreadSheetDeleteResponse =
  | ErrorResponse
  | SpreadSheetDeleteSuccessResponse;

export type SpreadSheetContentUpdateResponse =
  | ErrorResponse
  | SpreadSheetContentUpdateSuccessResponse;
