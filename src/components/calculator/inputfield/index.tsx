import React from "react";
import { useInputField } from "../../../hooks";

interface IInputFieldProps {
  inputLabel?: string;
  type: string;
  defaultValue?: string;
}

const InputField = ({
  inputLabel,
  type = "text",
  defaultValue
}: IInputFieldProps) => {
  const { value, reset, onChange } = useInputField("");
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <label style={{ alignSelf: "center" }} htmlFor={inputLabel}>
        {inputLabel}
      </label>
      <input
        value={value || defaultValue}
        onChange={onChange}
        style={{ textAlign: "center" }}
        type={type}
        id={inputLabel}
      />
    </div>
  );
};

export default InputField;
