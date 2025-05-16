import Row from "../Row";
import { SpreadSheetEntity } from "../entities/spreadsheet";

export default function Body(props: {
  rows: number;
  columns: number;
  data: SpreadSheetEntity;
  handleOnCellChange: (row: number, column: number, value: string) => void;
}) {
  const rows = [];

  for (let i = 0; i < props.rows; i++) {
    rows.push(
      <Row
        key={`row-${i}`}
        columns={props.columns}
        row={i}
        data={props.data[i]}
        handleOnCellChange={props.handleOnCellChange}
      />
    );
  }

  return <tbody>{rows}</tbody>;
}
