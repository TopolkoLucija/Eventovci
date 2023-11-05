import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/scripts/Sidebar';
import Home from './components/scripts/Home';
import AboutUs from './components/scripts/AboutUs';
import MyAccount from './components/scripts/MyAccount';
import LoginM from './components/scripts/LoginM';
import Events from './components/scripts/Events';
import Calendar from './components/scripts/Calendar';
import './components/styles/App.css';
import { useEffect, useState } from 'react';


function App() {

  const [user, setUser] = useState("");

  const getData = (data) =>{
    console.log(data);
    setUser(data);
    // Spremanje accessToken u localStorage
    sessionStorage.setItem('accessToken', data.accessToken);

  }

  return (
    <div className="app-container">
      <Sidebar />

      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-calendar" element={<Calendar />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<LoginM getData = {getData} />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;