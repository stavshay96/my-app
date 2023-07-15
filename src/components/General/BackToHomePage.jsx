import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./BackToHomePage.css"

function BackToHomePage(props)
{
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button className="btnBackToHomePage" style={props.style} />
         </Link>
    )
}

export default BackToHomePage;