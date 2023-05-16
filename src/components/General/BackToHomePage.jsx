import React from "react";
import { Button } from "react-bootstrap";
import "./BackToHomePage.css"

function BackToHomePage(props)
{
    return (
        <Button className="btnBackToHomePage" style={props.style} />
     
    )
}

export default BackToHomePage;