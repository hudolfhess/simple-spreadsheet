import Row from "../Row";

export default function Body(props: { rows: number; columns: number }) {
  const rows = [];

  for (let i = 0; i < props.rows; i++) {
    rows.push(<Row key={`row-${i}`} columns={props.columns} row={i} />);
  }

  return <tbody>{rows}</tbody>;
}
