import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="container-fluid">
        <div className="nav-item d-flex flex-column gap-2">
          <NavLink to="/admin/" className="administration">Admin</NavLink>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pages/news/">News</NavLink>
          <NavLink to="/pages/facts/">Facts</NavLink>
          <NavLink to="/pages/contacts/">Contacts</NavLink>
          <NavLink to="/pages/about/">About us</NavLink>
        </div>
    </nav>
  );
};

export default Navigation;