import React, { useEffect, useState } from "react";
import "./styles.scss";
import { InputField } from "../common";
import { useInputField } from "../../hooks";
import moment from "moment";
import { getPayDate, IPayDate } from "../../utils";
import PayDate from "./PayDate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Calculator = () => {
  const [todaysDate, setTodaysDate] = useState(moment().format("YYYY-MM-DD"));
  const calendarPayDate: IPayDate = getPayDate(todaysDate);
  const [payDate, setPayDate] = useState(calendarPayDate.payDate);
  const inputTodayHandlers = (date: any) => {
    setTodaysDate(date);
  };

  useEffect(() => {
    const calendar = getPayDate(todaysDate);
    setPayDate(calendar.payDate);
  }, [todaysDate]);

  return (
    <div className="calculator">
      <div className="calculatorContainer">
        <InputField type="number" inputLabel="Salary" />
        <InputField type="number" inputLabel="Current balance" />
        <DatePicker
          selected={new Date(todaysDate)}
          onChange={inputTodayHandlers}
        />
      </div>
      <PayDate payDate={payDate} daysLeft={calendarPayDate.daysLeft} />
    </div>
  );
};

export default Calculator;
