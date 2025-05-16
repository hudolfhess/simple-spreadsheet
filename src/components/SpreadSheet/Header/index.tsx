const COLUMNS_NAMES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Header(props: { columns: number }) {
  const columns = [];

  columns.push(<td key="first-column" className="rowIdentifier"></td>);

  for (let i = 0; i < props.columns; i++) {
    columns.push(<td key={`column-${i}`}>{COLUMNS_NAMES[i]}</td>);
  }

  return (
    <thead>
      <tr>{columns}</tr>
    </thead>
  );
}
