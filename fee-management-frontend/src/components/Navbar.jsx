import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Fee Management System</h1>
      </div>
      <ul className="navbar-nav">
        <li>
          <Link to="/" className={isActive('/')}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/students" className={isActive('/students')}>
            Students
          </Link>
        </li>
        <li>
          <Link to="/fees" className={isActive('/fees')}>
            Fees
          </Link>
        </li>
        <li>
          <Link to="/payments" className={isActive('/payments')}>
            Payments
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
