import { useState, useRef, useEffect } from "react";
import { useSpreadSheetContent } from "../SpreadSheetContentContext";

export default function Cell(props: { row: number; column: number }) {
  const { data, handleOnCellChange } = useSpreadSheetContent();
  const { row, column } = props;
  const cellValue = (data[row] && data[row][column]?.value) || "";
  const cellFormula = (data[row] && data[row][column]?.formula) || "";

  const [editionMode, setEditionMode] = useState(false);
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState(cellValue);
  const [editValue, setEditValue] = useState(cellFormula || cellValue || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(cellValue);
    setEditValue(cellFormula || cellValue || "");
  }, [data]);

  useEffect(() => {
    if (editionMode === true) {
      inputRef.current?.focus();
    }
  }, [editionMode]);

  const handleDoubleClick = () => {
    setEditionMode(true);
  };

  const handleOnClick = () => {
    // setSelected(true);
  };

  const handleBlur = () => {
    setValue(value);
    setEditionMode(false);
    setSelected(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnCellChange(row, column, e.currentTarget.value);
      setEditionMode(false);
    } else if (e.key === "Escape") {
      setValue(value);
      setEditValue(editValue);
      setEditionMode(false);
    }
  };

  return (
    <div
      onClick={handleOnClick}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      className={selected ? "selected" : ""}
    >
      {editionMode === true ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>{value}</>
      )}
    </div>
  );
}
