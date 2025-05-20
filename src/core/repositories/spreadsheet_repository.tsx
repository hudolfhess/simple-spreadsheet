import { SpreadSheetEntity } from "@/commons/entities/spreadsheet";
import { SpreadSheetContentEntity } from "@/commons/entities/spreadsheet_content";
import { MongoClient, PostgresClient } from "@/../prisma/prisma_clients";

async function createSpreadSheet(name: string): Promise<SpreadSheetEntity> {
  const spreadsheet = await PostgresClient.spreadsheet.create({
    data: { name: name },
  });

  const spreadsheetContent = await MongoClient.spreadsheetContent.create({
    data: {
      spreadsheet_id: spreadsheet.id,
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

async function loadSpreadSheetContentFrom(
  spreadsheetId: string
): Promise<SpreadSheetContentEntity> {
  const spreadsheetContent = await MongoClient.spreadsheetContent.findFirst({
    where: { spreadsheet_id: spreadsheetId },
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
  const spreadsheetContent = await MongoClient.spreadsheetContent.updateMany({
    data: {
      content: JSON.stringify(content),
      updatedAt: new Date(),
    },
    where: { spreadsheet_id: spreadsheetId },
  });

  console.log(spreadsheetContent);

  return true;
}

async function getSpreadSheets(): Promise<SpreadSheetEntity[]> {
  return await PostgresClient.spreadsheet.findMany();
}

const SpreadSheetRepository = {
  getSpreadSheets,
  findSpreadSheetById,
  createSpreadSheet,
  loadSpreadSheetContentFrom,
  updateSpreadSheetContent,
};

export default SpreadSheetRepository;
