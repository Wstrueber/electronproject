import React, { ReactNode } from "react";

interface ILabeledComponent {
  label: string;
  children: ReactNode;
}
const LabeledComponent = ({ label, children }: ILabeledComponent) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="labeledComponent"
    >
      <label style={{ alignSelf: "center" }}>{label}</label>
      {children}
    </div>
  );
};

export default LabeledComponent;
