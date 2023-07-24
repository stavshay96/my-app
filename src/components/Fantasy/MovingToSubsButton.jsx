import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./css/MovingToSubsButton.css"

function MovingToSubsButton(props)
{
    let navigate = useNavigate();

    const movingToSubsHandler = () => {
        if (props.isDeadLineDatePass === false)
        {
            navigate("/Fantasy/subs", { replace: true });
        }
        else
        {
            alert("חלון החילופים סגור! לא ניתן לבצע חילופים");
        }

    }


    return (
            <Button  className="btnMovingToSubs"  style= {{position:'fixed', top:'30%', left:'7%'}} onClick={movingToSubsHandler}>
            בצע חילופים
            </Button>  
)
}

export default MovingToSubsButton;