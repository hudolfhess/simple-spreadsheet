"use client";

import { useState, useEffect } from "react";
import {
  deleteSpreadSheetById,
  getAllSpreadSheets,
} from "@/http_clients/SpreadSheetsClient";
import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";
import "./styles.css";
import DeleteButton from "@/components/commons/DeleteButton";
import Link from "next/link";
import SearchBox from "../commons/SearchBox";

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
      <h1 className="mt-5 text-3xl font-medium tracking-tight text-gray-950 dark:text-white pl-8 pb-5">
        SpreadSheets List
      </h1>
      <SearchBox handleOnSearch={onSearch} />
      {error ? <p>{error}</p> : null}
      {spreadsheets.length > 0 ? (
        <div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="p-4 pl-8">Name</th>
                <th className="p-4 pl-8">Last update</th>
                <th className="p-4 pl-8 w-72">Actions</th>
              </tr>
            </thead>
            <tbody>
              {spreadsheets.map((spreadsheet) => (
                <tr
                  key={spreadsheet.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="border-b border-gray-100 p-4 pl-8 text-gray-700 dark:border-gray-700 dark:text-gray-400">
                    <Link href={`/spreadsheets/${spreadsheet.id}`}>
                      {spreadsheet.name}
                    </Link>
                  </td>
                  <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    {new Date(spreadsheet.updatedAt).toString()}
                  </td>
                  <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400 w-72">
                    <DeleteButton
                      handleOnClick={() => onDeleteSpreadSheet(spreadsheet.id)}
                    >
                      Delete
                    </DeleteButton>
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
