import { useState } from "react";
import { useCallback } from "react";
export default function useInput(validator, initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const isValid = validator(value);
  const hasError = !isValid && isTouched;
  const handleChange = useCallback((event) => {
    setValue(event.target.value);
    if (!isTouched) {
      setIsTouched(true);
    }
  }, []);
  const handleBlur = useCallback(() => {
    setIsTouched(true);
  }, []);
  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    isTouched,
    hasError,
    isValid,
    reset: () => setValue(initialValue),
  };
}
