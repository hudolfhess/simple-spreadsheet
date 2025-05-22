"use client";

import { useState, useEffect } from "react";
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

export default function SpreadSheet(props: {
  id: string;
  columns: number;
  rows: number;
}) {
  const [data, setData] = useState<SpreadSheetContentEntity>({});
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getSpreadSheetContentBySpreadSheetId(props.id).then((res) => {
      if (res.success === true) return setData(res.content);

      setError(res.error);
    });
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
    setData((prevData) => updateSpreadSheetData(row, column, value, prevData));
    setUpdating(true);
  };

  return error ? (
    <div className="error">{error}</div>
  ) : (
    <div className="spreadsheet-content">
      <Editor id={props.id}></Editor>
      <div className="spreadsheet">
        <SpreadSheetContentContext.Provider
          value={{ data, handleOnCellChange }}
        >
          <table style={{ width: `${props.columns * 250}px` }}>
            <Header columns={props.columns} />
            <Body rows={props.rows} columns={props.columns} />
          </table>
        </SpreadSheetContentContext.Provider>
      </div>
    </div>
  );
}
