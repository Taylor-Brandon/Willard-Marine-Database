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
                            <h3 className="text-primary">Here is the current roster of ships</h3>
                            <div className="flex-row justify-space-betweeen my-4">
                            {ships.map((ship) => (
    <div key={ship._id} className="col-12 col-xl-6">
        <div className="card mb-3">
            <h4 className="card-header p-2 m-0">
                {ship.shipName} {ship.model} <br />
                <span className="text-black" style={{ fontSize: '1rem'}}>
                    <p>More data</p>
                </span>
                <Link to={`/ship/${ship._id}`}>Edit Ship</Link>
                <button 
                onClick={() => handleRemoveShip(ship._id)} 
                className="btn btn-danger ml-3">
                <i className="bi bi-x"></i>
                </button>
            </h4>
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
