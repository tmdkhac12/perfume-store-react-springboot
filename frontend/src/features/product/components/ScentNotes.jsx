import React from 'react';

/**
 * @description: Renders perfume note chips by scent layer to mirror the product detail layout.
 * @input: rows (array) - Example: [{ layer: "Top", values: ["Bergamot"] }]
 * @output: element (JSX.Element) - Example: <div />
 */
function ScentNotes({ rows = [] }) {
  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row.layer}>
          <span className="text-xs font-body text-on-surface w-12 inline-block">{row.layer}</span>
          {(Array.isArray(row.values) ? row.values : []).map((value) => (
            <span key={value} className="bg-secondary-container text-on-secondary-container text-[11px] font-label uppercase tracking-widest px-3 py-1.5 ml-2 inline-block rounded-full">{value}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ScentNotes;
