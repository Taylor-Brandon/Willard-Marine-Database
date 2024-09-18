import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { UserContext } from '../app';
import Auth from '../utils/auth';
import '../styles/style.css';

export default function Sign() {
  const { loginUser } = useContext(UserContext);
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        admin: false,
    });

    const [addUser, {error, data}] = useMutation(ADD_USER);
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    const handleDropDownChange = (e) => {
        setFormState({
          ...formState,
          admin: e.target.value === 'true',
        });
      };

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formState);
        try {
            const { data } = await addUser({
                variables: { ...formState },
            });
            const { token, user } = data.addUser;
            Auth.login(token); 
            localStorage.setItem('user', JSON.stringify(user));
            loginUser(user); 
            setLoggedIn(true);
    
        } catch (e) {
            console.error(e);
        }
    };

    return (
<div className="container">
      {loggedIn ? (
        <Navigate to="/home" />
      ) : (
        <>
          <h2 className="header p-4">Please Sign Up!</h2>
          <card id='form'>
          <form className="form w-50 p-2" onSubmit={handleFormSubmit}>
            <div className="form-floating">
              <input
                className="form-control"
                value={formState.firstName}
                name="firstName"
                onChange={handleInputChange}
                type="text"
                placeholder="First Name"
              />
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                value={formState.lastName}
                name="lastName"
                onChange={handleInputChange}
                type="text"
                placeholder="Last Name"
              />
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                value={formState.email}
                name="email"
                onChange={handleInputChange}
                type="text"
                placeholder="Email"
              />
              <label htmlFor="Email" className="form-label">
                Email
              </label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                value={formState.password}
                name="password"
                onChange={handleInputChange}
                type="password"
                placeholder="Password"
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
            </div>
            <div id="dropdown" className="form-floating mt-3 w-50">
              <select
                className="form-select"
                value={formState.admin}
                name="admin"
                onChange={handleDropDownChange}
              >
                <option value="">Select Admin Status</option>
                <option value="true">Admin</option>
                <option value="false">Not Admin</option>
              </select>
              <label htmlFor="admin" className="form-label">
                Admin
              </label>
            </div>
            <button id='submit-btn' className='btn mx-auto' type='submit'>Submit</button>
          </form>
          </card>

        <div id='login-area'>
          <p id='login-link' className="m-5">
            Already have an account?{" "}
            <Link id="login-btn" className="link" to="/login">
              Login
            </Link>
          </p>
          </div>
        </>
      )}
    </div>
    );
}