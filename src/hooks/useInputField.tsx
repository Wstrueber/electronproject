import { useState, ChangeEvent } from "react";

export type IUseInputField = {
  value: string;
  reset: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useInputField = (initialValue: string): IUseInputField => {
  const [value, setValue] = useState<string>(initialValue);

  return {
    value,
    reset: () => setValue(initialValue),
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }
  };
};

export default useInputField;
