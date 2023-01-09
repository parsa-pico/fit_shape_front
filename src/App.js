import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterAthlete from "./Components/RegisterAthlete";
import LoginAthlete from "./Components/LoginAthlete";
import DashBoard from "./Components/DashBoard";
import PaymentVerification from "./Components/PaymentVerification";
import DashBoardRouter from "./Components/DashBoard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register/athlete" element={<RegisterAthlete />} />
        <Route path="/login/athlete" element={<LoginAthlete />} />
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
