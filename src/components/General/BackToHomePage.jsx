import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/BackToHomePage.css";

function BackToHomePage(props)
{
    return (
        <div className="homepage-img-container">
            <Link to="/" style={{ textDecoration: "none" }}>
            <Button className="btnBackToHomePage" style={props.style} />
            </Link>
         </div>
    )
}

export default BackToHomePage;