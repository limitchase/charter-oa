import { getRewardPoints, getStartDate } from "../helpers";

describe("helper functions", () => {
  test("checking that points are calculated correctly", () => {
    expect(getRewardPoints(120)).toBe(90);
    expect(getRewardPoints(100)).toBe(50);
    expect(getRewardPoints(50)).toBe(0);
    expect(getRewardPoints(51)).toBe(1);
    expect(getRewardPoints(200)).toBe(250);
    expect(getRewardPoints(1000)).toBe(1850);
    expect(getRewardPoints(0)).toBe(0);
    expect(getRewardPoints(39)).toBe(0);
    expect(getRewardPoints(75)).toBe(25);
  });

  test("checking that initial start month is correct", () => {
    expect(getStartDate("2022-12-13").toISOString().substring(0, 10)).toBe(
      "2022-10-01"
    );
    expect(getStartDate("2022-12-02").toISOString().substring(0, 10)).toBe(
      "2022-10-01"
    );
    expect(getStartDate("2023-01-23").toISOString().substring(0, 10)).toBe(
      "2022-11-01"
    );
    expect(getStartDate("2023-01-23", 6).toISOString().substring(0, 10)).toBe(
      "2022-08-01"
    );
  });
});
