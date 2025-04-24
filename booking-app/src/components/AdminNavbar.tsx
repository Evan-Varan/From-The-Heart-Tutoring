import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heartLogo from '../images/heart-logo.png';

export default function AdminNavbar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`h-screen bg-[#0d1224] text-white flex flex-col justify-between p-4 ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
      <div>
        <div className="flex items-center space-x-3 mb-8">
          <img src={heartLogo} alt="logo" className="w-10 h-10" />
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold leading-5">
                FROM THE <span className="text-[#f87171]">Heart</span>
              </h1>
              <p className="text-sm text-cyan-300">STUDENT PORTAL</p>
            </div>
          )}
        </div>

        {/* MAIN MENU */}
        <div className="text-xs uppercase text-gray-400 mb-4">Main Menu</div>
        <ul className="space-y-3">
          <li><Link to="/dashboard" className="flex items-center gap-3"><i className="ri-home-4-line"></i>{!collapsed && 'Dashboard'}</Link></li>
          <li><Link to="/tutors" className="flex items-center gap-3"><i className="ri-group-line"></i>{!collapsed && 'Tutors & Staff'}</Link></li>
          <li><Link to="/students" className="flex items-center gap-3"><i className="ri-book-line"></i>{!collapsed && 'Students'}</Link></li>
          <li><Link to="/calendar" className="flex items-center gap-3"><i className="ri-calendar-line"></i>{!collapsed && 'Calendar'}</Link></li>
        </ul>

        {/* Collapse Button */}
        <button onClick={() => setCollapsed(!collapsed)} className="mt-6 w-full py-2 bg-[#131a2f] rounded text-sm text-cyan-300">
          {collapsed ? '>>' : '<<  COLLAPSE MENU  >>'}
        </button>

        {/* FINANCE Section */}
        <div className="text-xs uppercase text-gray-400 mt-8 mb-3">Finance</div>
        <ul className="space-y-3">
          <li><Link to="/invoices" className="flex items-center gap-3"><i className="ri-file-list-3-line"></i>{!collapsed && 'Invoices'}</Link></li>
          <li><Link to="/expenses" className="flex items-center gap-3"><i className="ri-wallet-line"></i>{!collapsed && 'Expenses'}</Link></li>
          <li><Link to="/revenue" className="flex items-center gap-3"><i className="ri-currency-line"></i>{!collapsed && 'Revenue'}</Link></li>
        </ul>
      </div>

      {/* Footer */}
      {!collapsed && <p className="text-center text-xs text-cyan-400">From the Heart Tutoring © 2025</p>}
    </aside>
  );
}
