import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USERS } from "../utils/queries";
import { UPDATE_USER } from '../utils/mutations';
import '../styles/style.css';

export default function ChangeUser() {
    const { userId } = useParams();
    const { loading, error, data } = useQuery(QUERY_USERS, {
        variables: { userId }
    });
    const [updateUser] = useMutation(UPDATE_USER, {
        onCompleted: (data) => {
            window.alert("Change Successful");
        },
        onError: (error) => {
            window.alert(error.message)
        }
    });
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        admin: false,
    });

    useEffect(() => {
        if(data && data.users) {
            const foundUser = data.users.find(user => user._id === userId);
            setUser(foundUser);
            if (foundUser) {
                setFormData({
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    email: foundUser.email,
                    admin: foundUser.admin,
                });
            }
        }
    }, [data, userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({ variables: { userId, ...formData } });
    };

    return (
        <div>
             <Link id="changeUserHome-link" to="/home"><i className="bi bi-house"></i></Link>
             <Link id='changeUserProfile-link' to="/profile"><i className="bi bi-person"></i></Link>
            <div id='info-section'>
            <div id='info-card' className='card'>
            {user && (
                <div className='card-body'>
                    <h1 id='user-name'>{user.firstName} {user.lastName}</h1>
                    <p>Email: {user.email}</p>
                    <p>Admin: {user.admin.toString()}</p>
                    <p>ID: {user._id}</p>
                    </div>
            )}
            </div>
            </div>
                <div id="userForm-section">
                <div id='userForm-card' className='card'>
                <div className='card-name'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <label htmlFor='firstName' className='form-label'>First Name</label>
                </div>
                <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <label htmlFor='lastName' className='form-label'>Last Name</label>
                </div>
                <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label htmlFor='email' className='form-label'>Email</label>
                </div>
                <div id="dropdown" className="form-floating mt-3 w-50 ms-3 3">
              <select
                className="form-select"
                value={formData.admin}
                name="admin"
                onChange={(e) => setFormData({ ...formData, admin: e.target.checked })}
              >
                <option value="">Select Admin Status</option>
                <option value="true">Admin</option>
                <option value="false">Not Admin</option>
              </select>
              <label htmlFor="admin" className="form-label">
                Admin
              </label>
            </div>
                <button id='editUser-btn' className='btn' type="submit" disabled={loading}>Update User</button>
                {error && <p>Error: {error.message}</p>}
            </form>
            </div>
            </div>
            </div>
        </div>
    );
};



