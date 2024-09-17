import React from "react";
import { Link } from "react-router-dom";
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

    if (error) return <h1>Error: {error.message}</h1>;

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                    {loading ? (
                        <div>Loading. . .</div>
                    ) : (
                        <div>
                            <Link id="editPdfHome-link" to="/home"><i className="bi bi-house"></i></Link>
                            <Link id='editPdfProfile-link' to="/profile"><i className="bi bi-person"></i></Link>
                            <div id="file-list" className="flex-row justify-space-between my-4">
                                {pdfs.map((pdf) => (
                                    <div key={pdf._id} className="col-12 col-xl-6">
                                        <div className="card ms-3 mb-3">
                                        <nav className="card-heading">
                                            <h4 id="pdfCard-header" className="card-header p-2 m-0">
                                                {pdf.fileName} {pdf.path} {pdf.ship} <br />
                                                </h4>
                                                </nav>
                                                <div id="pdfLink-box">
                                                <button 
                                                    id="pdfDelete-btn"
                                                    onClick={() => handleRemovePdf(pdf._id)} 
                                                    className="btn ml-3">
                                                    <i className="bi bi-x"></i>
                                                </button>
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
};