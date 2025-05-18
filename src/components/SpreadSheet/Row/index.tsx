import Cell from "../Cell";
import { CellEntity } from "../../../commons/entities/cell";

export default function Row(props: {
  data: { [column: number]: CellEntity };
  columns: number;
  row: number;
  handleOnCellChange: (row: number, column: number, value: string) => void;
}) {
  const columns = [];

  columns.push(
    <td key={`row-identifier-${props.row}`} className="rowIdentifier">
      {props.row + 1}
    </td>
  );

  for (let i = 0; i < props.columns; i++) {
    let value = "";
    let formula = "";
    if (props.data !== undefined && props.data[i]) {
      value = props.data[i]["value"].toString();
      formula = props.data[i]["formula"];
    }

    columns.push(
      <td key={`row-${props.row}-column-${i}`}>
        <Cell
          column={i}
          row={props.row}
          value={value}
          formula={formula}
          handleOnCellChange={props.handleOnCellChange}
        />
      </td>
    );
  }

  return <tr>{columns}</tr>;
}
