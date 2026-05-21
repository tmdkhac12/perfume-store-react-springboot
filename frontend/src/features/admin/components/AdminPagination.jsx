function AdminPagination({ summary }) {
  return (
    <div className="mt-8 flex items-center justify-between text-sm text-on-surface-variant">
      <span>{summary}</span>
      <div className="flex gap-2">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant/30 opacity-50"
          disabled
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary"
          type="button"
        >
          1
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant/30 hover:bg-surface-container-low"
          type="button"
        >
          2
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant/30 hover:bg-surface-container-low"
          type="button"
        >
          3
        </button>
        <span className="flex h-8 w-8 items-center justify-center">...</span>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant/30 hover:bg-surface-container-low"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}

export default AdminPagination;
