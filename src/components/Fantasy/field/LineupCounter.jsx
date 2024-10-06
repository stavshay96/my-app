/* eslint-disable no-unused-vars */
import { React } from "react";
import { Button } from "react-bootstrap";
import "./css/LineupCounter.css"

function LineupCounter(props){

    const lineup= "הרכב:";
    const maxPlayersInTeam = 11;

    const goalkeepers = props.lineup.filter((player) => player.position === 'GK');
    const defenders = props.lineup.filter((player) => player.position === 'DF');
    const midfielders = props.lineup.filter((player) => player.position === 'MF');
    const forwards = props.lineup.filter((player) => player.position === 'FW');

    return (
        <div className="lineup-counter-container"> 
            <Button className="lineup-counter"> {lineup} {props.lineup.length}/{maxPlayersInTeam}</Button> 
        </div>
    )
}

export default LineupCounter;