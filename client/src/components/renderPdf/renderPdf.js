import React, { useState } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';


function PDFViewer() {
    const [pdfFile, setPdfFile] = useState(null);
    const [viewPdf, setViewPdf] = useState(null);

    const fileType = ['application/pdf'];

    const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader()
                reader.readAsDataURL(selectedFile)
                reader.onload = (e) => {
                    setPdfFile(e.target.result)
                }
            } else {
                setPdfFile(null)
            }
        } else {
            console.log("Please select a file.")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (pdfFile !== null) {
            localStorage.setItem('pdfFile', pdfFile);
            setViewPdf(pdfFile);
        } else {
            setViewPdf(null)
        }
    }

    const customLayout = {
        render(props) {
            
            return (
                <div>
                    <div
                        className="pdf-viewer"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <Viewer
                                {...props}
                                defaultScale={SpecialZoomLevel.PageFit}
                            />
                        </div>
                    </div>
                </div>
            );
        },
    };

    return (
        <div className='container'>
            <h2>View Pdf</h2>
            <form onSubmit={handleSubmit}>
                <input type='file' className='form-control' onChange={handleChange} />
                <button type='submit' className='btn btn-warning'>View PDF</button>
            </form>

            <div className='pdf-container'>
                <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js">
                    {viewPdf && <Viewer fileUrl={viewPdf} plugins={[customLayout]} />}
                    {!viewPdf && <>No Pdf</>}
                </Worker>
            </div>

        </div>
    )
}

export default PDFViewer;
