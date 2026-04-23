function Badge({ tone = 'neutral', children, className = '' }) {
  const toneClasses = {
    neutral: 'bg-white text-luxury-text border-luxury-border',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200'
  };

  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
        toneClasses[tone] ?? toneClasses.neutral,
        className
      ].join(' ')}
    >
      {children}
    </span>
  );
}

export default Badge;
