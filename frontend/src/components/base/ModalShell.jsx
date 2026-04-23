import Button from './Button.jsx';

function ModalShell({ isOpen, title, children, footer, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-xl border border-luxury-border bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="font-display text-xl text-luxury-text">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal">
            Close
          </Button>
        </div>
        <div className="text-sm text-luxury-subtle">{children}</div>
        {footer ? <div className="mt-5">{footer}</div> : null}
      </div>
    </div>
  );
}

export default ModalShell;
