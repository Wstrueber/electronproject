import React from "react";
import "./styles.scss";
import InputField from "./inputfield";
import moment from "moment";
import { getPayDate } from "../../utils";

const Calculator = () => {
  const todaysDate = moment().format("YYYY-MM-DD");
  getPayDate();
  return (
    <div className="calculator">
      <div className="calculatorContainer">
        <InputField type="number" inputLabel="Salary" />
        <InputField type="number" inputLabel="Current balance" />
        <InputField type="date" inputLabel="Pay date" />
        <InputField
          type="date"
          inputLabel="Today's date"
          defaultValue={todaysDate}
        />
      </div>
    </div>
  );
};

export default Calculator;
