import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterAthlete from "./Components/RegisterAthlete";
import LoginAthlete from "./Components/LoginAthlete";
import PaymentVerification from "./Components/PaymentVerification";
import DashBoardRouter from "./Components/DashBoard";
import RegisterStaff from "./Components/RegisterStaff";
import LoginStaff from "./Components/LoginStaff";
import AthleteVerification from "./Components/AthleteVerification";
import AthleteAfterRegister from "./Components/AthleteAfterRegister";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={"/login/athlete"} />} />
        <Route path="/register/athlete" element={<RegisterAthlete />} />
        <Route
          path="/register/athlete/verify/:athlete_id"
          element={<AthleteAfterRegister />}
        />
        <Route path="/register/staff" element={<RegisterStaff />} />
        <Route path="/login/athlete" element={<LoginAthlete />} />
        <Route path="/login/staff" element={<LoginStaff />} />
        <Route path="/dashboard/*" element={<DashBoardRouter />}></Route>
        <Route
          path="/callback/verify_payment"
          element={<PaymentVerification />}
        />
        <Route
          path="/callback/verify_athlete"
          element={<AthleteVerification />}
        />
      </Routes>
    </div>
  );
}

export default App;
