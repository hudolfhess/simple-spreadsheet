export function getAllSpreadSheets(): Promise<any> {
  return fetch("/api/spreadsheets").then((res) => res.json());
}

export function getSpreadSheetById(id: string): Promise<any> {
  return fetch(`/api/spreadsheets/${id}`).then((res) => res.json());
}
