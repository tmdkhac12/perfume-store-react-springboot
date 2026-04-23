import { useCallback, useState } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(Boolean(initialValue));

  const toggle = useCallback(() => {
    setValue((previous) => !previous);
  }, []);

  const setOn = useCallback(() => {
    setValue(true);
  }, []);

  const setOff = useCallback(() => {
    setValue(false);
  }, []);

  return {
    value,
    toggle,
    setOn,
    setOff
  };
}
