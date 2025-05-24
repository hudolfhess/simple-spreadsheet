import { useState, useRef, useEffect } from "react";
import { useSpreadSheetContent } from "../SpreadSheetContentContext";
import React from "react";

function Cell(props: { row: number; column: number }) {
  const { data, handleOnCellChange, setSelectedCell } = useSpreadSheetContent();
  const { row, column } = props;
  const cellValue = (data[row] && data[row][column]?.value) || "";
  const cellFormula = (data[row] && data[row][column]?.formula) || "";
  const cellFormat = (data[row] && data[row][column]?.format) || [];

  const [editionMode, setEditionMode] = useState(false);
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState(cellValue);
  const [editValue, setEditValue] = useState(cellFormula || cellValue || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cellValue != value) setValue(cellValue);
    if ((cellFormula || cellValue) != editValue)
      setEditValue(cellFormula || cellValue || "");
  }, [cellValue, cellFormula]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editionMode]);

  const handleDoubleClick = () => {
    setEditionMode(true);
    // setSelectedCell({ row: -1, column: -1 });
  };

  const handleOnClick = () => {
    setSelected(true);
    setSelectedCell({ row: row, column: column });
  };

  const handleBlur = () => {
    setValue(value);
    setEditionMode(false);
    setSelected(false);
    // setSelectedCell({ row: -1, column: -1 });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnCellChange(row, column, e.currentTarget.value, cellFormat);
      setEditionMode(false);
      setSelected(false);
    } else if (e.key === "Escape") {
      setValue(value);
      setEditValue(editValue);
      setEditionMode(false);
      setSelected(false);
    }
  };

  const formatExhibitionValue = function (
    value: string,
    format: string[]
  ): string {
    if (format.includes("money-dollar")) {
      return parseFloat(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    if (format.includes("money-brl")) {
      return parseFloat(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    return value;
  };

  return (
    <div
      onBlur={handleBlur}
      className={`cell-container ${selected ? "selected" : ""}`}
    >
      <input
        ref={inputRef}
        type="text"
        value={
          editionMode ? editValue : formatExhibitionValue(value, cellFormat)
        }
        className={`${
          editionMode
            ? "input input-secondary edit-mode"
            : `view-mode ${cellFormat.includes("bold") ? "font-bold" : ""} ${
                cellFormat.includes("green-value") ? "text-green-700" : ""
              } ${cellFormat.includes("red-value") ? "text-red-500" : ""}`
        }`}
        disabled={!editionMode}
        onChange={(e) => setEditValue(e.target.value)}
        onClick={handleOnClick}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
      />
      {editionMode ? null : (
        <div
          className="remove-disable"
          onClick={handleOnClick}
          onDoubleClick={handleDoubleClick}
          onBlur={handleBlur}
          tabIndex={0}
        ></div>
      )}
    </div>
  );
}

export default Cell;
