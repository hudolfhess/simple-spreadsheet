import { useState, useRef, useEffect } from "react";

export default function Cell(props: {
  row: number;
  column: number;
  value: string;
  formula: string;
  handleOnCellChange: (row: number, column: number, value: string) => void;
}) {
  const [editionMode, setEditionMode] = useState(false);
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState(props.value);
  const [editValue, setEditValue] = useState(props.value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (editionMode === true) {
      inputRef.current?.focus();
    }
  }, [editionMode]);

  const handleDoubleClick = () => {
    if (props.formula !== undefined && props.formula.length > 0) {
      setEditValue(props.formula);
    } else {
      setEditValue(props.value);
    }
    setEditionMode(true);
  };

  const handleOnClick = () => {
    // setSelected(true);
  };

  const handleBlur = () => {
    setValue(props.value);
    setEditionMode(false);
    setSelected(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.handleOnCellChange(props.row, props.column, e.currentTarget.value);
      setEditionMode(false);
    } else if (e.key === "Escape") {
      setValue(props.value);
      setEditValue(props.formula || props.value);
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
