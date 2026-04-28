import React from 'react';

function ScentNotes({ rows = [] }) {
  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row.layer}>
          <span className="text-xs font-body text-on-surface w-12 inline-block">{row.layer}</span>
          {row.values.map((value) => (
            <span key={value} className="bg-secondary-container text-on-secondary-container text-[11px] font-label uppercase tracking-widest px-3 py-1.5 ml-2 inline-block rounded-full">{value}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ScentNotes;
