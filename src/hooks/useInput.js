import { useState, useCallback } from 'react';

const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    if(e.target.value.length === 1 && e.target.value === " "){
      return;
    }
    if(e.target.value.length > 200) return;
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
