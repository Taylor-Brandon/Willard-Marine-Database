import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_SHIP } from "../../utils/mutations";
import "../../styles/style.css";

export default function AddShip() {
    const [formState, setFormState] = useState({
        shipName: '',
        model: '',
        HRN: '',
        HIN: '',
        contactNumber: '',
        annaulInspectionDate: '',
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

    const [addShip, { error, data }] = useMutation(ADD_SHIP);


    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await addShip({
            variables: { ...formState },
        });
        console.log("Mutation successful:", data.addShip);
  navigate("/home");
      } catch (e) {
        console.error(e);
        }
      };

        return(
            <card id='ship-form'>
                  <form className="form w-25" onSubmit={handleFormSubmit}>
                    <div className="input-fields">
                <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.shipName}
                    name="shipName"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Ship Name"
                  />
                  <label htmlFor="shipName" className="form-label">
                    Ship Name
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.model}
                    name="model"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Model"
                  />
                  <label htmlFor="model" className="form-label">
                    model
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.HRN}
                    name="HRN"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="HRN"
                  />
                  <label htmlFor="HRN" className="form-label">
                    HRN
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.HIN}
                    name="HIN"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="HIN"
                  />
                  <label htmlFor="HIN" className="form-label">
                    HIN
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.contactNumber}
                    name="contactNumber"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Contact Number"
                  />
                  <label htmlFor="contactNumber" className="form-label">
                    Contact Number
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.annaulInspectionDate}
                    name="annualInspectionDate"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="annaulInspectionDate"
                  />
                  <label htmlFor="annaulInspectionDate" className="form-label">
                    Annaul Inspection Date
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.fiveYearInspectionCert}
                    name="fiveYearInspectionCert"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="fiveYearInspectionCert"
                  />
                  <label htmlFor="fiveYearInspectionCert" className="form-label">
                    Five Year Inspection Cert
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.fiveYearInspectionDate}
                    name="fiveYearInspectionDate"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="fiveYearInspectionDate"
                  />
                  <label htmlFor="fiveYearInspectionDate" className="form-label">
                    Five Year Inspection Date
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.sponsonSerialNumber}
                    name="sponsonSerialNumber"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Sponson Serial Number"
                  />
                  <label htmlFor="sponsonSerialNumber" className="form-label">
                    Sponson Serial Number
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.SRBSerialNumber}
                    name="SRBSerialNumber"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="SRB Serial Number"
                  />
                  <label htmlFor="SRBSerialnumber" className="form-label">
                    SRB Serial Number
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.fuelTankSerialNumber}
                    name="fuelTankSerialNumber"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Fuel Tank Serial Number"
                  />
                  <label htmlFor="fuelTankSerialNumber" className="form-label">
                    Fuel Tank Serial Number
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.ZAPR356C2BVMXHookSerialNumber}
                    name="ZAPR356C2BVMXHookSerialNumber"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="ZAPR356C2BVMXHookSerialNumber"
                  />
                  <label htmlFor="ZAPR356C2BVMXHookSerialNumber" className="form-label">
                  ZAPR356C2BVMXHookSerialNumber
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.engineMakeModel}
                    name="engineMakeModel"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Engine Make/Model"
                  />
                  <label htmlFor="engineMakeModel" className="form-label">
                    Engine Make/Model
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.engineSerialNumber}
                    name="engineSerialNumber"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Engine Serial Number"
                  />
                  <label htmlFor="engineSerialNumber" className="form-label">
                    Engine Serial Number
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.gear}
                    name="gear"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="gear"
                  />
                  <label htmlFor="gear" className="form-label">
                    Gear
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.gearSerialNumber}
                    name="gearSerialNumber"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="gearSerialNumber"
                  />
                  <label htmlFor="gearSerialNumber" className="form-label">
                    Gear Serial Number
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.jet}
                    name="jet"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="jet"
                  />
                  <label htmlFor="jet" className="form-label">
                    Jet
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.jetSerialNumber}
                    name="jetSerialNumber"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="jetSerialNumber"
                  />
                  <label htmlFor="jetSerialNumber" className="form-label">
                    Jet Serial Number
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.volvoQ0087}
                    name="volvoQ0087"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="volvoq0087"
                  />
                  <label htmlFor="volvoQ0087" className="form-label">
                   VolovQ0087
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.POCName}
                    name="POCName"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="POC Name"
                  />
                  <label htmlFor="pocName" className="form-label">
                    POC Name
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.POCEmail}
                    name="POCEmail"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="POC Email"
                  />
                  <label htmlFor="pocEmail" className="form-label">
                    POC Email
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.POCPhoneNumber}
                    name="POCPhoneNumber"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="POC Phone Number"
                  />
                  <label htmlFor="pocPhoneNumbber" className="form-label">
                    POC Phone Number
                  </label>
                  </div>
                  <div className="form-floating">
                  <input
                    className="form-control"
                    value={formState.notes}
                    name="notes"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Notes"
                  />
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  </div>
                  </div>
                  <button id="shipForm-btn" className="btn mx-auto" type="submit">Submit</button>
                  </form>
                  </card>
        )
      }