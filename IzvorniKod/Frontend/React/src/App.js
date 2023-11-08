import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/scripts/Sidebar";
import Home from "./components/scripts/Home";
import AboutUs from "./components/scripts/AboutUs";
import MyAccount from "./components/scripts/MyAccount";
import LoginM from "./components/scripts/LoginM";
import Events from "./components/scripts/Events";
import Calendar from "./components/scripts/Calendar";
import Logout from "./components/scripts/Logout";
import "./components/styles/App.css";
import MyToast from "./components/scripts/MyToast";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const getType = (e, message, type) => {
    setShow(e);
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setShow(false);
      console.log("hidden");
    }, 5000);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-calendar" element={<Calendar />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<LoginM getType={getType} />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
      {show && <MyToast show={show} message={toastMessage} type={toastType} />}
    </Router>
  );
}

export default App;
