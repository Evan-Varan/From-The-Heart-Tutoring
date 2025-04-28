import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminNavbar from "./components/AdminNavbar"
import Dashboard from "./pages/Dashboard"
// import Tutors from "./pages/Tutors"
// import Students from "./pages/Students"
// import Calendar from "./pages/Calendar"
// import Invoices from "./pages/Invoices"
// import Expenses from "./pages/Expenses"
// import Revenue from "./pages/Revenue"
import "./index.css"

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <AdminNavbar />
        <main className="flex-1 overflow-auto p-6 bg-[#f5f5f9]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/tutors" element={<Tutors />} />
            <Route path="/students" element={<Students />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/revenue" element={<Revenue />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
