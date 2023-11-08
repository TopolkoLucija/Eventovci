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
  // podatci koji trebaju MyToast.js
  const [show, setShow] = useState(false); // zelis li da se pokaze zeleni prozor
  const [toastMessage, setToastMessage] = useState(""); // poruka koju zelis da se ispise
  const [toastType, setToastType] = useState("success"); // success = zeleni prozor u ovom slucaju ne koristimo crveni

  const getType = (e, message, type) => {
    // podatke iz LoginM.js upisi u varijable koje su u App.js, njih ce MyTast kasnije koristiti za renderiranje zelenog prozorcica
    setShow(e);
    setToastMessage(message);
    setToastType(type);
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
