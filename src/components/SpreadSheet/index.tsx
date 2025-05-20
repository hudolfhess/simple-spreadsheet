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
} from "@/http_clients/spreadsheets";
import "./styles.css";
import Link from "next/link";
import SpreadSheetContentContext from "./SpreadSheetContentContext";

export default function SpreadSheet(props: {
  id: string;
  columns: number;
  rows: number;
}) {
  const [data, setData] = useState<SpreadSheetContentEntity>({});
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
    setData((prevData) => updateSpreadSheetData(row, column, value, prevData));
    setUpdating(true);
  };

  return (
    <div className="spreadsheet-content">
      <div className="spreadsheet-header">
        <Link href="/spreadsheets/">Voltar</Link>
        <h1>Spreadsheet</h1>
      </div>
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
