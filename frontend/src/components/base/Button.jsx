function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  children,
  ...restProps
}) {
  const variantClasses = {
    primary: 'border-luxury-text bg-luxury-text text-white hover:opacity-90',
    secondary: 'border-luxury-border bg-white text-luxury-text hover:border-luxury-text',
    ghost: 'border-transparent bg-transparent text-luxury-text hover:bg-white'
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-sm'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-md border font-semibold transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'focus-visible:ring-luxury-text disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant] ?? variantClasses.primary,
        sizeClasses[size] ?? sizeClasses.md,
        className
      ].join(' ')}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Button;
