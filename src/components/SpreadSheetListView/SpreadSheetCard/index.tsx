"use client";

import "react";
import Image from "next/image";
import { useState } from "react";
import { deleteSpreadSheetById } from "@/http_clients/SpreadSheetsClient";
import Link from "next/link";

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
          : `card card-xs bg-base-100 shadow-sm hover:bg-base-300 cursor-pointer`
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
                src="/spreadsheet_2.png"
                alt="SpreadSheet preview"
                width={928}
                height={548}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
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
