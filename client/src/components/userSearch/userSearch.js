import React, { useState } from 'react';
import { Link } from "react-router-dom";
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
      <button className="btn btn-outline-warning" type="submit">Search</button>
      <section>
        <h2 className="bs-info-text-emphasis"></h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {filteredUsers.length === 0 ? (
          <p>No results found</p>
        ) : (
          <ul>
            {filteredUsers.map((user) => (
              <li key={user._id}>
                {user.firstName} - {user.lastName} - {user.email} - {user.admin} - {user._id}
                <Link to={`/user/${user._id}`}>View Details</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};
