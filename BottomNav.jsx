import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UserPlus, FileText, Settings } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/add-customer" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <UserPlus size={24} />
        <span>Register</span>
      </NavLink>
      <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <FileText size={24} />
        <span>Reports</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Settings size={24} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
