import { SpreadSheetContentEntity } from "./spreadsheet_content";
const COLUMNS_NAMES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export interface CellEntity {
  value: string;
  formula: string;
  type?: string;
  referencesTo?: number[][];
  referencedBy?: number[][];
}

export function getCellDataFrom(
  row: number,
  column: number,
  value: string,
  data: SpreadSheetContentEntity
): CellEntity {
  const currentCell = extractCurrentCell(row, column, data);
  currentCell.value = value;

  if (isFormula(value)) {
    currentCell.formula = value;
    const operationData = extractFormulaFromCell(currentCell, data);
    currentCell.value = executeAllOperations(operationData.values).toString();
    currentCell.referencesTo = operationData.referencesTo;
  }

  currentCell.type = "string";

  if (isNumber(currentCell.value.toString())) {
    currentCell.type = "decimal";
  }

  return currentCell;
}

function extractCurrentCell(
  row: number,
  column: number,
  data: SpreadSheetContentEntity
): CellEntity {
  if (data[row] && data[row][column]) {
    return data[row][column];
  }
  return { value: "", formula: "" };
}

function isReferenceToAnotherCell(group: string[]): boolean {
  return group[1] !== group[3];
}

function isFormula(value: string): boolean {
  return value.startsWith("=");
}

function extractFormulaFromCell(
  cell: CellEntity,
  data: SpreadSheetContentEntity
): { values: string[]; referencesTo: number[][] } {
  const re = /(([A-Z]{1,})?([0-9\.]{1,}))([+\*\/\-])?/g;
  const groups = cell.formula.matchAll(re);

  const result = {
    values: [] as string[],
    referencesTo: [] as number[][],
  };

  for (const group of groups) {
    if (isReferenceToAnotherCell(group)) {
      const column = COLUMNS_NAMES.indexOf(group[2]);
      const row = parseInt(group[3]) - 1;
      result.referencesTo.push([row, column]);
      result.values.push(data[row][column]["value"].toString());
    } else {
      result.values.push(group[0]);
    }

    if (group[4]) {
      result.values.push(group[4]);
    }
  }

  return result;
}

function executeAllOperations(values: Array<string>): number {
  let last_operation: string = "";
  let i: number = 0;
  let result: number = 0;

  while (i <= values.length) {
    if (i === 0) {
      result = parseFloat(values[i]);
    } else {
      last_operation = values[i - 1];
      result = executeOperation(last_operation, result, parseFloat(values[i]));
    }
    i += 2;
  }

  return result;
}

function executeOperation(
  operation: string,
  value1: number,
  value2: number
): number {
  if (operation === "+") return value1 + value2;
  if (operation === "-") return value1 - value2;
  if (operation === "*") return value1 * value2;
  if (operation === "/") return value1 / value2;

  throw "Undefined operation Error";
}

function isNumber(value: string): boolean {
  return !isNaN(Number(value));
}
