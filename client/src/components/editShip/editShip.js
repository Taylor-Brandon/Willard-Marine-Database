import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SHIPS } from "../../utils/queries";
import '../../styles/style.css';

export default function EditSolas() {
    const { loading, data, error } = useQuery(QUERY_SHIPS);
    const ships = data?.ships || [];

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
                {ship.Ship} {ship.Model} <br />
                <span className="text-black" style={{ fontSize: '1rem'}}>
                    <p>More data</p>
                </span>
                <Link to={`/${ship._id}`}>Edit Ship</Link>
            </h4>
        </div>
    </div>
))}



                            </div>
                            <Link to="/userList">User List</Link>
                            <Link to="profile">profile</Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};
