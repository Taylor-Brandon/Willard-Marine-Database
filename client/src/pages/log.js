import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/style.css';

 export default function Log() {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate(); 
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      console.log(formState);
      try {
        const { data } = await login({
          variables: { ...formState },
        });
    
        Auth.login(data.login.token);
        setLoggedIn(true);
        navigate('/home');
      } catch (error) {
        console.error(error);
        if (error.message.includes('Invalid credentials')) {
            console.log('Invalid credentials');
        } else {
            console.log('An error occurred');
      }
    }
    setFormState({
      email: '',
      password: '',
    });
  };
  return (
    <div>
      {loggedIn ? (
        <Navigate to="/home" /> 
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error.message}</p>}
          <h2 className='header'>Login</h2>
          <form className='form w-25 p-2' onSubmit={handleFormSubmit}>
            <div className='form-floating'>
              <input
                className='form-control'
                value={formState.email}
                name="email"
                onChange={handleInputChange}
                type="text"
                placeholder='Email'
              />
              <label htmlFor='Email' className='form-label'>Email</label>
            </div>
            <div className='form-floating'>
              <input
                className='form-control'
                value={formState.password}
                name="password"
                onChange={handleInputChange}
                type="password"
                placeholder='Password'
              />
              <label htmlFor='password' className='form-label'>Password</label>
            </div>
            <button id="submit" className='btn btn-warning' type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}


