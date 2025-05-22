export class SpreadsheetNotFoundError extends Error {
  constructor(id: string) {
    super(`Spreadsheet with ID ${id} not found.`);
    this.name = "SpreadsheetNotFoundError";
  }
}
