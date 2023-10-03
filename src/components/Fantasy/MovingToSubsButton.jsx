import React from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./css/MovingToSubsButton.css"

function MovingToSubsButton(props) {
    let navigate = useNavigate();

    const buttonClass = !props.isThisGameweek ? 'disabledbtnMovingToSubs' : 'btnMovingToSubs';

    const movingToSubsHandler = () => {
        if (props.isDeadLineDatePass === false) {
            window.history.pushState({ navigationDirection: "back" }, "", `/Fantasy/${props.leagueChoice}`);
            navigate(`/Fantasy/${props.leagueChoice}/subs`, {replace:false });
        } else {
            alert("חלון החילופים סגור! לא ניתן לבצע חילופים");
        }

    }

    return (
        <Button
            className={buttonClass}
            style={{
            position: 'fixed',
            top: '84.25%',
            left: '43.5%'
        }}
            onClick={movingToSubsHandler}
            disabled = {!props.isThisGameweek}>
            בצע חילופים
        </Button>
    )
}

export default MovingToSubsButton;