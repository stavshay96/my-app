import {React, useState} from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import "./css/Game.css";
import Popup from 'reactjs-popup';
import FantasyLeagues from "./data/FantasyLeagues";
import PredictionsLeagues from "./data/PredictionsLeagues";
import AdditionalGames from "./data/AdditionalGames";

import EnglandFlag from '../../images/Flags/England.png';
import ChampionsLeagueFlag from '../../images/Flags/ChampionsLeague.png';
import IsraelFlag from '../../images/Flags/Israel.png';
import ItalyFlag from '../../images/Flags/Italy.png';
import SuperLeagueFlag from '../../images/Flags/SuperLeague.png';
import CustomLeagueFlag from '../../images/Flags/CustomLeague.png';

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
        let flag;
        switch(league.name) {
            case 'פרמייר ליג': flag = EnglandFlag; break;
            case 'ליגת האלופות': flag = ChampionsLeagueFlag; break;
            case 'ליגת העל': flag = IsraelFlag; break;
            case 'ליגה איטלקית': flag = ItalyFlag; break;
            case 'סופרליג': flag = SuperLeagueFlag; break;
            case 'ליגה מותאמת אישית': flag = CustomLeagueFlag; break;
            default: flag = null;
        }
    
        return (
            <tr>
                <td className="tdleagues">
                <Button 
                className="btnleagues" 
                style={{backgroundImage: hoverLeague === league.name ? `url(${flag})` : ''}}
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
       // const fantasyLeague = path;
        props.SetLeagueChoice(pathName);
        props.SetTopbarLeagueName(leagueName);

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