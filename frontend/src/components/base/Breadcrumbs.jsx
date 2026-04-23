import { Link } from 'react-router-dom';

function Breadcrumbs({ items = [] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-luxury-muted">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.to && !isLast ? (
              <Link to={item.to} className="transition hover:text-luxury-text">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-semibold text-luxury-text' : ''}>{item.label}</span>
            )}
            {!isLast ? <span aria-hidden="true">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
