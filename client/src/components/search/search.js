import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SHIPS } from "../../utils/queries";
import "../../styles/style.css";

export default function Search() {
    const [searchInput, setSearchInput] = useState('');
  const { loading, error, data } = useQuery(QUERY_SHIPS);
  const [filteredShips, setFilteredShips] = useState([]);

  const handleChange = (event) => {
    const searchQuery = event.target.value;
    setSearchInput(searchQuery);
    filterShips(searchQuery);
  };

  const filterShips = (searchQuery) => {
    if (!searchQuery) {
      setFilteredShips([]);
      return;
    }

    const filteredShips = data.ships.filter((ship) =>
      ship.shipName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.model.toLowerCase().includes(searchQuery.toLowerCase())||
      ship.HRN.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.HIN.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.contactNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.sponsonSerialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.SRBSerialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.fuelTankSerialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.ZAPR356C2BVMXHookSerialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.engineMakeModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.engineSerialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.POCName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.POCEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.POCPhoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredShips(filteredShips);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <section>
      <div id='shipSearch-input'>
      <form className="form w-50" onSubmit={handleFormSubmit}>
        <div className="form-control p-3 mb-2">
          <input
            className='p-2 w-100 border border-white'
            type="text"
            value={searchInput}
            onChange={handleChange}
            placeholder="Enter ship name or model"
          />
        </div>
      </form>
      <button id='shipSearch-btn' className="btn" type="submit"><i className="bi bi-search"></i></button>
      </div>
      <section>
        <h2 className="bs-info-text-emphasis"></h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {filteredShips.length === 0 ? (
          <p id='noShip-result'>No results found</p>
        ) : (
          <ul id='ship-results'>
            {filteredShips.map((ship) => (
              <li key={ship._id}>
                {ship.shipName} - {ship.model}
                <Link id='ship-details' to={`/ship/${ship._id}`}><i className="bi bi-clipboard-check-fill"></i></Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
