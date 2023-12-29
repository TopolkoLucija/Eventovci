import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/scripts/Sidebar";
import Home from "./components/scripts/Home";
import AboutUs from "./components/scripts/AboutUs";
import MyAccount from "./components/scripts/MyAccount";
import LoginM from "./components/scripts/LoginM";
import Events from "./components/scripts/Events";
import Logout from "./components/scripts/Logout";
import AddEvent from "./components/scripts/AddEvent";
import ShowAll from "./components/scripts/ShowAll";
import "./components/styles/App.css";
import MyToast from "./components/scripts/MyToast";
import { useState } from "react";
import Inbox from "./components/scripts/Inbox";
import Interested from "./components/scripts/Interested";
import MyEvents from "./components/scripts/MyEvents";
import OrganizerPage from "./components/scripts/OrganizerPage";
import ShowEvent from "./components/scripts/ShowEvent";

function App() {
  const accessToken = sessionStorage.getItem('accessToken');
  // podatci koji trebaju MyToast.js
  const [show, setShow] = useState(false); // zelis li da se pokaze zeleni prozor
  const [toastMessage, setToastMessage] = useState(""); // poruka koju zelis da se ispise
  const [toastType, setToastType] = useState("success"); // success = zeleni prozor u ovom slucaju ne koristimo crveni

  const getType = (e, message, type) => {
    // podatke iz LoginM.js upisi u varijable koje su u App.js, njih ce MyTast kasnije koristiti za renderiranje zelenog prozorcica
    setShow(e);
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
      <Router>
        <div className="app-container">
        <Sidebar className={accessToken ? 'logged-in' : ''} />

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<LoginM getType={getType} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/my-account/add-events" element={<AddEvent />} />
            <Route path="/my-account/show-all" element={<ShowAll />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/interested" element={<Interested />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/add-event" element={<AddEvent getType={getType}/>} />
            <Route path={`/:id`} element={<OrganizerPage />} />
            <Route path="/event/:id" element={<ShowEvent />} />
          </Routes>
        </div>
        {show && <MyToast show={show} message={toastMessage} type={toastType} />}
      </Router>
  );
}

export default App;
