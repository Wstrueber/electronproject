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
  disabled
}: IInputFieldProps) => {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <label style={{ alignSelf: "center" }} htmlFor={inputLabel}>
        {inputLabel}
      </label>
      <input
        className={inputClassname}
        value={value || defaultValue}
        disabled={disabled}
        onChange={onChange}
        style={{ textAlign: "center" }}
        type={type}
        id={inputLabel}
      />
    </div>
  );
};

export default InputField;
