import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/nav/nav';



export default function Profile() {    
    return (
        <div>
            <Nav />
            <div className='cards'>
                <div id='profileUser-card' className='card'> 
                    <div className='card-header'>
                        <h1>Users</h1>
                    </div>
                    <div className='card-body'>
                        <div className='d-inline-flex gap-1'>
                            <h5>Manage User Accounts and access permissions</h5>
                            <a id='profileUser-btn' className="btn" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                            <i className="bi bi-arrow-down"></i>
                            </a>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="collapse multi-collapse" id="multiCollapseExample1">
                                    <div id='user-cardBody' className="card card-body">
                                    <ul className='card-links'>
                                    <li><Link id='editUser-link' to="/editUser"><i className="bi bi-pen"></i></Link></li>
                                    <li><Link id='searchUser-link' to="/searchUser"><i className="bi bi-search"></i></Link></li>
                                    <li><Link id='addUser-link' to="/addUser"><i className="bi bi-plus-square"></i></Link></li>
                                            </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='profileShip-card' className='card'> 
                    <div className='card-header'>
                        <h1>Ships</h1>
                    </div>
                    <div className='card-body'>
                        <div className='d-inline-flex gap-1'>
                        <h5>Access and manage ship data</h5>
                            <a id='profileShip-btn' className="btn" data-bs-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2">
                            <i className="bi bi-arrow-down"></i>
                            </a>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="collapse multi-collapse" id="multiCollapseExample2">
                                    <div id='ship-cardBody' className="card card-body">
                                    <ul className='card-links'>
                                    <li><Link id='editShip-link' to="/editShip"><i class="bi bi-pen"></i></Link></li>
                                    <li><Link id='searchShip-link' to="/shipSearch"><i class="bi bi-search"></i></Link></li>
                                    <li><Link id='addShip-link' to="/addShip"><i class="bi bi-plus-square"></i></Link></li>
                                            </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='profilePdf-card' className='card'> 
                    <div className='card-header'>
                        <h1>PDF Files</h1>
                    </div>
                    <div className='card-body'>
                        <div className='d-inline-flex gap-1'>
                        <h5>Access and manage PDF file data</h5>
                            <a id='profilePdf-btn' className="btn" data-bs-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3">
                            <i className="bi bi-arrow-down"></i>
                            </a>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="collapse multi-collapse" id="multiCollapseExample3">
                                    <div id='pdf-cardBody' className="card card-body">
                                    <ul className='card-links'>
                                    <li><Link id='editPdf-link' to="/editPdf"><i class="bi bi-pen"></i></Link></li>
                                    <li><Link id='searchPdf-link' to="/searchPdf"><i class="bi bi-search"></i></Link></li>
                                    <li><Link id='addPdf-link' to="/addFile"><i class="bi bi-plus-square"></i></Link></li>
                                            </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
