"use client";

import { useState, useEffect } from "react";
import { getAllSpreadSheets } from "@/http_clients/spreadsheets";
import { SpreadSheetEntity } from "@/commons/entities/spreadsheet";
import "./styles.css";
import Button from "@/components/commons/Button";

export default function SpreadSheetListView() {
  const [spreadsheets, setSpreadsheets] = useState([] as SpreadSheetEntity[]);

  useEffect(() => {
    getAllSpreadSheets().then(setSpreadsheets);
  }, []);

  return (
    <div className="spreadsheets-list">
      <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white pl-8 pb-10">
        Spreadsheets List
      </h1>
      {spreadsheets.length > 0 ? (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200">
                Name
              </th>
              <th className="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {spreadsheets.map((spreadsheet) => (
              <tr key={spreadsheet.id}>
                <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  <a href={`/spreadsheets/${spreadsheet.id}`}>
                    {spreadsheet.name}
                  </a>
                </td>
                <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  <Button>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
