import React from 'react';
import { Link } from "react-router-dom";
import Search from '../components/search/search';

export default function Home() {
    return (
        <div>
            <nav id='home-nav' className='nav'>
                <ul>
                    <li><Link id='logout-link' to="/login"><i className="bi bi-box-arrow-left"></i></Link></li>
                    <li><Link id='profile-link' to="/profile"><i className="bi bi-person"></i></Link></li>
                </ul>
            </nav>
            <div>
            <Search />
            </div>
        </div>
    );
}