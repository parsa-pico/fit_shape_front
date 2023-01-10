import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterAthlete from "./Components/RegisterAthlete";
import LoginAthlete from "./Components/LoginAthlete";
import DashBoard from "./Components/DashBoard";
import PaymentVerification from "./Components/PaymentVerification";
import DashBoardRouter from "./Components/DashBoard";
import RegisterStaff from "./Components/RegisterStaff";
import LoginStaff from "./Components/LoginStaff";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={"/login/athlete"} />} />
        <Route path="/register/athlete" element={<RegisterAthlete />} />
        <Route path="/register/staff" element={<RegisterStaff />} />
        <Route path="/login/athlete" element={<LoginAthlete />} />
        <Route path="/login/staff" element={<LoginStaff />} />
        <Route path="/dashboard/*" element={<DashBoardRouter />}></Route>
        <Route
          path="/callback/verify_payment"
          element={<PaymentVerification />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
