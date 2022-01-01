import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">Vidly</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="movies">Movies</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="customers">Customers</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="rentals">Rentals</NavLink>
            </li>

            {
              user ?
              (<Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="profile">Profile</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="logout">Logout</NavLink>
                </li>
              </Fragment>) :
              (<Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="login">Login</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="register">Register</NavLink>
                </li>
              </Fragment>)
            }

          </ul>
        </div>

        {
          user ? (<div className="d-flex"><span className="badge bg-primary">{ user.name }</span></div>) : null
        }
      </div>
    </nav>
  );
}
 
export default NavBar;
