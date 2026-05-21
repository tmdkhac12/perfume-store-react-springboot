function AdminStatCard({ title, value, trend, icon, borderClassName = 'border-l-primary' }) {
  return (
    <div
      className={`relative flex h-40 flex-col justify-between overflow-hidden rounded-xl border-l-4 bg-surface-container-lowest p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] ${borderClassName}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-on-surface-variant">
          {title}
        </p>
        <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
      </div>
      <div>
        <h4 className="font-headline text-4xl font-semibold text-on-surface">{value}</h4>
        {trend ? <p className="mt-1 text-xs text-on-surface-variant">{trend}</p> : null}
      </div>
    </div>
  );
}

export default AdminStatCard;
