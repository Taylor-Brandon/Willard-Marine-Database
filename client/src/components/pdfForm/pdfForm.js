import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { ADD_PDF } from '../../utils/mutations'; 
import '../../styles/style.css';

export default function AddFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [addPdf] = useMutation(ADD_PDF);

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const fileName = selectedFile.name;
      const path = URL.createObjectURL(selectedFile); 

      try {
        const { data } = await addPdf({
          variables: {
            fileName,
            path,
          },
        });
        console.log('PDF uploaded successfully:', data);
      } catch (error) {
        console.error('Error uploading PDF:', error);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="file-upload">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and Drop a file here or click to select a file!</p>
      </div>
      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <button onClick={handleSubmit}>Upload</button>
        </div>
      )}
    </div>
  );
};

