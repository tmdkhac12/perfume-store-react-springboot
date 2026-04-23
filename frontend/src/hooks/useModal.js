import { useCallback, useState } from 'react';
import { useToggle } from './useToggle.js';

export function useModal(initialOpen = false) {
  const { value: isOpen, setOn, setOff, toggle } = useToggle(initialOpen);
  const [payload, setPayload] = useState(null);

  const open = useCallback(
    (nextPayload = null) => {
      setPayload(nextPayload);
      setOn();
    },
    [setOn]
  );

  const close = useCallback(() => {
    setPayload(null);
    setOff();
  }, [setOff]);

  return {
    isOpen,
    payload,
    open,
    close,
    toggle
  };
}
