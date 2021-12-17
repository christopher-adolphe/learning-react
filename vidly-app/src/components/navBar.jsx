import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">Vidly</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Movies</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="customers">Customers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="rentals">Rentals</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
 
export default NavBar;
