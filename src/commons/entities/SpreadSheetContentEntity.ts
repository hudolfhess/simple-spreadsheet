import { CellEntity, getCellDataFrom } from "./CellEntity";

export interface SpreadSheetContentEntity {
  [row: number]: {
    [column: number]: CellEntity;
  };
}

export function updateSpreadSheetData(
  row: number,
  column: number,
  value: string,
  data: SpreadSheetContentEntity
) {
  console.log("exec: updateSpreadSheetData");
  return updateCell(row, column, value, data);
}

export function updateCell(
  row: number,
  column: number,
  value: string,
  data: SpreadSheetContentEntity
) {
  const currentCell: CellEntity = getCellDataFrom(row, column, value, data);

  const newData: SpreadSheetContentEntity = { ...data };
  newData[row] = data[row] || {};
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
  data: SpreadSheetContentEntity
): SpreadSheetContentEntity {
  // const newData: SpreadSheetContentEntity = { ...data };
  if (referencesTo === undefined) {
    return data;
  }
  for (const reference of referencesTo) {
    const referenceRow = reference[0];
    const referenceColumn = reference[1];
    if (data[referenceRow] === undefined) {
      data[referenceRow] = {};
    }
    if (data[referenceRow][referenceColumn] === undefined) {
      data[referenceRow][referenceColumn] = {
        value: "",
        formula: "",
        type: "string",
        referencedBy: [[row, column]],
      };
    } else {
      data[referenceRow][referenceColumn].referencedBy =
        data[referenceRow][referenceColumn].referencedBy || [];
      data[referenceRow][referenceColumn].referencedBy.push([row, column]);

      data[referenceRow][referenceColumn].referencedBy = removeDuplicateTuples(
        data[referenceRow][referenceColumn].referencedBy
      );
    }
  }

  return data;
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
  data: SpreadSheetContentEntity
): SpreadSheetContentEntity {
  // let newData: SpreadSheetContentEntity = { ...data };
  if (cell.referencedBy === undefined || cell.referencedBy.length === 0) {
    return data;
  }

  // TODO: fix cell when the formula is removed:
  //    step1 - fill cell with a formula: =A1+5
  //    step2 - change the value without a formula: Test
  //    step3 - change the value of A1
  //    step4 - the value from the cell with be changed
  for (const reference of cell.referencedBy) {
    data = updateCell(
      reference[0],
      reference[1],
      data[reference[0]][reference[1]].formula.toString(),
      data
    );
  }

  return data;
}
