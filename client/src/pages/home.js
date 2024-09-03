import React from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Auth from '../utils/auth';
import Search from '../components/search/search';

export default function Home() {
    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        <Navigate to='/login' />
      };
    return (
        <div>
            <nav id='home-nav' className='nav'>
                <ul>
                    <li><button id='logout-link' className='btn' onClick={logout}><i className="bi bi-box-arrow-left"></i></button></li>
                    <li><Link id='profile-link' to="/profile"><i className="bi bi-person"></i></Link></li>
                </ul>
            </nav>
            <div>
            <Search />
            </div>
        </div>
    );
}