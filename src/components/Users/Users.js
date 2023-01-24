import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsersAsync } from "../../utils/helpers";

const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsersAsync().then((data) => setUsers(data));
  }, []);

  if (users === null) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
        <Link to={"/transactions"}>Transactions</Link>
      </div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.userId}>
              <Link to={`/users/${user.userId}`}>{user.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
