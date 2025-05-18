"use client";

import SpreadSheet from "@/components/SpreadSheet";
import { useParams } from "next/navigation";

export default function SpreadSheetEditor() {
  const params = useParams<{ id: string }>();
  return <SpreadSheet id={params.id} columns={10} rows={20} />;
}
