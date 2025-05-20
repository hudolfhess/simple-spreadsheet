import { SpreadSheetEntity } from "@/commons/entities/spreadsheet";
import { MongoClient, PostgresClient } from "@/../prisma/prisma_clients";

async function createSpreadsheet(name: string): Promise<SpreadSheetEntity> {
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

async function getSpreadsheets(): Promise<SpreadSheetEntity[]> {
  return await PostgresClient.spreadsheet.findMany();
}

const SpreadsheetRepository = {
  createSpreadsheet,
  getSpreadsheets,
};

export default SpreadsheetRepository;
