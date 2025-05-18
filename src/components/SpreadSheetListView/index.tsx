"use client";

import { useState, useEffect } from "react";
import { getAllSpreadSheets } from "@/http_clients/spreadsheets";
import { SpreadSheetEntity } from "@/components/SpreadSheet/entities/spreadsheet";
import "./styles.css";

export default function SpreadSheetListView() {
  const [spreadsheets, setSpreadsheets] = useState([] as SpreadSheetEntity[]);

  useEffect(() => {
    getAllSpreadSheets().then(setSpreadsheets);
  }, []);

  return (
    <div className="spreadsheets-list">
      <h1>Spreadsheets List</h1>
      {spreadsheets.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {spreadsheets.map((spreadsheet) => (
              <tr key={spreadsheet.id}>
                <td>
                  <a href={`/spreadsheets/${spreadsheet.id}`}>
                    {spreadsheet.name}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
