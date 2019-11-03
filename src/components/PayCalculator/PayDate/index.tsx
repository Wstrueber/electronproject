import React from "react";
import "./styles.scss";
import {
  useTranslation,
  withTranslation,
  WithTranslation
} from "react-i18next";

interface IPayDateProps extends WithTranslation {
  payDate: string;
  daysLeft: number;
  payPerDay: string;
}
const PayDate = ({ payDate, daysLeft, payPerDay }: IPayDateProps) => {
  const { t } = useTranslation();
  return (
    <div className="payDateWrapper">
      <div className="payDateContainer">
        <div className="payDateHeader">{t("PAY_DATE")}</div>
        <div className="payDateDate">{payDate}</div>
        <div className="payDateDaysLeft">
          {daysLeft !== 0
            ? `${daysLeft} ${t("DAYS_LEFT")}`
            : t("TODAY_IS_PAY_DAY")}
        </div>
        {payPerDay && (
          <div className="payDatePayPerDay">
            {t("YOU_CAN_SPEND")} <span>{payPerDay}</span> {t("PER_DAY")}
          </div>
        )}
      </div>
    </div>
  );
};

export default withTranslation()(PayDate);
