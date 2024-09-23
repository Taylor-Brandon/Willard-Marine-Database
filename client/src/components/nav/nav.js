import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Auth from '../../utils/auth';
import { UserContext } from '../../app';

export default function Nav() {
    const { user } = useContext(UserContext);

    const userData = user || JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        localStorage.clear();
        <Navigate to='/login' />
      };
    return(
<nav className="navbar">
        <div id='nav-area' className="container-fluid">
          <button id='toggle-nav' className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
          <i id='nav-icon' class="bi bi-list"></i>
          </button>
          <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
            <h1 id='userData-name'>{userData.firstName} {userData.lastName}</h1>
              <button id='close-btn' type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className='nav-item'>
                <h2 id='userData-email'>{userData.email}</h2>
                </li>
                <li className='nav-item'>
                <h2 id='userData-admin'>Admin: {userData.admin.toString()}</h2>
                </li>
                <li className='nav-item'>
                </li>
                <li className="nav-item">
                <button id='profileLog-btn' className='btn' onClick={logout}>Logout</button>
                </li>
                <li className="nav-item">
                <Link id='profileHome-btn' to="/home">Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
}