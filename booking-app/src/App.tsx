// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import Dashboard from './pages/Dashboard';
// import Calendar from './pages/Calendar';
// import Students from './pages/Students';
// import Tutors from './pages/Tutors';

function App() {
  return (
    <Router>
      <div className="flex">
        <AdminNavbar />
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/calendar" element={<Calendar />} />
            <Route path="/students" element={<Students />} />
            <Route path="/tutors" element={<Tutors />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
