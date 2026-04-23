import Button from './Button.jsx';

function PaginationShell({ page = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" variant="secondary" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        Previous
      </Button>
      {pages.map((item) => (
        <Button
          key={item}
          size="sm"
          variant={item === page ? 'primary' : 'secondary'}
          onClick={() => onPageChange(item)}
        >
          {item}
        </Button>
      ))}
      <Button
        size="sm"
        variant="secondary"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </Button>
    </div>
  );
}

export default PaginationShell;
