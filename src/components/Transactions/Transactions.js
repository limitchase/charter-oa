import React, { useEffect, useState } from "react";
import { getUserByUserId, getTransactionsAsync } from "../../utils/helpers";
import { Link } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState(null);
  useEffect(() => {
    getTransactionsAsync().then((data) => setTransactions(data));
  }, []);

  if (transactions === null) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
        <Link to={"/users"}>Users</Link>
      </div>
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>ID</td>
            <td>Date</td>
            <td>Name</td>
            <td>Amount ($)</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ id, userId, amount, date }, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{id}</td>
                <td>{date}</td>
                <td className="td-left">{getUserByUserId(userId).name}</td>
                <td>{amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
