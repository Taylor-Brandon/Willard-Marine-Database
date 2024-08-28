import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SHIPS } from "../utils/queries";
import { UPDATE_SHIP } from '../utils/mutations';
import "../styles/style.css";

export default function ChangeShip() {
    const { shipId } = useParams();
    const { loading, error, data } = useQuery(QUERY_SHIPS, {
        variables: { shipId }
    });
    const [updateShip] = useMutation(UPDATE_SHIP, {
        onCompleted: (data) => {
            window.alert("Change Successful");
        },
        onError: (error) => {
            window.alert(error.message)
        }
    });
    const [ship, setShip] = useState(null);
    const [formData, setFormData] = useState({
        shipName: '',
        model: '',
        HRN: '',
        HIN: '',
        contactNumber: '',
        sponsonSerialNumber: '',
        SRBSerialNumber: '',
        fuelTankSerialNumber: '',
        ZAPR356C2BVMXHookSerialNumber: '',
        engineMakeModel: '',
        engineSerialNumber: '',
        POCName: '',
        POCEmail: '',
        POCPhoneNumber: '',
        notes: '',
    });

    useEffect(() => {
        if(data && data.ships) {
            const foundShip = data.ships.find(ship => ship._id === shipId);
            setShip(foundShip);
            if (foundShip) {
                setFormData({
                    shipName: foundShip.Ship,
                    model: foundShip.Model,
                    HRN: foundShip.HRN,
                    HIN: foundShip.HIN,
                    contactNumber: foundShip.contactNumber,
                    sponsonSerialNumber: foundShip.sponsonSerialNumber,
                    SRBSerialNumber: foundShip.SRBSerialNumber,
                    fuelTankSerialNumber: foundShip.fuelTankSerialNumber,
                    ZAPR356C2BVMXHookSerialNumber: foundShip.ZAPR356C2BVMXHookSerialNumber,
                    engineMakeModel: foundShip.engineMakeModel,
                    engineSerialNumber: foundShip.engineSerialNumber,
                    POCName: foundShip.POCName,
                    POCEmail: foundShip.POCEmail,
                    POCPhoneNumber: foundShip.POCPhoneNumber,
                    notes: foundShip.Notes,
                });
            }
        }
    }, [data, shipId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateShip({ variables: { shipId, ...formData } });
    };
    
    return (
        <div>
            <Link id="changeShipHome-link" to="/home"><i className="bi bi-house"></i></Link>
            <div id='shipInfo-section'>
            <div id='shipInfo-card' className='card'>
            {ship && (
                <div>
                    <h1 id='ship-name'>{ship.shipName} {ship.model}</h1>
                    <div id="ship-text">
                    <p>HIN: {ship.HIN}</p>
                    <p>HRN: {ship.HRN}</p>
                    <p>Contact Number: {ship.contactNumber}</p>
                    <p>Sponson Serial Number: {ship.sponsonSerialNumber}</p>
                    <p>SRB Serial Number: {ship.SRBSerialNumber}</p>
                    <p>Fuel Tank Serial Number: {ship.fuelTankSerialNumber}</p>
                    <p>ZAPR 356C2BVMX Hook Serial Number: {ship.ZAPR356C2BVMXHookSerialNumber}</p>
                    <p>Engine Make/Model: {ship.engineMakeModel}</p>
                    <p>Engine Serial Number: {ship.engineSerialNumber}</p>
                    <p>POC Name: {ship.POCName}</p>
                    <p>POC Email: {ship.POCEmail}</p>
                    <p>POC Phone Number: {ship.POCPhoneNumber}</p>
                    <p>ID: {ship._id}</p>
                    </div>
                </div>
            )}
            </div>
            </div>
            <div id="shipForm-section">
            <div id='shipForm-card' className='card'>
            <form className='form' onSubmit={handleSubmit}>
            <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="shipName"
                        value={formData.shipName}
                        onChange={handleChange}
                    />
                    <label htmlFor='shipName' className='form-label'>Ship Name</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                    />
                    <label htmlFor='model' className='form-label'>Model</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="HIN"
                        value={formData.HIN}
                        onChange={handleChange}
                    />
                    <label htmlFor='HIN' className='form-label'>HIN</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="HRN"
                        value={formData.HRN}
                        onChange={handleChange}
                    />
                    <label htmlFor='HRN' className='form-label'>HRN</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor='contactNumber' className='form-label'>Contact Number</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="sponsonSerialNumber"
                        value={formData.sponsonSerialNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor='sponsonSerialNumber' className='form-label'>Sponson Serial Number</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="fuelTankSerialNumber"
                        value={formData.fuelTankSerialNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor='fuelTankSerialNumber' className='form-label'>Fuel Tank Serial Number</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="SRBSerialNumber"
                        value={formData.SRBSerialNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor='SRBSerialNumber' className='form-label'>SRB Serial Number</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="ZAPR356C2BVMXHookSerialNumber"
                        value={formData.ZAPR356C2BVMXHookSerialNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor='ZAPR356C2BVMXHookSerialNumber' className='form-label'>ZAPR 356C2BVMX Hook Serial Number</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="engineMakeModel"
                        value={formData.engineMakeModel}
                        onChange={handleChange}
                    />
                    <label htmlFor='engineMakeModel' className='form-label'>Engine Make and Model</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="engineSerialNumber"
                        value={formData.engineSerialNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor='engineSerialNumbber' className='form-label'>Engine Serial Number</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="POCName"
                        value={formData.POCName}
                        onChange={handleChange}
                    />
                    <label htmlFor='POCName' className='form-label'>POC Name</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="POCEmail"
                        value={formData.POCEmail}
                        onChange={handleChange}
                    />
                    <label htmlFor='POCEmail' className='form-label'>POC Email</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="POCPhoneNumber"
                        value={formData.POCPhoneNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor='POCPhoneNumber' className='form-label'>POC Phone Number</label>
                    </div>
                <button id='editShip-btn' className='btn' type="submit" disabled={loading}>Update User</button>
{error && <p>Error: {error.message}</p>}
</form>
</div>
</div>
</div>
    );
};


                


