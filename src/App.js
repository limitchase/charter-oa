import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from "./components/Transactions/Transactions";
import Users from "./components/Users/Users";
import User from "./components/User/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
