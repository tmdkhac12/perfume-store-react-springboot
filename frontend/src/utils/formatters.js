/**
 * @input: value (number|string), locale (string), currency (string) - Example: (1250.5, 'en-US', 'USD')
 * @output: formattedCurrency (string) - Example: "$1,251"
 */
export function formatCurrency(value, locale = 'en-US', currency = 'USD') {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(amount);
}
export function formatDate(value, locale = 'en-GB', options) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(locale, options ?? { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}
