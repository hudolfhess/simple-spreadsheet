"use client";

import "react";
import Image from "next/image";
import { useState } from "react";
import { deleteSpreadSheetById } from "@/http_clients/SpreadSheetsClient";
import Link from "next/link";
import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";
import SpreadSheetCard from "../SpreadSheetCard";

export default function GridView({
  spreadsheets,
  onDelete,
}: {
  spreadsheets: SpreadSheetEntity[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex grid mb-8 md:mb-12 md:grid-cols-5 bg-white justify-between gap-5">
      {spreadsheets.map((spreadsheet) => (
        <SpreadSheetCard
          key={spreadsheet.id}
          id={spreadsheet.id}
          name={spreadsheet.name}
          lastUpdate={spreadsheet.updatedAt}
          onDelete={() => onDelete(spreadsheet.id)}
        />
      ))}
    </div>
  );
}
