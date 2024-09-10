import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Auth from '../utils/auth';
import { UserContext } from '../app';


export default function Profile() {
    const { user } = useContext(UserContext);

    const userData = user || JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        localStorage.clear();
        <Navigate to='/login' />
      };
   
    return (
    <div>
        {userData.admin.toString() === 'true' ? (
            <div>
            <h1 id='userData-name'>{userData.firstName} {userData.lastName}</h1>
            <h2 id='userData-email'>{userData.email}</h2>
            <h2 id='userData-admin'>Admin: {userData.admin.toString()}</h2>
            <div className='links-list'>
            <nav className='nav'>
                <ul>
                    <li><button id='profileLog-link' className='btn' onClick={logout}><i className="bi bi-box-arrow-left"></i></button></li>
                    <li><Link id='profileHome-link' to="/home"><i class="bi bi-house"></i></Link></li>
                </ul>
                </nav>
        </div>
        <div className='cards'>
        <card id='profileUser-card' className='card'>  
            <div className='card-header'>
                <h1>Users</h1>
            </div>
            <div className='card-body'>
                <p id='userCard-text'>Manage User Accounts and access permissions</p>
            </div>
            <div className='card-footer'>
                <ul className='card-links'>
                    <li><Link id='editUser-link' to="/editUser"><i class="bi bi-pen"></i></Link></li>
                    <li><Link id='searchUser-link' to="/searchUser"><i class="bi bi-search"></i></Link></li>
                    <li><Link id='addUser-link' to="/addUser"><i class="bi bi-plus-square"></i></Link></li>
                </ul>
            </div>
        </card>
        <card id='profileShip-card' className='card'>
            <div className='card-header'>
                <h1>Ships</h1>
            </div>
            <div className='card-body'>
                <p id='shipCard-text'>Access and manage ship data</p>
            </div>
            <div className='card-footer'>
                <ul className='card-links'>
                    <li><Link id='editShip-link' to="/editShip"><i class="bi bi-pen"></i></Link></li>
                    <li><Link id='searchShip-link' to="/shipSearch"><i class="bi bi-search"></i></Link></li>
                    <li><Link id='addShip-link' to="/addShip"><i class="bi bi-plus-square"></i></Link></li>
                </ul>
            </div>
        </card>
        <card id='profilePdf-card' className='card'>
            <div className='card-header'>
                <h1>PDF Files</h1>
            </div>
            <div className='card-body'>
                <p id='pdfCard-text'>Access and manage PDF file data</p>
            </div>
            <div className='card-footer'>
                <ul className='card-links'>
                    <li><Link id='editPdf-link' to="/editPdf"><i class="bi bi-pen"></i></Link></li>
                    <li><Link id='searchPdf-link' to="/searchPdf"><i class="bi bi-search"></i></Link></li>
                    <li><Link id='addPdf-link' to="/addFile"><i class="bi bi-plus-square"></i></Link></li>
                </ul>
            </div>
        </card>
        </div>
        </div>
        ) : (
            <>
            <div>
            <h1 id='userData-name'>{userData.firstName} {userData.lastName}</h1>
            <h2 id='userData-email'>{userData.email}</h2>
            <h2 id='userData-admin'>Admin: {userData.admin.toString()}</h2>
            <div className='links-list'>
            <nav className='nav'>
                <ul>
                    <li><button id='profileLog-link' className='btn' onClick={logout}><i className="bi bi-box-arrow-left"></i></button></li>
                    <li><Link id='profileHome-link' to="/home"><i class="bi bi-house"></i></Link></li>
                </ul>
                </nav>
        </div>
        <card id='profileShip-card' className='card'>
            <div className='card-header'>
                <h1>Ships</h1>
            </div>
            <div className='card-body'>
                <p id='shipCard-text'>Access and manage ship data</p>
            </div>
            <div className='card-footer'>
                <ul className='card-links'>
                    <li><Link id='editShip-link' to="/editShip"><i class="bi bi-pen"></i></Link></li>
                    <li><Link id='searchShip-link' to="/search"><i class="bi bi-search"></i></Link></li>
                    <li><Link id='addShip-link' to="/addShip"><i class="bi bi-plus-square"></i></Link></li>
                </ul>
            </div>
        </card>
        <card id='profilePdf-card' className='card'>
            <div className='card-header'>
                <h1>PDF Files</h1>
            </div>
            <div className='card-body'>
                <p id='pdfCard-text'>Access and manage PDF file data</p>
            </div>
            <div className='card-footer'>
                <ul className='card-links'>
                    <li><Link id='editPdf-link' to="/editPdf"><i class="bi bi-pen"></i></Link></li>
                    <li><Link id='searchPdf-link' to="/searchPdf"><i class="bi bi-search"></i></Link></li>
                    <li><Link id='addPdf-link' to="/addFile"><i class="bi bi-plus-square"></i></Link></li>
                </ul>
            </div>
        </card>
            </div>
            </>
        )}
    </div>
    );
}