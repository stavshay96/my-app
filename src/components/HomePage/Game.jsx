import {React, useState} from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import "./css/Game.css";
import Popup from 'reactjs-popup';
import FantasyLeagues from "./data/FantasyLeagues";
import PredictionsLeagues from "./data/PredictionsLeagues";
import AdditionalGames from "./data/AdditionalGames";

function Game(props) {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleTrigger = () => {

        return (
            <Button
            className="btnGame"
            variant="primary"
            style={props.style}
           >
            {props.name}
        </Button>
        )
    }

    const createButtonLeague = (league) =>{
        return (
            <tr>
                <td className="tdleagues">
                <Button className="btnleagues" onClick={()=> GameHandler(league.pathName)} key={league.leagueID}>
            {league.name}
            </Button>
                </td>
            </tr>
            
        )
    }

    const ShowListOfGames = () =>{
        if (props.gameID === 1) {
            return FantasyLeagues.map(createButtonLeague);
        } else if (props.gameID === 2) {
            return PredictionsLeagues.map(createButtonLeague);
        } else if (props.gameID === 3) {
            return AdditionalGames.map(createButtonLeague);
        }
    }

    const GameHandler = (pathName) => {
        console.log(`${props.gameID}`);
        console.log(`${props.name}`);
       // const fantasyLeague = path;
        props.SetLeagueChoice(pathName);

        if (props.gameID === 1) {
            navigate(`/Fantasy/${pathName}`, {replace: true});
            const originalBackground = document.body.style.backgroundImage;

            return () => {
                document.body.style.backgroundImage = originalBackground;
            }
        } else if (props.gameID === 2) {
            navigate("/NotReadyYet", {replace: false})
        } else if (props.gameID === 3) {
            navigate("/NotReadyYet", {replace: false})
        }
    }

    return (
        <Popup trigger={handleTrigger}  modal open={open} onClick={()=>setOpen(true)} closeOnDocumentClick={false} >
            {close =>(<div>
            <Button className="close-btn" onClick={ close} style={{position:'fixed', top:'25%', right:'37%', fontSize: '1.25vw'}}>
            X 
            </Button>
            
            <table className="leaguesList" style={{ position:'fixed', top:'30%', right:'37%'}}>
                <tbody>
                {props.gameID === 1? FantasyLeagues.map(createButtonLeague):
                 (props.gameID === 2? PredictionsLeagues.map(createButtonLeague): AdditionalGames.map(createButtonLeague))}
                   
                </tbody>
            </table>
           
           
            </div>
            )}
        </Popup>
      
    )
}

export default Game;