"use client";

import { useState, useEffect } from "react";
import { getAllSpreadSheets } from "@/http_clients/SpreadSheetsClient";
import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";
import "./styles.css";
import SearchBox from "../commons/SearchBox";
import SpreadSheetCreateModal from "../SpreadSheetCreateModal";
import ToggleView from "./ToggleView";
import GridView from "./GridView";
import TableView from "./TableView";

const VIEW_MODE_LIST = "list";
const VIEW_MODE_GRID = "grid";

export default function SpreadSheetListView() {
  const [spreadsheets, setSpreadSheets] = useState([] as SpreadSheetEntity[]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState(VIEW_MODE_GRID);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchSpreadSheets = async (querySearch: string) => {
    const response = await getAllSpreadSheets(querySearch);
    if (response.success) return setSpreadSheets(response.spreadsheets);

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
    <div className="mx-auto w-full max-w-7xl">
      {showCreateModal ? (
        <SpreadSheetCreateModal
          handleOnClose={() => {
            console.log("close");
            setShowCreateModal(false);
          }}
        />
      ) : null}
      <div className="grid grid-cols-2 gap-4 mb-3 pb-4 pt-4">
        <div className="flex justify-start self-end">
          <h1 className="text-3xl font-medium tracking-tight text-gray-950">
            SpreadSheets List
          </h1>
        </div>
        <div className="flex justify-end self-end">
          <SearchBox handleOnSearch={onSearch} />
        </div>
      </div>

      {error ? <p>{error}</p> : null}
      <div className="grid grid-cols-2 mt-4 mb-8">
        <div>
          <button
            // className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white opacity-100 focus:outline-none hover:bg-blue-600 cursor-pointer"
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            Create new SpreadSheet
          </button>
        </div>
        <div className="flex justify-end self-end">
          <ToggleView onViewModeChange={setViewMode} />
        </div>
      </div>
      {spreadsheets.length > 0 ? (
        <div>
          {viewMode === VIEW_MODE_LIST ? (
            <TableView
              spreadsheets={spreadsheets}
              onDelete={removeSpreadSheetFromData}
            />
          ) : (
            <GridView
              spreadsheets={spreadsheets}
              onDelete={removeSpreadSheetFromData}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
