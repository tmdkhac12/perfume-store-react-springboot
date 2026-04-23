import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { id, label, error, helperText, className = '', inputClassName = '', ...restProps },
  ref
) {
  return (
    <label htmlFor={id} className={['flex w-full flex-col gap-2 text-sm', className].join(' ')}>
      {label ? <span className="font-semibold text-luxury-text">{label}</span> : null}
      <input
        id={id}
        ref={ref}
        className={[
          'w-full rounded-md border border-luxury-border bg-white px-3 py-2 text-sm text-luxury-text',
          'outline-none transition placeholder:text-luxury-muted focus:border-luxury-text',
          error ? 'border-red-500' : '',
          inputClassName
        ].join(' ')}
        {...restProps}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
      {!error && helperText ? <span className="text-xs text-luxury-muted">{helperText}</span> : null}
    </label>
  );
});

export default Input;
