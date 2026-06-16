import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import MyRegistrations from "./pages/MyRegistrations.jsx";
import EventDetails from "./pages/EventDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route
          path="/my-registrations"
          element={<MyRegistrations />}
        />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Event Details */}
        <Route
          path="/event/:id"
          element={<EventDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;