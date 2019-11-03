import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import { InputField, LabeledComponent } from "../common";
import { useInputField } from "../../hooks";
import moment from "moment";
import { getPayDate, IPayDate, calculateDaysLeft } from "../../utils";
import PayDate from "./PayDate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withTranslation, useTranslation } from "react-i18next";
import { getLocale } from "../../locales";
import { LocaleContext } from "../../context";

const PayCalculator = () => {
  const { t } = useTranslation();
  const { context } = useContext(LocaleContext);
  const [todaysDate, setTodaysDate] = useState(moment().format());
  const calendarPayDate: IPayDate = getPayDate(todaysDate, context.locale);
  const [payDate, setPayDate] = useState(calendarPayDate.payDate);
  const [payPerDay, setPayPerDay] = useState("");
  const inputBalance = useInputField("");

  const inputTodayHandlers = (date: any) => {
    setTodaysDate(date);
  };

  useEffect(() => {
    const calendar = getPayDate(todaysDate, context.locale);
    setPayDate(calendar.payDate);
  }, [todaysDate, context.locale]);

  useEffect(() => {
    if (inputBalance.value && calendarPayDate.daysLeft) {
      const result = calculateDaysLeft(
        parseInt(inputBalance.value),
        calendarPayDate.daysLeft
      );
      setPayPerDay(result);
    }
    if (!inputBalance.value) {
      setPayPerDay("");
    }
  }, [inputBalance.value, calendarPayDate.daysLeft]);
  return (
    <>
      <div className="calculatorContainer">
        <LabeledComponent label={t("CURRENT_BALANCE")}>
          <InputField
            type="number"
            step={1000}
            inputClassname="currentBalance"
            autoFocus={true}
            value={inputBalance.value}
            onChange={inputBalance.onChange}
          />
        </LabeledComponent>
        <LabeledComponent label={t("TODAYS_DATE")}>
          <DatePicker
            className="todaysDate"
            withPortal={true}
            selected={moment(todaysDate).toDate()}
            dateFormat={getLocale(context.locale).rdpFormat}
            onChange={inputTodayHandlers}
            locale={getLocale(context.locale).dateFns}
            shouldCloseOnSelect={false}
          />
        </LabeledComponent>
      </div>
      <PayDate
        payDate={payDate}
        payPerDay={payPerDay}
        daysLeft={calendarPayDate.daysLeft}
      />
    </>
  );
};

export default withTranslation()(PayCalculator);
