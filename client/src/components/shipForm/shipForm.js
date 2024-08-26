import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_SHIP } from "../../utils/mutations";
import "../../styles/style.css";

export default function AddShip() {
    const [formState, setFormState] = useState({
        ship: '',
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
        Notes: '',
    });
}