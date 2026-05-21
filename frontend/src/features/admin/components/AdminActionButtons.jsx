function AdminActionButtons({ showPrint = false, showView = false }) {
  return (
    <div className="flex items-center justify-end gap-2 text-on-surface-variant">
      <button
        className="rounded-lg p-2 transition-colors hover:bg-surface-container-high hover:text-primary"
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">edit</span>
      </button>
      {showView ? (
        <button
          className="rounded-lg p-2 transition-colors hover:bg-surface-container-high hover:text-primary"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">visibility</span>
        </button>
      ) : null}
      {showPrint ? (
        <button
          className="rounded-lg p-2 transition-colors hover:bg-surface-container-high hover:text-primary"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">print</span>
        </button>
      ) : null}
      <button
        className="rounded-lg p-2 transition-colors hover:bg-error-container/50 hover:text-error"
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">delete</span>
      </button>
    </div>
  );
}

export default AdminActionButtons;
