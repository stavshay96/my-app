import React from "react";
import "./css/Field.css"
import {Button, ButtonGroup} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
//import manCityKit from "../../images/city_1.png"
//import Arsenal from "../../images/kits/Arsenal.png"

const top = 20;
const left = 30.8;

// Create a function to require all images from a directory
function importAll(r) {
    let images = {};
    r.keys().forEach(key => {
      images[key] = r(key);
    });
    return images;
  }

  // Import all images from the kits directory
const kitImages = importAll(require.context('../../images/kits/', false, /\.(png|jpg|jpeg|gif)$/));

function Field(props) {

    let location = useLocation();
    const showButton = location.pathname === `/Fantasy/${props.leagueChoice}/subs`;

    function createPlayerButton(player) {
       //console.log(`team ${player.kit}`);
       // const urlback = `url(../../images/kits/${player.kit}.png)`;
        //const urlback1 = "../../images/kits/Arsenal.png"
      //  console.log(urlback);
      const TeamNameWithoutSpaces = player.kit.replace(/ /g, '');
     // const teamName = "ManCity";
       const teamKit = kitImages[`./${TeamNameWithoutSpaces}.png`];
        return (
            <Button className="btnPlayerButton"  style={{ backgroundImage: `url(${teamKit})`, backgroundSize: 'cover'}} key={player.id}>
                <h2>
                    {player.totalPoints}
                </h2>
                <h3>
                    {player.price}m
                </h3>
                <h1>
                    {player.playerHebName}
                </h1>

                {props.captain && player.id === props.captain.id
                    ? <h4>C</h4>
                    : null}
                {showButton && <Button className="Xbtn" onClick={() => handleXbutton(player)}> x </Button>}
            </Button>
        )
    }

    const handleXbutton = (chosenPlayer) => {
       // alert(`${player.playerName}  button ${player.id}`);
        console.log(chosenPlayer);
        const newSelectedPlayers = props.lineup.filter((player) => player !== chosenPlayer);
        const updatedIDArray = newSelectedPlayers.map((player) => player.id);
        console.log(newSelectedPlayers);
        console.log(updatedIDArray);
        props.onRemoveButton(newSelectedPlayers);
        props.onChangeSelectedRows(updatedIDArray);
        if(chosenPlayer === props.captain) {
            props.onChangeCaptain(undefined);
        }


    }

    const goalkeepers = props
        .lineup
        .filter((player) => player.position === 'GK');
    const defenders = props
        .lineup
        .filter((player) => player.position === 'DF');
    const midfielders = props
        .lineup
        .filter((player) => player.position === 'MF');
    const forwards = props
        .lineup
        .filter((player) => player.position === 'FW');

    return (
        <div>
            <img className="field-img" src={require('../../images/field5.png')}/>
            <ButtonGroup style={getButtonStyle(top)}>
                {goalkeepers.map(createPlayerButton)}
            </ButtonGroup>

            <ButtonGroup style={getButtonStyle(top + 15)}>
                {defenders.map(createPlayerButton)}
            </ButtonGroup>

            <ButtonGroup style={getButtonStyle(top + 31)}>
                {midfielders.map(createPlayerButton)}
            </ButtonGroup>

            <ButtonGroup style={getButtonStyle(top + 47)}>
                {forwards.map(createPlayerButton)}
            </ButtonGroup>
        </div>
    )
}

const getButtonStyle = (topAdjustment) => {
    return {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'fixed',
        top: `${topAdjustment}%`,
        left: `${left}%`,
        width: '40%'
    };
}

export default Field;