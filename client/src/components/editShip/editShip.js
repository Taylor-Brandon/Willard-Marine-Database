import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SHIPS } from "../../utils/queries";
import { REMOVE_SHIP } from "../../utils/mutations";
import '../../styles/style.css';

export default function EditShip() {
    const { loading, data, error } = useQuery(QUERY_SHIPS);
    const ships = data?.ships || [];

    const [removeShip] = useMutation(REMOVE_SHIP, {
        onCompleted: () => {
            window.alert("Ship Removed Successfully");
        },
        onError: (error) => {
            window.alert(error.message);
        },
        refetchQueries: [{ query: QUERY_SHIPS }]
    });

    const handleRemoveShip = (shipId) => {
        if (window.confirm("Are you sure you want to remove this ship?")) {
            removeShip({ variables: { shipId } });
        }
    };

    if (error) return <h1>Error: {error.message}</h1>
    return(
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                    {loading ? (
                        <div>Loading. . .</div>
                    ) : (
                        <div>
                            <Link id='editShipHome-link' to="/home"><i class="bi bi-house"></i></Link>
                            <Link id='editShipProfile-link' to="/profile"><i className="bi bi-person"></i></Link>
                            <div id="ship-list" className="flex-row justify-space-betweeen my-4">
                            {ships.map((ship) => (
                                <div key={ship._id} className="col-12 col-xl-6 ms-2">
                                    <div className="card mb-3">
                                    <nav className="card-heading">
                                    <h4 id="shipCard-header" className="card-header p-2 m-0">
                {ship.shipName}<br />
                </h4>
                <div className="ship-links">
                <Link id="editShip-link" to={`/ship/${ship._id}`}><i className="bi bi-pen"></i></Link>
                <button
                id="removeShip-btn" 
                onClick={() => handleRemoveShip(ship._id)} 
                className="btn ml-3">
                <i className="bi bi-x"></i>
                </button>
                </div>
                </nav>
                <span className="text-black" style={{ fontSize: '1rem'}}>
                    <div className="ship-data">
                    <p className="ms-2">{ship.model}</p>
                    </div>
                </span>
        </div>
    </div>
))}



                            </div>
                            <Link to="/home">Home</Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};
