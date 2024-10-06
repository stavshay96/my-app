/* eslint-disable react-hooks/exhaustive-deps */
import {React, useEffect} from "react";
import {Button} from "react-bootstrap";
import "./css/LineupByFixture.css"

function LineupByFixture(props) {
    const leftArrow = "<";
    const rightArrow = ">";
    const gameweek = "מחזור ";
    const limitMaxGameWeek = props.currentGameweek;
    let limitMinGameWeek = props.fantasyUser
        ? props.fantasyUser.startFromGameweek
        : 1;

    useEffect(() => {
        props.SetGameweekNumber(props.currentGameweek);
    }, [props.currentGameweek]);

    const increaseGameweek = () => {
        if (props.gameweekNumber < limitMaxGameWeek) {
            props.SetGameweekNumber(props.gameweekNumber + 1);
            props.SetisThisGameweek((props.gameweekNumber + 1) === props.currentGameweek)
            props.handleLineup(props.fantasyUser.lineupsArr[props.gameweekNumber])
            props.handleCaptain(props.fantasyUser.captain[props.gameweekNumber])
        }
    }
    const decreaseGameweek = () => {
        if (props.gameweekNumber > limitMinGameWeek) {
            props.SetGameweekNumber(props.gameweekNumber - 1);
            props.SetisThisGameweek((props.gameweekNumber - 1) === props.currentGameweek)
            props.handleLineup(props.fantasyUser.lineupsArr[props.gameweekNumber - 2])
            props.handleCaptain(props.fantasyUser.captain[props.gameweekNumber - 2])
        }
    }

    return (
        <div className="lineupByFixture-container">
            <Button className="btnLeftArrowFixture" onClick={increaseGameweek}>
                <span>
                    {leftArrow}
                    {/*&#9664;*/}</span>
            </Button>
            <Button className="btnGameweekFixture">
                {gameweek}
                {props.gameweekNumber}
            </Button>
            <Button className="btnRightArrowFixture" onClick={decreaseGameweek}>
                <span>{rightArrow} {/*&#9654;*/}</span>
            </Button>
        </div>
    )
}

export default LineupByFixture;