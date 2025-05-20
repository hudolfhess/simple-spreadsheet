"use client";

import SpreadSheet from "@/components/SpreadSheet";
import { useParams } from "next/navigation";

export default function SpreadSheetEditor() {
  const params = useParams<{ id: string }>();
  return <SpreadSheet id={params.id} columns={26} rows={50} />;
}
