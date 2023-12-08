import {React, useState} from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import "./css/Game.css";
import Popup from 'reactjs-popup';
import FantasyLeagues from "./data/FantasyLeagues";
import PredictionsLeagues from "./data/PredictionsLeagues";
import AdditionalGames from "./data/AdditionalGames";



function Game(props) {
    const [hoverLeague, setHoverLeague] = useState(null);
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

        const buttonClass = league.isButtonDisabled ? 'disabledBtnleagues' : 'btnleagues';

        const buttonStyles = {
            backgroundImage: hoverLeague === league.name ? `url(${league.flag})` : '',
            color: league.isButtonDisabled ? 'grey' : 'inherit', // Apply grey color if disabled
            cursor: league.isButtonDisabled ? 'default' : 'pointer' // Apply default cursor if disabled
        };
    
        return (
            <tr>
                <td className="tdleagues">
                <Button 
                className={buttonClass} 
                disabled={league.isButtonDisabled}
                style={buttonStyles}
                onMouseEnter={() => setHoverLeague(league.name)}
                onMouseLeave={() => setHoverLeague(null)}
                onClick={() => GameHandler(league.pathName, league.name)}
                key={league.leagueID}>
                {league.name}
                </Button>
                </td>
            </tr>
            
        )
    }


    const GameHandler = (pathName, leagueName) => {
        console.log(`${props.gameID}`);
        console.log(`${props.name}`);
        console.log(`${props.userInfo["fullName"]} full name`);
       // const fantasyLeague = path;
        props.SetLeagueChoice(pathName);
        props.SetTopbarLeagueName(leagueName);

        if (props.gameID === 1) {
            props.userInfo["email"] === "pendel@gmail.com"?
            navigate(`/Fantasy/${pathName}/admin`, {replace: false}) :
            navigate(`/Fantasy/${pathName}`, {replace: false}) ;
            //const originalBackground = document.body.style.backgroundImage;

           /* return () => {
                document.body.style.backgroundImage = originalBackground;
            }*/
        }
        else if (props.gameID === 2) {
            props.userInfo["email"] === "pendel@gmail.com"?
            navigate(`/Predictions/${pathName}/admin`, {replace: false}) :
            navigate(`/Predictions/${pathName}`, {replace: false}) ;
        } else if (props.gameID === 3) {
            navigate("/NotReadyYet", {replace: false})
        }
    }

    return (
        <Popup trigger={handleTrigger}  modal open={open} onClick={()=>setOpen(true)} closeOnDocumentClick={false} >
            {close =>(<div>
            <Button className="close-btn" onClick={ close} style={{position:'fixed', top:'21%', right:'37%', fontSize: '1.25vw'}}>
            X 
            </Button>
            
            <table className="leaguesList" style={{ position:'fixed', top:'26%', right:'37%'}}>
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