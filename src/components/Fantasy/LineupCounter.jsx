import {React} from "react";
import "./css/LineupCounter.css"
import { Button, ButtonGroup } from "react-bootstrap";

function LineupCounter(props){

    const lineup= "הרכב:";
    const maxPlayersInTeam = 11;
    const GK ="שוער";
    const DEF= "הגנה";
    const MID = "קישור";
    const FWD = "התקפה";

    const goalkeepers = props.lineup.filter((player) => player.position === 'GK');
    const defenders = props.lineup.filter((player) => player.position === 'DF');
    const midfielders = props.lineup.filter((player) => player.position === 'MF');
    const forwards = props.lineup.filter((player) => player.position === 'FW');

    return (
        <div className="lineup-counter-container"> 
        <Button className="lineup-counter" style={{/*unicodeBidi:'plaintext'*/}}> {lineup} {props.lineup.length}/{maxPlayersInTeam}</Button>
                
        </div>
    )
}

export default LineupCounter;