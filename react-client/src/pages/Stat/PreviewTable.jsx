export function PreviewTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            {headers.map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              {headers.map(h => <td key={h}>{row[h]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
