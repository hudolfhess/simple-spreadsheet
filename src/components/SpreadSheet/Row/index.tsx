import React from "react";
import Cell from "../Cell";

function Row(props: { columns: number; row: number }) {
  const columns = [];

  columns.push(
    <td
      key={`row-identifier-${props.row}`}
      className="rowIdentifier bg-gray-200 text-black text-center text-xs"
    >
      {props.row + 1}
    </td>
  );

  for (let i = 0; i < props.columns; i++) {
    columns.push(
      <td key={`row-${props.row}-column-${i}`} className="hover:bg-gray-200">
        <Cell column={i} row={props.row} />
      </td>
    );
  }

  return <tr className="hover:bg-gray-100">{columns}</tr>;
}

export default React.memo(Row);
