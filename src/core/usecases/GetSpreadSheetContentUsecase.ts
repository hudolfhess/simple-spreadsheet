import { SpreadSheetContentEntity } from "@/commons/entities/SpreadSheetContentEntity";
import SpreadSheetRepository from "@/core/repositories/SpreadSheetRepository";
import { SpreadsheetNotFoundError } from "../repositories/SpreadSheetErrors";

interface SuccessResult {
  success: true;
  content: SpreadSheetContentEntity;
}

interface NotFoundErrorResult {
  success: false;
  errorType: "NOT_FOUND";
  errorMessage: string;
}

interface UnknownErrorResult {
  success: false;
  errorType: "UNKNOWN_ERROR";
  errorMessage: string;
}

type GetSpreadSheetContentResult =
  | SuccessResult
  | NotFoundErrorResult
  | UnknownErrorResult;

export default async function getSpreadSheetContentUsecase(
  spreadsheetId: string
): Promise<GetSpreadSheetContentResult> {
  try {
    const spreadsheet = await SpreadSheetRepository.findSpreadSheetById(
      spreadsheetId
    );

    const content = await SpreadSheetRepository.loadSpreadSheetContentFrom(
      spreadsheet.id
    );

    return handleSuccessResult(content);
  } catch (error) {
    if (error instanceof SpreadsheetNotFoundError) {
      return handleNotFoundResult(error);
    }
    return handleUnknownErrorResult(error as Error);
  }
}

function handleSuccessResult(
  content: SpreadSheetContentEntity
): GetSpreadSheetContentResult {
  return {
    success: true,
    content: content,
  };
}

function handleNotFoundResult(
  error: SpreadsheetNotFoundError
): GetSpreadSheetContentResult {
  return {
    success: false,
    errorType: "NOT_FOUND",
    errorMessage: error.message,
  };
}

function handleUnknownErrorResult(error: Error): GetSpreadSheetContentResult {
  return {
    success: false,
    errorType: "UNKNOWN_ERROR",
    errorMessage: error.message,
  };
}
