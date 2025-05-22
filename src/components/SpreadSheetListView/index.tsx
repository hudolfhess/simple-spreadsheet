"use client";

import { useState, useEffect } from "react";
import {
  deleteSpreadSheetById,
  getAllSpreadSheets,
} from "@/http_clients/SpreadSheetsClient";
import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";
import "./styles.css";
import Button from "@/components/commons/Button";
import Link from "next/link";

export default function SpreadSheetListView() {
  const [spreadsheets, setSpreadSheets] = useState([] as SpreadSheetEntity[]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchSpreadSheets = async (querySearch: string) => {
    const response = await getAllSpreadSheets(querySearch);
    if (response.success) return setSpreadSheets(response.spreadsheets);

    setError(response.error);
  };

  const onDeleteSpreadSheet = async (id: string) => {
    const response = await deleteSpreadSheetById(id);
    if (response.success) return removeSpreadSheetFromData(id);

    setError(response.error);
  };

  const removeSpreadSheetFromData = (id: string) => {
    setSpreadSheets((spreadsheets) =>
      spreadsheets.filter((spreadsheet) => spreadsheet.id !== id)
    );
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search === "") {
      fetchSpreadSheets("");
      return;
    }

    const searchEvent = setTimeout(() => {
      fetchSpreadSheets(search);
    }, 500);

    return () => clearTimeout(searchEvent);
  }, [search]);

  return (
    <div className="spreadsheets-list">
      <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white pl-8 pb-10">
        SpreadSheets List
      </h1>
      <div className="filter pl-8 pb-10">
        <input
          onChange={onSearch}
          type="text"
          placeholder="Search..."
          className="block w-100 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
      {spreadsheets.length > 0 ? (
        <div>
          <table className="w-full table-fixed divide-y divide-gray-100 border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200">
                  Name
                </th>
                <th className="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200">
                  Last update
                </th>
                <th className="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200 w-72">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {spreadsheets.map((spreadsheet) => (
                <tr key={spreadsheet.id}>
                  <td className="border-b border-gray-100 p-4 pl-8 text-gray-700 dark:border-gray-700 dark:text-gray-400">
                    <Link href={`/spreadsheets/${spreadsheet.id}`}>
                      {spreadsheet.name}
                    </Link>
                  </td>
                  <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    {new Date(spreadsheet.updatedAt).toString()}
                  </td>
                  <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400 w-72">
                    <Button
                      handleOnClick={() => onDeleteSpreadSheet(spreadsheet.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
