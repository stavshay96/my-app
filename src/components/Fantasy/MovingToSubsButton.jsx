import React from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./css/MovingToSubsButton.css"

function MovingToSubsButton(props) {
    let navigate = useNavigate();

    const movingToSubsHandler = () => {
        if (props.isDeadLineDatePass === false) {
            navigate(`/Fantasy/${props.leagueChoice}/subs`, {replace:false });
        } else {
            alert("חלון החילופים סגור! לא ניתן לבצע חילופים");
        }

    }

    return (
        <Button
            className="btnMovingToSubs"
            style={{
            position: 'absolute',
            top: '84%',
            left: '43.5%'
        }}
            onClick={movingToSubsHandler}>
            בצע חילופים
        </Button>
    )
}

export default MovingToSubsButton;