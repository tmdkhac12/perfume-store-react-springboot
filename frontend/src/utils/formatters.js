export function formatCurrency(value, locale = 'vi-VN', currency = 'VND') {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(value, locale = 'en-GB', options) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(locale, options ?? { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}
