import Cell from "../Cell";

export default function Row(props: { columns: number; row: number }) {
  const columns = [];

  columns.push(
    <td key={`row-identifier-${props.row}`} className="rowIdentifier">
      {props.row + 1}
    </td>
  );

  for (let i = 0; i < props.columns; i++) {
    columns.push(
      <td key={`row-${props.row}-column-${i}`}>
        <Cell column={i} row={props.row} />
      </td>
    );
  }

  return <tr>{columns}</tr>;
}
