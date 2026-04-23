function TableShell({ columns = [], rows = [], caption, emptyMessage = 'No records available.' }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-luxury-border bg-white">
      <table className="min-w-full border-collapse text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-luxury-border bg-luxury-background/70">
            {columns.map((column) => (
              <th
                key={column.key}
                className={[
                  'px-4 py-3 text-left font-semibold text-luxury-text',
                  column.align === 'right' ? 'text-right' : '',
                  column.align === 'center' ? 'text-center' : ''
                ].join(' ')}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length || 1} className="px-4 py-6 text-center text-luxury-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={row.id ?? rowIndex} className="border-b border-luxury-border/70 last:border-b-0">
                {columns.map((column) => (
                  <td
                    key={`${row.id ?? rowIndex}-${column.key}`}
                    className={[
                      'px-4 py-3 text-luxury-subtle',
                      column.align === 'right' ? 'text-right' : '',
                      column.align === 'center' ? 'text-center' : ''
                    ].join(' ')}
                  >
                    {row[column.key] ?? '-'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableShell;
