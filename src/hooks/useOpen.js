import { useState, useCallback } from 'react';

const useOpen = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback(() => {
    setValue(!value);
  }, [value]);
  return [value, handler, setValue];
};

export default useOpen;
