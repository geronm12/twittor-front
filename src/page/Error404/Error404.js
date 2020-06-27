import React from 'react';
import {Link} from "react-router-dom";
import Error from "../../assets/png/error404.png";
import Logo from "../../assets/png/logo.png";

import "./Error404.scss";


export default function Error404() {
    return (
        <div className="error404">
            <img src={Logo} alt="Twittor" />
            <img src={Error} alt="Error404"/>
            <Link to="/"> Volver al inicio </Link> 
        </div>
    )
}
