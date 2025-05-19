"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import { updateSpreadSheetData } from "@/commons/entities/spreadsheet_content";
import {
  getSpreadSheetContentBySpreadSheetId,
  updateSpreadSheetContentBySpreadSheetId,
} from "@/http_clients/spreadsheets";
import "./styles.css";

export default function SpreadSheet(props: {
  id: string;
  columns: number;
  rows: number;
}) {
  const [data, setData] = useState({});
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getSpreadSheetContentBySpreadSheetId(props.id).then(setData);
  }, [props.id]);

  useEffect(() => {
    if (!updating) return;
    updateSpreadSheetContentBySpreadSheetId(props.id, data);
    setUpdating(false);
  }, [updating]);

  const handleOnCellChange = function (
    row: number,
    column: number,
    value: string
  ) {
    setData(updateSpreadSheetData(row, column, value, data));
    setUpdating(true);
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
