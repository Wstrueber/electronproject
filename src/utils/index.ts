import moment from "moment";
const DEFAULT_PAY_DATE = 25;

export interface IPayDate {
  payDate: string;
  daysLeft: number;
}

export const getPayDate = (todaysDate: string): IPayDate => {
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
        .format("YYYY-MM-DD"),
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

    return { payDate: nextMonth.format("YYYY-MM-DD"), daysLeft };
  }

  return { payDate: todaysDate, daysLeft };
};

const calenderPayDay = (day: number, dayName: string): number => {
  if (dayName === "Saturday") {
    return day - 1;
  }
  if (dayName === "Sunday") {
    return day + 1;
  }
  return day;
};
