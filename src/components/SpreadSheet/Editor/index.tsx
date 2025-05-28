"use client";

import { useState, useEffect, useRef } from "react";
import {
  getSpreadSheetById,
  updateSpreadSheetById,
} from "@/http_clients/SpreadSheetsClient";
import Link from "next/link";
import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";
import Image from "next/image";

export default function Editor(props: { id: string }) {
  const [data, setData] = useState<SpreadSheetEntity>({
    id: props.id,
    name: "",
    updatedAt: "",
    createdAt: "",
  });
  const [editionMode, setEditionMode] = useState(false);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSpreadSheet = async () => {
      const result = await getSpreadSheetById(props.id);
      if (result.success === true) setData(result.spreadsheet);
    };

    fetchSpreadSheet();
  }, [props.id]);

  useEffect(() => {
    setEditValue(data.name);
  }, [data]);

  useEffect(() => {
    if (editionMode) {
      inputRef.current?.focus();
    }
  }, [editionMode]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateSpreadSheetById(props.id, e.currentTarget.value).then(
        (response) => {
          if (response.success) {
            setData((prev) => ({ ...prev, name: response.spreadsheet.name }));
          }
          setEditionMode(false);
        }
      );
    } else if (e.key === "Escape") {
      setEditValue(data.name);
      setEditionMode(false);
    }
  };

  return (
    <div className="bg-gray-200 flex spreadsheet-header">
      <div className="flex flex-col">
        <Link
          href="/spreadsheets/"
          className="btn btn-sm py-7 px-3"
          title="List all spreadsheets"
        >
          <Image
            src="/spreadsheet_icon_3.png"
            width={36}
            height={36}
            alt="SpreadSheeet Icon"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-start ml-2">
        {editionMode ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            className="text-xl w-120 border border-gray-400 bg-white  px-2 py-2"
            onBlur={() => {
              setEditValue(data.name);
              setEditionMode(false);
            }}
            onKeyDown={handleKeyDown}
            onChange={(e) => setEditValue(e.target.value)}
          />
        ) : (
          <h1
            className="text-xl w-120 border border-gray-200 hover:border-gray-400 px-2 py-2"
            onClick={() => setEditionMode(true)}
          >
            {data.name}
          </h1>
        )}
      </div>
    </div>
  );
}
