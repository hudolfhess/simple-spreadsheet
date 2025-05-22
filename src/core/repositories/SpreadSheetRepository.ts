import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";
import { SpreadSheetContentEntity } from "@/commons/entities/SpreadSheetContentEntity";
import { MongoClient, PostgresClient } from "@/../prisma/prisma_clients";

async function createSpreadSheet(name: string): Promise<SpreadSheetEntity> {
  const spreadsheet = await PostgresClient.spreadsheet.create({
    data: { name: name },
  });

  const spreadsheetContent = await MongoClient.spreadSheetContent.create({
    data: {
      spreadsheetId: spreadsheet.id,
      content: JSON.stringify({}),
    },
  });

  spreadsheet.content = spreadsheetContent;
  return spreadsheet;
}

async function findSpreadSheetById(
  id: string
): Promise<SpreadSheetEntity | null> {
  return await PostgresClient.spreadsheet.findUnique({
    where: { id: id },
  });
}

async function updateSpreadSheetById(
  spreadsheetId: string,
  name: string
): Promise<boolean> {
  return await PostgresClient.spreadsheet.update({
    data: { updatedAt: new Date(), name: name },
    where: { id: spreadsheetId },
  });
}

async function destroySpreadSheetById(id: string): Promise<boolean> {
  await PostgresClient.spreadsheet.delete({
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

  if (!spreadsheetContent) {
    return {};
  }

  return JSON.parse(spreadsheetContent.content);
}

async function updateSpreadSheetContent(
  spreadsheetId: string,
  content: SpreadSheetContentEntity
): Promise<boolean> {
  await PostgresClient.spreadsheet.update({
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
  return await PostgresClient.spreadsheet.findMany({
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
