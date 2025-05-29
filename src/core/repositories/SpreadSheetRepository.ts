import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";
import { SpreadSheetContentEntity } from "@/commons/entities/SpreadSheetContentEntity";
import { MongoClient, PostgresClient } from "@/../prisma/prisma_clients";
import { SpreadsheetNotFoundError } from "./SpreadSheetErrors";

async function createSpreadSheet(name: string): Promise<SpreadSheetEntity> {
  const spreadsheet = await PostgresClient.spreadSheet.create({
    data: { name: name },
  });

  const content = await MongoClient.spreadSheetContent.create({
    data: {
      spreadsheetId: spreadsheet.id,
      content: JSON.stringify({}),
    },
  });

  return {
    id: spreadsheet.id,
    name: spreadsheet.name,
    content_id: content.id,
    createdAt: spreadsheet.createdAt.toString(),
    updatedAt: spreadsheet.updatedAt.toString(),
  };
}

async function findSpreadSheetById(id: string): Promise<SpreadSheetEntity> {
  const spreadsheet = await PostgresClient.spreadSheet.findUnique({
    where: { id: id },
  });

  if (spreadsheet)
    return {
      id: spreadsheet.id,
      name: spreadsheet.name,
      createdAt: spreadsheet.createdAt.toString(),
      updatedAt: spreadsheet.updatedAt.toString(),
    };

  throw new SpreadsheetNotFoundError(id);
}

async function updateSpreadSheetById(
  spreadsheetId: string,
  name: string
): Promise<SpreadSheetEntity> {
  return PostgresClient.spreadSheet.update({
    data: { updatedAt: new Date(), name: name },
    where: { id: spreadsheetId },
  });
}

async function destroySpreadSheetById(id: string): Promise<boolean> {
  await PostgresClient.spreadSheet.delete({
    where: { id: id },
  });

  await MongoClient.spreadSheetContent.delete({
    where: { spreadsheetId: id },
  });

  return true;
}

async function loadSpreadSheetContentFrom(
  spreadsheetId: string
): Promise<SpreadSheetContentEntity> {
  const spreadsheetContent = await MongoClient.spreadSheetContent.findUnique({
    where: { spreadsheetId: spreadsheetId },
  });

  if (!spreadsheetContent || spreadsheetContent.content === null) {
    return {};
  }

  return JSON.parse(spreadsheetContent.content as string);
}

async function updateSpreadSheetContent(
  spreadsheetId: string,
  content: SpreadSheetContentEntity
): Promise<boolean> {
  await PostgresClient.spreadSheet.update({
    data: { updatedAt: new Date() },
    where: { id: spreadsheetId },
  });
  await MongoClient.spreadSheetContent.update({
    data: {
      content: JSON.stringify(content),
      updatedAt: new Date(),
    },
    where: { spreadsheetId: spreadsheetId },
  });

  return true;
}

async function getSpreadSheets(search?: string): Promise<SpreadSheetEntity[]> {
  const spreadSheets = await PostgresClient.spreadSheet.findMany({
    where: search
      ? {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {},
    orderBy: {
      updatedAt: "desc",
    },
  });

  return spreadSheets.map((spreadsheet) => {
    return {
      id: spreadsheet.id,
      name: spreadsheet.name,
      createdAt: spreadsheet.createdAt.toString(),
      updatedAt: spreadsheet.updatedAt.toString(),
    };
  });
}

const SpreadSheetRepository = {
  getSpreadSheets,
  findSpreadSheetById,
  updateSpreadSheetById,
  createSpreadSheet,
  destroySpreadSheetById,
  loadSpreadSheetContentFrom,
  updateSpreadSheetContent,
};

export default SpreadSheetRepository;
