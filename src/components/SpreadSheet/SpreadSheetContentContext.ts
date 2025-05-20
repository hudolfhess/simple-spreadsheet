import { createContext, useContext } from "react";
import { SpreadSheetContentEntity } from "@/commons/entities/SpreadSheetContentEntity";

interface SpreadSheetContentContextType {
  data: SpreadSheetContentEntity;
  handleOnCellChange: (row: number, column: number, value: string) => void;
}

const SpreadSheetContentContext = createContext<
  SpreadSheetContentContextType | undefined
>(undefined);

export const useSpreadSheetContent = () => {
  const context = useContext(SpreadSheetContentContext);
  if (context === undefined) {
    throw new Error("useSpreadSheet must be used within a SpreadSheetProvider");
  }
  return context;
};

export default SpreadSheetContentContext;
