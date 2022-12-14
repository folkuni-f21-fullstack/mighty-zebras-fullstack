import "./App.scss";
import { Routes, HashRouter, Route } from "react-router-dom";
import LandingView from "./Routes/LandingView";
import LoginView from "./Routes/LoginView";
import Error from "./Routes/Error";
import AdminOrder from "./Routes/Admin/AdminOrder";
import AdminPage from "./Routes/Admin/AdminPage";
import Account from "./Routes/User/Account";
import CheckOut from "./Routes/User/CheckOut";
import Menu from "./Routes/User/Menu";
import OrderConfirm from "./Routes/User/OrderConfirm";
import SignUp from "./Routes/User/SignUp";
import Search from "./Routes/User/Search";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/login" element={<LoginView />} />
          {/* Admin */}
          <Route path="/AdminOrder/:id" element={<AdminOrder />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          {/* USER */}
          <Route path="/Account" element={<Account />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/OrderConfirm" element={<OrderConfirm />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
