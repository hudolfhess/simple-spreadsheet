import { SpreadSheetContentEntity } from "./spreadsheet_content";

export interface SpreadSheetEntity {
  id: string;
  name: string;
  content?: SpreadSheetContentEntity;
}
