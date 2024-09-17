import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PDFS } from "../../utils/queries";
import '../../styles/style.css';

export default function SearchPdf() {
    const [searchInput, setSearchInput] = useState('');
    const { loading, error, data } = useQuery(QUERY_PDFS);
    const [filteredPdfs, setFilteredPdfs] = useState([]);


    const handleChange = (event) => {
        const searchQuery = event.target.value;
        setSearchInput(searchQuery);
        filterPdfs(searchQuery);
      };


      const filterPdfs = (searchQuery) => {
        if (!searchQuery) {
          setFilteredPdfs([]);
          return;
        }

        const filteredPdfs = data.pdfs.filter((pdf) =>
        pdf.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pdf.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pdf.ship.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPdfs(filteredPdfs);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <section>
      <Link id="searchPdfHome-link" to="/home"><i className="bi bi-house"></i></Link>
        <Link id='searchPdfProfile-link' to="/profile"><i className="bi bi-person"></i></Link>
      <div id='pdfSearch-input'>
      <form className="form w-50" onSubmit={handleFormSubmit}>
        <div className="form-control p-3 mb-2">
          <input
            className='p-2 w-100 border border-white'
            type="text"
            value={searchInput}
            onChange={handleChange}
            placeholder="Enter pdf file name or path"
          />
        </div>
      </form>
      <button id='pdfSearch-btn' className="btn" type="submit"><i className="bi bi-search"></i></button>
      </div>
      <section>
        <h2 className="bs-info-text-emphasis"></h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {filteredPdfs.length === 0 ? (
          <p id='noPdf-result'>No results found</p>
        ) : (
          <ul id='pdf-results'>
            {filteredPdfs.map((pdf) => (
              <li key={pdf._id}>
                {pdf.fileName} - {pdf.path} - {pdf.ship}
                <Link id='pdf-details' to={`/editPdf`}><i className="bi bi-clipboard-check-fill"></i></Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}