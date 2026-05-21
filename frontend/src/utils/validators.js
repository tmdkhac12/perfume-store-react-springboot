export function isRequired(value) {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  return true;
}

export function hasMinLength(value, minLength) {
  return String(value ?? '').trim().length >= minLength;
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '').trim());
}

export function isStrongPassword(value) {
  const stringValue = String(value ?? '');

  return (
    /[A-Z]/.test(stringValue) &&
    /[a-z]/.test(stringValue) &&
    /\d/.test(stringValue) &&
    stringValue.length >= 8
  );
}
