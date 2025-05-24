import React from "react";
import Row from "../Row";

function Body(props: { rows: number; columns: number }) {
  const rows = [];

  for (let i = 0; i < props.rows; i++) {
    rows.push(<Row key={`row-${i}`} columns={props.columns} row={i} />);
  }

  return <tbody>{rows}</tbody>;
}

export default React.memo(Body);
