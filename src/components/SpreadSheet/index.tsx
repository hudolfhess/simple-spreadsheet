"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import { updateSpreadSheetData } from "./entities/spreadsheet";
import "./styles.css";

export default function SpreadSheet(props: { columns: number; rows: number }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/api/spreadsheets")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const handleOnCellChange = function (
    row: number,
    column: number,
    value: string
  ) {
    setData(updateSpreadSheetData(row, column, value, data));
  };

  return (
    <div className="spreadsheet">
      <table>
        <Header columns={props.columns} />
        <Body
          rows={props.rows}
          columns={props.columns}
          data={data}
          handleOnCellChange={handleOnCellChange}
        />
      </table>
    </div>
  );
}
