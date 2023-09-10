import {React, useState,useEffect} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import "./css/LineupByFixture.css"

function LineupByFixture(props) {

    const [gameweekNumber,
        SetGameweekNumber] = useState(1);
    const gameweek = "מחזור ";
    const limitMaxGameWeek = props.numOfGames;
    let   limitMinGameWeek = props.fantasyUser? props.fantasyUser.startFromGameweek: 1;

    useEffect(() => {
        SetGameweekNumber(props.currentGameweek);
     }, [props.currentGameweek]);

    const increaseGameweek = () =>{
        if (gameweekNumber < limitMaxGameWeek) {
            SetGameweekNumber(gameweekNumber+1);
        }
    }
    const decreaseGameweek = () =>{
        if (gameweekNumber > limitMinGameWeek) {
            SetGameweekNumber(gameweekNumber-1);
        }
    }

    return (
        <div>
            <ButtonGroup
                style={{
                position: 'fixed',
                bottom: '3%',
                right: '23.6%',
                unicodeBidi: 'plaintext',
                width: '35%'
            }}>
                <Button className="btnLeftArrowFixture" onClick={increaseGameweek}>
                    <span>&#9664;</span>
                </Button>
                <Button className="btnGameweekFixture">
                    {gameweek} 
                    {gameweekNumber}
                </Button>
                <Button className="btnRightArrowFixture" onClick={decreaseGameweek}>
                    <span>&#9654;</span>
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default LineupByFixture;