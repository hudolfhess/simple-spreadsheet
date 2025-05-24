import React from "react";

const COLUMNS_NAMES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function Header(props: { columns: number }) {
  const columns = [];

  columns.push(
    <td key="first-column" className="rowIdentifier bg-gray-300"></td>
  );

  for (let i = 0; i < props.columns; i++) {
    columns.push(
      <td key={`column-${i}`} className=" bg-gray-200 text-black">
        {COLUMNS_NAMES[i]}
      </td>
    );
  }

  return (
    <thead>
      <tr>{columns}</tr>
    </thead>
  );
}

export default React.memo(Header);
