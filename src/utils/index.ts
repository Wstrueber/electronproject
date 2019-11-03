import moment from "moment";
const DEFAULT_PAY_DATE = 25;

export interface IPayDate {
  payDate: string;
  daysLeft: number;
}

export const getPayDate = (todaysDate: string, locale: string): IPayDate => {
  let day = parseInt(moment(todaysDate).format("DD"));
  const month = moment(todaysDate).set("date", 25);
  let dayName = month.format("dddd");

  let payDate = calenderPayDay(DEFAULT_PAY_DATE, dayName);
  let daysLeft = 0;

  if (day < payDate) {
    daysLeft = payDate - day;
    return {
      payDate: moment(todaysDate)
        .set("date", payDate)
        .locale(locale)
        .format("dddd, MMMM D YYYY"),
      daysLeft
    };
  }

  if (day > payDate) {
    let endOfMonth = moment(todaysDate)
      .endOf("months")
      .format("DD");

    daysLeft = parseInt(endOfMonth) - day;

    const nextMonth = moment(todaysDate)
      .add(1, "months")
      .set("date", DEFAULT_PAY_DATE);

    dayName = nextMonth.format("dddd");
    day = parseInt(nextMonth.format("DD"));

    payDate = calenderPayDay(day, dayName);
    daysLeft = payDate + daysLeft;

    return {
      payDate: nextMonth.locale(locale).format("dddd, MMMM D YYYY"),
      daysLeft
    };
  }

  return {
    payDate: moment(todaysDate)
      .locale(locale)
      .format("dddd, MMMM D YYYY"),
    daysLeft
  };
};

const calenderPayDay = (day: number, dayName: string): number => {
  if (dayName === "Saturday") {
    return day - 1;
  }
  if (dayName === "Sunday") {
    return day - 2;
  }
  return day;
};

const toFixed = (num: number): string => {
  const strArray = [...num.toString()];
  const ind = strArray.indexOf(".");
  if (ind !== -1) {
    const target = strArray.slice(0, ind + 3);
    if (!target[ind + 2]) {
      target.push("0");
    }
    return target.join("");
  }
  return strArray.join("");
};

export const calculateDaysLeft = (
  balance: number,
  daysLeft: number
): string => {
  const result = balance / daysLeft;

  return toFixed(result);
};

export const convertTemp = (temp: string, type: string): string => {
  switch (type) {
    case "F":
      return `${toFixed(((parseInt(temp) - 32) * 5) / 9)}°C`;
    case "C":
      return `${toFixed((parseInt(temp) * 9) / 5 + 32)}°F`;
    default:
      return "";
  }
};
