import React, { useState, useEffect } from "react";
import {
  getStartDate,
  getRewardPoints,
  getDateTime,
  getTransactionsAsync,
} from "../../utils/helpers";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const UserSummary = ({ monthSpan = 3, transData, endDate, userId }) => {
  const [transactions, setTransactions] = useState(null);
  const [transactionsData, setTransactionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const finalDate = endDate
    ? new Date(endDate).toISOString().substring(0, 10)
    : new Date().toISOString().substring(0, 10);
  const startDate = getStartDate(finalDate, monthSpan);
  useEffect(() => {
    setIsLoading(true);
    if (transData) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(transData);
        }, 1000);
      })
        .then((data) => {
          setTransactionsData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      getTransactionsAsync()
        .then((data) => {
          setTransactionsData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    setTransactions(filterTransactions(transactionsData));
  }, [transactionsData]);

  function filterTransactions(arr) {
    const startDateStr = startDate.toISOString().substring(0, 10);
    return arr
      .filter(
        (t) =>
          t.userId === userId && t.date >= startDateStr && t.date <= finalDate
      )
      .sort((a, b) => getDateTime(a.date) - getDateTime(b.date));
  }

  if (transactions === null || isLoading) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }
  let totalPoints = 0;
  let monthlyData = [];

  let currMonth = new Date(startDate);
  while (currMonth.toISOString().substring(0, 10) <= finalDate) {
    monthlyData.push({
      period: `${MONTH_NAMES[currMonth.getMonth()]} ${currMonth.getFullYear()}`,
      points: 0,
    });
    currMonth.setMonth(currMonth.getMonth() + 1);
  }

  if (transactions.length === 0) {
    return (
      <div className="container">
        <h2>{monthSpan} Month Profile</h2>
        <h2 data-testid={"no-summary"}>No points earned this period</h2>
        <h2 data-testid={"no-transactions"}>
          No transactions during this period
        </h2>
      </div>
    );
  }

  transactions?.forEach(({ date, amount }, index) => {
    const currentDate = new Date(date);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentPoints = getRewardPoints(amount);
    const periodStr = `${MONTH_NAMES[currentMonth]} ${currentYear}`;
    const periodIndex = monthlyData.findIndex(
      (data) => data.period === periodStr
    );
    monthlyData[periodIndex].points += currentPoints;
    totalPoints += currentPoints;
  });
  return (
    <div className="container">
      <h2>{monthSpan} Month Profile</h2>
      <div data-testid={"monthly-summary"}>
        <h2>Monthly Points Breakdown</h2>
      </div>
      <table>
        <thead>
          <tr>
            <td>Period</td>
            <td>Points Earned</td>
          </tr>
        </thead>
        <tbody>
          {monthlyData.map(({ period, points }, index) => {
            return (
              <tr key={index} data-testid={"summary-month"}>
                <td>{period}</td>
                <td>{points}</td>
              </tr>
            );
          })}
          <tr>
            <td>Total</td>
            <td>{totalPoints}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <h2 data-testid={"user-transactions"}>User Transaction History</h2>
      </div>
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>ID</td>
            <td>Date</td>
            <td>Amount ($)</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ id, amount, date }, index) => {
            return (
              <tr key={index} data-testid={"transaction-item"}>
                <td>{index + 1}</td>
                <td>{id}</td>
                <td>{date}</td>
                <td>{amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserSummary;
