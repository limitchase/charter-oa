import { useParams, Link } from "react-router-dom";
import React from "react";

import UserSummary from "../UserSummary/UserSummary";

const User = () => {
  const userId = +useParams().userId;
  return (
    <div className="container">
      <div>
        <Link to={"/users"}>Users</Link>
        <br />
        <Link to={"/transactions"}>Transactions</Link>
      </div>
      <UserSummary userId={userId} />
    </div>
  );
};
export default User;
