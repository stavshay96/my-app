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
        <div>
            <ButtonGroup style={{position:'absolute', top:'14%', right:'6.5%', width:'30%', }}>
                <ul>
                <li>  <Button className="btnItems2" style={{unicodeBidi:'plaintext'}}> {lineup} {props.lineup.length}/{maxPlayersInTeam}</Button></li>
                <li>  <Button className="btnItems2" style={{unicodeBidi:'plaintext',}}>{goalkeepers.length} {GK}</Button></li>
                <li>  <Button className="btnItems2" style={{unicodeBidi:'plaintext',}}>{defenders.length} {DEF}</Button></li>
                <li>  <Button className="btnItems2" style={{unicodeBidi:'plaintext',}}>{midfielders.length} {MID}</Button></li>
                <li>  <Button className="btnItems2" style={{unicodeBidi:'plaintext',}}>{forwards.length} {FWD}</Button></li>
                </ul>
            </ButtonGroup>
        </div>
    )
}

export default LineupCounter;