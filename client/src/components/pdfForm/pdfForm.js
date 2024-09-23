import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_PDF } from '../../utils/mutations'; 
import { QUERY_PDFS } from "../../utils/queries";
import { REMOVE_PDF } from "../../utils/mutations";
import axios from 'axios';
import '../../styles/style.css';

export default function AddFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [addPdf] = useMutation(ADD_PDF);
  const [shipName, setShipName] = useState(''); 
  const { loading, error, data } = useQuery(QUERY_PDFS);
  const pdfs = data?.pdfs || [];

  const handleFormChange = (e) => {
    setShipName(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFile && shipName) { 
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const result = await axios.post("http://localhost:3001/upload-files", formData);
        const filePath = result.data.file.path;

        const { data } = await addPdf({
          variables: {
            fileName: selectedFile.name,
            path: filePath, 
            ship: shipName, 
          },
        });

        alert("File Added Successfully");
        window.location.reload();
        console.log(data);
      } catch (error) {
        console.error(error);
        alert("File upload failed");
      }
    } else {
      alert("Please select a file and enter a ship name.");
    }
  };

  const [removePdf] = useMutation(REMOVE_PDF, {
    onCompleted: () => {
      window.alert("Pdf file Removed Successfully");
    },
    onError: (error) => {
      window.alert(error.message);
    },
    refetchQueries: [{ query: QUERY_PDFS }]
  });

  const handleRemovePdf = (pdfId) => {
    if (window.confirm("Are you sure you want to remove this file?")) {
      removePdf({ variables: { pdfId } });
    }
  };

  const handleView = (pdf) => {
    window.open(`http://localhost:3001/${pdf.path}`, "_blank");
  };

  return (
    <div className='container'>
      <Link id="editPdfHome-link" to="/home"><i className="bi bi-house"></i></Link>
      <Link id='editPdfProfile-link' to="/profile"><i className="bi bi-person"></i></Link>
      
      <div className="File-Form">
        <form className="formStyle" onSubmit={handleSubmit}>
          <h4>Upload PDF File</h4>
          <br />
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])} 
          />
          <br />
          <input
            value={shipName} 
            name="ship"
            type="text"
            className='form-control'
            onChange={handleFormChange} 
            placeholder="Ship Name"
          />
          <br />
          <div className='btn-area'>
            <button id='file-btn' className='btn' type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
        </div>
      </div>
    </div>
  );
}
