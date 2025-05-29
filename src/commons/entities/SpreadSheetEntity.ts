import { SpreadSheetContentEntity } from "./SpreadSheetContentEntity";

export interface SpreadSheetEntity {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  content_id?: string;
  content?: SpreadSheetContentEntity;
}
