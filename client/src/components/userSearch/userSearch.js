import React, { useState } from 'react';
import { Link } from "react-router-dom";
import LinkBar from '../linkBar/linkBar';
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import '../../styles/style.css';

export default function UserSearch() {
    const [searchInput, setSearchInput] = useState('');
    const { loading, error, data } = useQuery(QUERY_USERS);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleChange = (event) => {
        const searchQuery = event.target.value;
        setSearchInput(searchQuery);
        filterUsers(searchQuery);
      };

      const filterUsers = (searchQuery) => {
        if (!searchQuery) {
          setFilteredUsers([]);
          return;
        }

        const filteredUsers = data.users.filter((user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase())||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setFilteredUsers(filteredUsers);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  }
    

  return (
    <section>
      <LinkBar />
      <div id='userSearch-input'>
      <form className="form w-50" onSubmit={handleFormSubmit}>
        <div className="form-control p-3 mb-2">
          <input
            className='p-2 w-100 border border-white'
            type="text"
            value={searchInput}
            onChange={handleChange}
            placeholder="Enter user first name, last name, email, or role"
          />
        </div>
      </form>
      <button id='userSearch-btn' className="btn" type="submit"><i className="bi bi-search"></i></button>
      </div>
      <section>
        <h2 className="bs-info-text-emphasis"></h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {filteredUsers.length === 0 ? (
          <p id='noUser-result'>No results found</p>
        ) : (
          <ul id='user-results'>
            {filteredUsers.map((user) => (
              <li key={user._id}>
                {user.firstName} - {user.lastName} - {user._id}
                <Link id='user-details' to={`/user/${user._id}`}><i className="bi bi-clipboard-check-fill"></i></Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};
