"use client";

import "react";
import Image from "next/image";
import { useState } from "react";
import { deleteSpreadSheetById } from "@/http_clients/SpreadSheetsClient";
import Link from "next/link";
import DeleteSVG from "@/components/commons/Icons/DeleteSVG";
import { Sheet } from "lucide-react";

export default function SpreadSheetCard({
  id,
  name,
  lastUpdate,
  onDelete,
}: {
  id: string;
  name: string;
  lastUpdate: string;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleOnDelete = async () => {
    const result = await deleteSpreadSheetById(id);
    if (result.success === true) onDelete();
  };

  return (
    <div
      className={
        confirmDelete
          ? `card card-md bg-neutral text-neutral-content`
          : `card card-xs bg-base-100 shadow-sm hover:bg-gray-100 hover:shadow-xl/30 cursor-pointer`
      }
    >
      {confirmDelete ? (
        <div className="card-body items-center text-center">
          <h2 className="card-title truncate w-full">{name}</h2>
          <p>Are you sure you want to delete this spreadsheet?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-error" onClick={handleOnDelete}>
              Confirm
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <Link href={`/spreadsheets/${id}`} className="rounded-sm">
            <figure>
              <Image
                src="/spreadsheet_icon_3.png"
                width={128}
                height={128}
                alt="SpreadSheeet Icon"
              />
            </figure>
            <div className="card-body">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-5">
                  <h2 className="card-title truncate">{name}</h2>
                  <p className="truncate">Last update: {lastUpdate}</p>
                </div>
                <div className="card-actions justify-end self-end">
                  <button
                    className="btn btn-square btn-xs hover:btn-error"
                    onClick={(e) => {
                      e.preventDefault();
                      setConfirmDelete(true);
                    }}
                  >
                    <DeleteSVG />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}
