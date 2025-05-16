import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    0: {
      0: { value: "Salário" },
      1: { value: "5300.00", type: "decimal" },
    },
    1: {
      0: { value: "Aluguel" },
      1: { value: "800.00", type: "decimal" },
    },
    2: {
      0: { value: "Total" },
      1: { value: "4500.00", type: "decimal", formula: "=B1-B2" },
    },
  });
}
