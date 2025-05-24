"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./Header";
import Body from "./Body";
import {
  SpreadSheetContentEntity,
  updateSpreadSheetData,
} from "@/commons/entities/SpreadSheetContentEntity";
import {
  getSpreadSheetContentBySpreadSheetId,
  updateSpreadSheetContentBySpreadSheetId,
} from "@/http_clients/SpreadSheetsClient";
import "./styles.css";
import SpreadSheetContentContext from "./SpreadSheetContentContext";
import Editor from "./Editor";
import { CellEntity, getCellName } from "@/commons/entities/CellEntity";

export default function SpreadSheet(props: {
  id: string;
  columns: number;
  rows: number;
}) {
  const [data, setData] = useState<SpreadSheetContentEntity>({});
  const [selectedCell, setSelectedCell] = useState({ row: -1, column: -1 });
  const [currentCell, setCurrentCell] = useState<CellEntity | null>(null);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedCell.row === -1 || selectedCell.column === -1) {
      setCurrentCell(null);
      return;
    }
    if (!data[selectedCell.row]) return setCurrentCell(null);
    if (!data[selectedCell.row][selectedCell.column])
      return setCurrentCell(null);

    setCurrentCell(data[selectedCell.row][selectedCell.column]);
  }, [selectedCell, setCurrentCell, data]);

  useEffect(() => {
    const fetchSpreadSheetContent = async () => {
      const response = await getSpreadSheetContentBySpreadSheetId(props.id);
      if (response.success === true) return setData(response.content);

      setError(response.error);
    };

    fetchSpreadSheetContent();
  }, [props.id]);

  useEffect(() => {
    if (!updating) return;
    updateSpreadSheetContentBySpreadSheetId(props.id, data);
    setUpdating(false);
  }, [props.id, data, updating]);

  const updateCellFormat = function (
    row: number,
    column: number,
    newFormat: string
  ) {
    setUpdating(true);
    const newData = { ...data };
    const formats = new Set(newData[row][column].format || []);
    console.log(formats, newFormat);
    if (formats.has(newFormat)) {
      formats.delete(newFormat);
    } else {
      formats.add(newFormat);
    }
    newData[row][column].format = Array.from(formats);
    setData(newData);
  };

  const memoizedSetSelectedCell = useCallback(
    (cell: { row: number; column: number }) => {
      setSelectedCell(cell);
    },
    []
  );

  const handleOnCellChange = useCallback(
    function (row: number, column: number, value: string, format?: string[]) {
      console.log(format);
      setData((prevData) =>
        updateSpreadSheetData(row, column, value, prevData)
      );
      setUpdating(true);
    },
    [setData, setUpdating]
  );

  const contextValue = useMemo(
    () => ({
      data,
      handleOnCellChange,
      setSelectedCell: memoizedSetSelectedCell,
    }),
    [data, handleOnCellChange, memoizedSetSelectedCell]
  );

  return error ? (
    <div className="error">{error}</div>
  ) : (
    <div className="spreadsheet-content">
      <Editor id={props.id}></Editor>
      <div className="cell-toolbox-formats bg-gray-100 py-1 px-3 text-sm">
        {selectedCell.row == -1 || selectedCell.column == -1 ? null : (
          <div>
            <span className="mr-3">
              {getCellName(selectedCell.row, selectedCell.column)}
            </span>
            {!currentCell ? null : (
              <>
                {currentCell.formula !== "" ? (
                  <span className="text-gray-500 mr-3">
                    Formula: {currentCell.formula}
                  </span>
                ) : null}
                <span className="text-blue-500 mr-3">
                  Value: {currentCell.value}
                </span>
                <span>
                  <button
                    className="btn btn-xs mr-1"
                    onClick={(e) => {
                      e.preventDefault();
                      updateCellFormat(
                        selectedCell.row,
                        selectedCell.column,
                        "bold"
                      );
                    }}
                  >
                    Bold
                  </button>
                  <button
                    className="btn btn-xs mr-1"
                    onClick={(e) => {
                      e.preventDefault();
                      updateCellFormat(
                        selectedCell.row,
                        selectedCell.column,
                        "green-value"
                      );
                    }}
                  >
                    Green value
                  </button>
                  <button
                    className="btn btn-xs mr-1"
                    onClick={(e) => {
                      e.preventDefault();
                      updateCellFormat(
                        selectedCell.row,
                        selectedCell.column,
                        "red-value"
                      );
                    }}
                  >
                    Red value
                  </button>
                  <button
                    className="btn btn-xs mr-1"
                    onClick={(e) => {
                      e.preventDefault();
                      updateCellFormat(
                        selectedCell.row,
                        selectedCell.column,
                        "money-dollar"
                      );
                    }}
                  >
                    Money $
                  </button>
                  <button
                    className="btn btn-xs mr-1"
                    onClick={(e) => {
                      e.preventDefault();
                      updateCellFormat(
                        selectedCell.row,
                        selectedCell.column,
                        "money-brl"
                      );
                    }}
                  >
                    Money R$
                  </button>
                </span>
              </>
            )}
          </div>
        )}
      </div>
      <div className="spreadsheet">
        <SpreadSheetContentContext.Provider value={contextValue}>
          <table style={{ width: `${props.columns * 250}px` }}>
            <Header columns={props.columns} />
            <Body rows={props.rows} columns={props.columns} />
          </table>
        </SpreadSheetContentContext.Provider>
      </div>
    </div>
  );
}
