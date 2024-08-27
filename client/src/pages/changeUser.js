import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USERS } from "../utils/queries";
import { REMOVE_USER, UPDATE_USER } from '../utils/mutations';
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
    const [removeUser] = useMutation(REMOVE_USER, {
        onCompleted: (data) => {
            window.alert("User Removed Successfully");
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

    const handleRemoveUser = () => {
       
        if (window.confirm("Are you sure you want to remove this user?")) {
            
            removeUser({ variables: { userId } });
        }
    };

    return (
        <div>
            {user && (
                <div>
                    <h1>{user.firstName} {user.lastName}</h1>
                    <p>Email: {user.email}</p>
                    <p>Admin: {user.admin.toString()}</p>
                    <p>ID: {user._id}</p>
                    <button onClick={handleRemoveUser}>Remove User</button>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Admin:
                    <input
                        type="checkbox"
                        name="admin"
                        checked={formData.admin}
                        onChange={(e) => setFormData({ ...formData, admin: e.target.checked })}
                    />
                </label>
                <button type="submit" disabled={loading}>Update User</button>
                {error && <p>Error: {error.message}</p>}
            </form>
            <Link to="/home">Profile</Link>
        </div>
    );
};



