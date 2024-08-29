import React from 'react';
import { Link } from "react-router-dom";
import Search from '../components/search/search';

export default function Home() {
    return (
        <div>
            <nav className='nav'>
                <ul>
                    <li><Link id='logout-link' to="/login">Logout</Link></li>
                    <li><Link id='profile-link' to="/profile">Profile</Link></li>
                    <li><Link id='editShip-link' to="/editShip">Edit Ship</Link></li>
                </ul>
            </nav>
            <div>
            <Search />
            </div>
        </div>
    );
}