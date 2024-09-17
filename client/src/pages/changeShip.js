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
        annualInspectionDate: '',
        fiveYearInspectionCert: '',
        fiveYearInspectionDate: '',
        sponsonSerialNumber: '',
        SRBSerialNumber: '',
        fuelTankSerialNumber: '',
        ZAPR356C2BVMXHookSerialNumber: '',
        engineMakeModel: '',
        engineSerialNumber: '',
        gear: '',
        gearSerialNumber: '',
        jet: '',
        jetSerialNumber: '',
        volvoQ0087: '',
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
                    annualInspectionDate: foundShip.annualInspectionDate,
                    fiveYearInspectionCert: foundShip.fiveYearInspectionCert,
                    fiveYearInspectionDate: foundShip.fiveYearInspectionDate,
                    sponsonSerialNumber: foundShip.sponsonSerialNumber,
                    SRBSerialNumber: foundShip.SRBSerialNumber,
                    fuelTankSerialNumber: foundShip.fuelTankSerialNumber,
                    ZAPR356C2BVMXHookSerialNumber: foundShip.ZAPR356C2BVMXHookSerialNumber,
                    engineMakeModel: foundShip.engineMakeModel,
                    engineSerialNumber: foundShip.engineSerialNumber,
                    gear: foundShip.gear,
                    gearSerialNumber: foundShip.gearSerialNumber,
                    jet: foundShip.jet,
                    jetSerialNumber: foundShip.jetSerialNumber,
                    volvoQ0087: foundShip.volvoQ0087,
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
    const handleView = (pdf) => {
        window.open(`http://localhost:3001/${pdf.path}`, "_blank");
      }
      

    const handleSubmit = (e) => {
        e.preventDefault();
        updateShip({ variables: { shipId, ...formData } });
    };

    
    return (
        <div>
            <Link id="changeShipHome-link" to="/home"><i className="bi bi-house"></i></Link>
            <Link id='changeShipProfile-link' to="/profile"><i className="bi bi-person"></i></Link>
            <div id='shipInfo-section'>
            <div id='shipInfo-card' className='card'>
            {ship && (
                <div>
                    <h1 id='ship-name'>{ship.shipName} {ship.model} {ship._id}</h1>
                    <div id="ship-text">
                    <p>HIN: {ship.HIN}</p>
                    <p>HRN: {ship.HRN}</p>
                    <p>Contact Number: {ship.contactNumber}</p>
                    <p>Annaul Inspection Date: {ship.annualInspectionDate}</p>
                    <p>Five Year Insepction Cert: {ship.fiveYearInspectionCert}</p>
                    <p>Five Year Inspection Date: {ship.fiveYearInspectionDate}</p>
                    <p>Sponson Serial Number: {ship.sponsonSerialNumber}</p>
                    <p>SRB Serial Number: {ship.SRBSerialNumber}</p>
                    <p>Fuel Tank Serial Number: {ship.fuelTankSerialNumber}</p>
                    <p>ZAPR 356C2BVMX Hook Serial Number: {ship.ZAPR356C2BVMXHookSerialNumber}</p>
                    <p>Engine Make/Model: {ship.engineMakeModel}</p>
                    <p>Engine Serial Number: {ship.engineSerialNumber}</p>
                    <p>Gear: {ship.gear}</p>
                    <p>Gear Serial Number: {ship.gearSerialNumber}</p>
                    <p>Jet: {ship.jetSerialNumber}</p>
                    <p>Jet Serial Number: {ship.jetSerialNumber}</p>
                    <p>VolvoQ0087: {ship.volvoQ0087}</p>
                    <p>POC Name: {ship.POCName}</p>
                    <p>POC Email: {ship.POCEmail}</p>
                    <p>POC Phone Number: {ship.POCPhoneNumber}</p>
                    <ul>
            {ship.pdfs && ship.pdfs.length > 0 ? (
              ship.pdfs.map((pdf) => (
                <li key={pdf._id}>
                  <p>File Name: {pdf.fileName}</p>
                  <p>Path: {pdf.path}</p>
                </li>
              ))
            ) : (
              <p>No PDFs available for this ship.</p>
            )}
          </ul>
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
                        name="annaulInspectionDate"
                        value={formData.annualInspectionDate}
                        onChange={handleChange}
                    />
                    <label htmlFor='annualInspectionDate' className='form-label'>Annaul Inspection Date</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="fiveYearInspectionCert"
                        value={formData.fiveYearInspectionCert}
                        onChange={handleChange}
                    />
                    <label htmlFor='fiveYearInspectionCert' className='form-label'>Five Year Inspection Cert</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="fiveYearInspectionDate"
                        value={formData.fiveYearInspectionDate}
                        onChange={handleChange}
                    />
                    <label htmlFor='fiveYearInspectionDate' className='form-label'>Five Year Inspection Date</label>
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
                        name="gear"
                        value={formData.gear}
                        onChange={handleChange}
                    />
                    <label htmlFor='gear' className='form-label'>Gear</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="gearSerialNumber"
                        value={formData.gearSerialNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor='gearSerialNumber' className='form-label'>Gear Serial Number</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="jet"
                        value={formData.jet}
                        onChange={handleChange}
                    />
                    <label htmlFor='jet' className='form-label'>Jet</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="jetSerialNumber"
                        value={formData.jetSerialNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor='jetSerialNumber' className='form-label'>Jet Serial Number</label>
                    </div>
                    <div className='form-floating ms-3 me-3'>
                    <input
                    className='form-control'
                        type="text"
                        name="volvoQ0087"
                        value={formData.volvoQ0087}
                        onChange={handleChange}
                    />
                    <label htmlFor='volvoQ0087' className='form-label'>VolvoQ0087</label>
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


                


