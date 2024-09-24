import React from 'react';
import { Link } from "react-router-dom";


export default function LinkBar() {
    return (
        <div>
            <Link id='homeLink' to="/home"><i className="bi bi-house"></i></Link>
            <Link id='profileLink' to="/profile"><i className="bi bi-person"></i></Link>
    </div>
    );
}