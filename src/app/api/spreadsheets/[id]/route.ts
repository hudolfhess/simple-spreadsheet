import { NextRequest, NextResponse } from "next/server";
import { PostgresClient } from "../../../../../prisma/prisma_clients";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const spreadsheet = await PostgresClient.spreadsheet.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json({
    0: {
      0: { value: "Salários" },
      1: { value: "5300.00", type: "decimal", referencedBy: [[2, 1]] },
      2: { value: id, type: "string" },
      3: { value: spreadsheet.name, type: "string" },
    },
    1: {
      0: { value: "Aluguel" },
      1: { value: "800.00", type: "decimal" },
    },
    2: {
      0: { value: "Total" },
      1: {
        value: "4500.00",
        type: "decimal",
        formula: "=B1-B2",
        referencesTo: [
          [0, 1],
          [1, 1],
        ],
      },
    },
  });
}
