import moment from "moment";
const DEFAULT_PAY_DATE = 25;

export const getPayDate = () => {
  const todaysDate = moment().format("YYYY-MM-DD");
  let day = parseInt(moment(todaysDate).format("DD"));

  let daysLeft = 0;
  let payDate;
  if (day < DEFAULT_PAY_DATE) {
    const month = moment(todaysDate).set("date", 25);
    const dayName = month.format("dddd");

    daysLeft = calenderPayDay(DEFAULT_PAY_DATE, dayName) - day;

    return daysLeft;
  }
  // #TODO: fix condition as pay date could be on 24th or 26th
  if (day > DEFAULT_PAY_DATE) {
    let endOfMonth = moment(todaysDate)
      .endOf("months")
      .format("DD");

    daysLeft = parseInt(endOfMonth) - day;

    const nextMonth = moment(todaysDate)
      .add(1, "months")
      .set("date", 25);

    const dayName = nextMonth.format("dddd");
    day = parseInt(nextMonth.format("DD"));

    daysLeft = calenderPayDay(day, dayName) + daysLeft;

    return { payDate, daysLeft };
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
