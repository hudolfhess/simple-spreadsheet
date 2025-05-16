import { CellEntity, getCellDataFrom } from "./cell";

export interface SpreadSheetEntity {
  [row: number]: {
    [column: number]: CellEntity;
  };
}

export function updateSpreadSheetData(
  row: number,
  column: number,
  value: string,
  data: SpreadSheetEntity
) {
  console.log("exec: updateSpreadSheetData");
  return updateCell(row, column, value, data);
}

export function updateCell(
  row: number,
  column: number,
  value: string,
  data: SpreadSheetEntity
) {
  const currentCell: CellEntity = getCellDataFrom(row, column, value, data);

  const newData: SpreadSheetEntity = { ...data };
  newData[row] = newData[row] || {};
  newData[row][column] = currentCell;
  return updateCellsWithReferenceTo(
    currentCell,
    updateReferencesBy(row, column, currentCell.referencesTo, newData)
  );
}

function updateReferencesBy(
  row: number,
  column: number,
  referencesTo: number[][] | undefined,
  data: SpreadSheetEntity
): SpreadSheetEntity {
  const newData: SpreadSheetEntity = { ...data };
  if (referencesTo === undefined) {
    return newData;
  }
  for (const reference of referencesTo) {
    const referenceRow = reference[0];
    const referenceColumn = reference[1];
    if (newData[referenceRow] === undefined) {
      newData[referenceRow] = {};
    }
    if (newData[referenceRow][referenceColumn] === undefined) {
      newData[referenceRow][referenceColumn] = {
        value: "",
        formula: "",
        type: "string",
        referencedBy: [[row, column]],
      };
    } else {
      newData[referenceRow][referenceColumn].referencedBy =
        newData[referenceRow][referenceColumn].referencedBy || [];
      newData[referenceRow][referenceColumn].referencedBy.push([row, column]);

      newData[referenceRow][referenceColumn].referencedBy =
        removeDuplicateTuples(
          newData[referenceRow][referenceColumn].referencedBy
        );
    }
  }

  return newData;
}

function removeDuplicateTuples(list: number[][]): number[][] {
  const seen = new Set();
  const result = [];
  for (const r of list) {
    if (!seen.has(r.toString())) result.push(r);
    seen.add(r.toString());
  }

  return result;
}

function updateCellsWithReferenceTo(
  cell: CellEntity,
  data: SpreadSheetEntity
): SpreadSheetEntity {
  let newData: SpreadSheetEntity = { ...data };
  if (cell.referencedBy === undefined || cell.referencedBy.length === 0) {
    return newData;
  }

  for (const reference of cell.referencedBy) {
    newData = updateCell(
      reference[0],
      reference[1],
      newData[reference[0]][reference[1]].formula.toString(),
      newData
    );
  }

  return newData;
}
