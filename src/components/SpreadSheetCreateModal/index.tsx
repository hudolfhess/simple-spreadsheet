"use client";

import { createSpreadSheet } from "@/http_clients/SpreadSheetsClient";
import "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "tailwindcss";
import FormModal from "../commons/FormModal";

export default function SpreadSheetCreateModal({
  handleOnClose,
}: {
  handleOnClose: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const handleOnCreate = async () => {
    const result = await createSpreadSheet(name);
    if (result.success === false) return alert(result.error);
    handleOnClose();
    router.push(`/spreadsheets/${result.spreadsheet.id}`);
  };

  return (
    <FormModal
      title="Create new SpreadSheet"
      handleOnClose={handleOnClose}
      handleOnCreate={handleOnCreate}
    >
      <label className="input w-120">
        Name:
        <input
          type="text"
          className="grow"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="badge badge-neutral badge-xs">Required</span>
      </label>
    </FormModal>
  );
}
