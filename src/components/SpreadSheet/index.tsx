"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import { updateSpreadSheetData } from "./entities/spreadsheet_content";
import { getSpreadSheetById } from "@/http_clients/spreadsheets";
import "./styles.css";

export default function SpreadSheet(props: {
  id: string;
  columns: number;
  rows: number;
}) {
  const [data, setData] = useState({});

  useEffect(() => {
    getSpreadSheetById(props.id).then(setData);
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
