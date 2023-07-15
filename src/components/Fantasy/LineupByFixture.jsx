import {React, useState} from "react";
import { Button,ButtonGroup } from "react-bootstrap";
import "./css/LineupByFixture.css"

function LineupByFixture()
{

    const [gameweekNumber,SetGameweekNumber] = useState(25);
    const gameweek = "מחזור";
 return (
    <div>
        <ButtonGroup style={{position:'fixed',  bottom:'3.5%', right:'23.6%', unicodeBidi:'plaintext', width:'35%' }}>
                <Button className= "btnLeftArrowFixture"> <span>&#9664;</span></Button>
                <Button className= "btnGameweekFixture"> {gameweek} {gameweekNumber} </Button>
                <Button className= "btnRightArrowFixture"><span>&#9654;</span></Button>
        </ButtonGroup>
    </div>
 )
}

export default LineupByFixture;