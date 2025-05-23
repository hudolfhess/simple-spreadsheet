"use client";

import "react";
import { SpreadSheetEntity } from "@/commons/entities/SpreadSheetEntity";
import DeleteSVG from "@/components/commons/Icons/DeleteSVG";
import SpreadSheetSVG from "@/components/commons/Icons/SpreadSheetSVG";

export default function GridView({
  spreadsheets,
  onDelete,
}: {
  spreadsheets: SpreadSheetEntity[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex grid mb-8 md:mb-12 md:grid-cols-1 bg-white justify-between gap-5">
      <ul className="list bg-base-100 rounded-box shadow-md">
        {spreadsheets.map((spreadsheet) => (
          <li key={spreadsheet.id} className="list-row">
            <div>
              <SpreadSheetSVG />
            </div>
            <div>
              <div>{spreadsheet.name}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                Last update: {spreadsheet.updatedAt}
              </div>
            </div>
            <button className="btn btn-square btn-ghost">
              <DeleteSVG />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
