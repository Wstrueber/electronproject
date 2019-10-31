import { getPayDate, IPayDate } from "../../utils";

describe("testing getPayDate", () => {
  test("gets accurate payDate", () => {
    const date = "2019-10-31";
    const expected: IPayDate = { payDate: "2019-11-25", daysLeft: 25 };
    expect(getPayDate(date)).toEqual(expected);
  });
});
