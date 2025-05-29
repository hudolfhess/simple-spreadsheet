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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellValue, cellFormula]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editionMode]);

  const handleDoubleClick = () => {
    setEditionMode(true);
  };

  const handleOnClick = () => {
    setSelected(true);
    setSelectedCell({ row: row, column: column });
  };

  const handleBlur = () => {
    setValue(value);
    setEditionMode(false);
    setSelected(false);
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
    if (format.includes("number-percent")) {
      return `${(parseFloat(value) * 100).toFixed(2)} %`;
    }

    return value;
  };

  const cellStyles = function (): string {
    const styles: string[] = [];

    cellFormat.forEach((format) => {
      if (
        format.startsWith("text-") ||
        format.startsWith("font-") ||
        format.startsWith("bg-")
      ) {
        styles.push(format);
      }
    });

    return styles.join(" ");
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
            : `view-mode ${cellStyles()}`
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
