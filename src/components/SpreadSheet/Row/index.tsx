import Cell from "../Cell";

export default function Row(props: {
  data: object;
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
      value = props.data[i]["value"];
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
