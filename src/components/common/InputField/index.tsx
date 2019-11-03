import React, { InputHTMLAttributes } from "react";

interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  inputLabel?: string;
  inputClassname?: string;
  type: string;
}

const InputField = ({
  inputLabel,
  inputClassname,
  type = "text",
  defaultValue,
  onChange,
  value,
  autoFocus,
  step,
  disabled
}: IInputFieldProps) => {
  return (
    <input
      className={inputClassname}
      autoFocus={autoFocus}
      step={step}
      value={value || defaultValue}
      disabled={disabled}
      onChange={onChange}
      type={type}
      id={inputLabel}
    />
  );
};

export default InputField;
