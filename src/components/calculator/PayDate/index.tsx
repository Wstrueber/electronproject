import React from "react";
import "./styles.scss";
import moment from "moment";

interface IPayDateProps {
  payDate: string;
  daysLeft: number;
}
const PayDate = ({ payDate, daysLeft }: IPayDateProps) => {
  return (
    <div className="payDateWrapper">
      <div className="payDateContainer">
        <div className="payDateHeader">PAY DATE:</div>
        <span className="payDateDate">
          {moment(payDate).format("dddd, MMMM Do YYYY ")}
        </span>
        <div className="payDateDaysLeft">
          {daysLeft !== 0
            ? daysLeft + " days until pay day!"
            : "Pay day is today!"}
        </div>
      </div>
    </div>
  );
};

export default PayDate;
