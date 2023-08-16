import {React, useState} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import "./css/LineupByFixture.css"

function LineupByFixture() {

    const [gameweekNumber,
        SetGameweekNumber] = useState(25);
    const gameweek = "מחזור ";
    const limitGameWeek = 38;

    const increaseGameweek = () =>{
        if (gameweekNumber < limitGameWeek) {
            SetGameweekNumber(gameweekNumber+1);
        }
    }
    const decreaseGameweek = () =>{
        if (gameweekNumber > 0) {
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