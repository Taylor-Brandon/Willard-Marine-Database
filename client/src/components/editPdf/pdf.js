import React from "react";
import { Link } from "react-router-dom";
import LinkBar from '../linkBar/linkBar';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PDFS } from "../../utils/queries";
import { REMOVE_PDF } from "../../utils/mutations";
import '../../styles/style.css';

export default function EditPdf() {
    const { loading, error, data } = useQuery(QUERY_PDFS);
    const pdfs = data?.pdfs || [];

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

    if (error) return <h1>Error: {error.message}</h1>;

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                    {loading ? (
                        <div>Loading. . .</div>
                    ) : (
                        <div>
                            <div id="editPdf-links">
                            <LinkBar />
                            </div>
                            <div id="file-list" className="flex-row justify-space-between my-4">
                                {pdfs.map((pdf) => (
                                    <div id="editPdf-cards" className="card" key={pdf._id}>
                                        <div>
                                            <div className="card-header" id="pdf-header">
                                                <h4 id="editPdf-fileName">{pdf.fileName} <br /></h4>
                                                <h6 className="card-subtitle" id="pdf-ship">{pdf.ship}</h6>
                                            </div>
                                            <div className="card-body">
                                            <div id="btn-area">
                                                <div id="pdf-btns">
                                                    <button
                                                        id="viewPdf"
                                                        onClick={() => handleView(pdf)}
                                                        className="btn"
                                                    >
                                                        <i className="bi bi-filetype-pdf"></i>
                                                    </button>
                                                    <button 
                                                        id="pdfDelete-btn"
                                                        onClick={() => handleRemovePdf(pdf._id)}
                                                        className="btn ml-3"
                                                    >
                                                        <i className="bi bi-x"></i>
                                                    </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
