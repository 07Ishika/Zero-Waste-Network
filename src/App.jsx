import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Pages/Homepage/Home";
import Update from './Pages/Updatepage/Update';
import Login from './Components/Login/Login';
import Register from './Components/Register/Regiser';
import Volunteer from "./Pages/Volunteerpage/Volunteer";
import About from "./Pages/Aboutpage/About";
import Dashboard from "./Components/Dashboard/Dashboard";
import CompostDashboard from "./Components/Dashboard/Rdashboard";
import Impact from "./Pages/Impactpage/Impact";
import ComposterReg from "./Components/ComposterRegistration/ComposterReg";

// Guard: if no token, send to login
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!token || token === 'undefined' || token === 'null' || !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const location = useLocation()

  return (
    <div>
      {!(location.pathname === "/login" || location.pathname === "/Register") && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* Protected */}
        <Route path="/update" element={<Update />} />
        <Route path="/Volunteer" element={<Volunteer />} />
        <Route path="/about" element={<About />} />
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/Rdashboard" element={<ProtectedRoute><CompostDashboard /></ProtectedRoute>} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/composter-registration" element={<ProtectedRoute><ComposterReg /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;



