import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/MovingToSubsButton.css"

function MovingToSubsButton()
{
    return (
        <Link to="subs" style={{ textDecoration: "none" }}>
            <Button  className="btnMovingToSubs"  style= {{position:'fixed', top:'30%', left:'3%'}}>
            בצע חילופים
            </Button>  
        </Link>
)
}

export default MovingToSubsButton;