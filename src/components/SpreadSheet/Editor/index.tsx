"use client";

import { useState, useEffect } from "react";
import {
  getSpreadSheetById,
  updateSpreadSheetById,
} from "@/http_clients/spreadsheets";
import Link from "next/link";
import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";

export default function Editor(props: { id: string }) {
  const [data, setData] = useState<SpreadSheetEntity>({
    id: props.id,
    name: "",
    updatedAt: "",
    createdAt: "",
  });
  const [editionMode, setEditionMode] = useState(false);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    getSpreadSheetById(props.id).then((result) => {
      if (result.success === true) setData(result.spreadsheet);
    });
  }, [props.id]);

  useEffect(() => {
    setEditValue(data.name);
  }, [data]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateSpreadSheetById(props.id, e.currentTarget.value).then((value) =>
        setData((prev) => ({ ...prev, name: value.name }))
      );
      setEditionMode(false);
    } else if (e.key === "Escape") {
      setEditValue(data.name);
      setEditionMode(false);
    }
  };

  return (
    <div className="spreadsheet-header">
      <Link href="/spreadsheets/">Voltar</Link>
      <h1>Spreadsheet</h1>
      {editionMode ? (
        <input
          type="text"
          value={editValue}
          onBlur={() => {
            setEditValue(data.name);
            setEditionMode(false);
          }}
          onKeyDown={handleKeyDown}
          onChange={(e) => setEditValue(e.target.value)}
        />
      ) : (
        <button onClick={() => setEditionMode(true)}>{data.name}</button>
      )}
    </div>
  );
}
