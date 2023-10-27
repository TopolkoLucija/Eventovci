import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Sidebar from './components/scripts/Sidebar';
import Home from './components/scripts/Home';
import MyAccount from './components/scripts/MyAccount';
import LoginM from './components/scripts/LoginM';
function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        
        <Routes>
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/" element={<Home />} />
        </Routes>
        
      </div>
      <LoginM></LoginM>
    </Router>
  );
}

export default App;