import React from "react";
import "./css/Field.css"
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LineupCounter from "../field/LineupCounter";
import Captain from "../field/Captain";

// Create a function to require all images from a directory
function importAll(r) {
    let images = {};

    r.keys().forEach(key => {
            images[key] = r(key);
    });

    return images;
}

// Import all images from the kits directory
const kitImages = importAll(require.context('../../../images/kits', false, /\.(png|jpg|jpeg|gif)$/));

function Field(props) {

    let location = useLocation();
    const showButton = location.pathname === `/Fantasy/${props.leagueChoice}/subs`;

    function createPlayerButton(player) {
        const TeamNameWithoutSpaces = player.kit.replace(/ /g, '');
        const teamKit = kitImages[`./${TeamNameWithoutSpaces}.png`];
        const buttonStyles_h2 = {
            backgroundColor: player.currentPoints >= 0
                ? (player.currentPoints > 0
                    ? 'rgb(7, 86, 15)'
                    : 'rgb(80,80,80)')
                : 'rgb(255, 73, 73)'
        };

        return (
            <Button
                className="btnPlayerButton"
                style={{
                backgroundImage: `url(${teamKit})`,
                backgroundSize: 'cover'
            }}
                key={player.id}>
                <h2 style={buttonStyles_h2}>
                    {player.currentPoints}
                </h2>
                <h3>
                    {player.price}m
                </h3>
                <h1>
                    {player.playerHebName}
                </h1>

                {props.captain && player.id === props.captain.id
                    ? (props.fantasyUser.tripleUsedInGameweek !== props.gameweekNumber
                        ? <h4>C</h4>
                        : <h4>x3</h4>)
                    : null}
                {showButton && <Button className="Xbtn" onClick={() => handleXbutton(player)}>
                    x
                </Button>}
            </Button>
        )
    }

    const handleXbutton = (chosenPlayer) => {
        console.log(chosenPlayer);
        const newSelectedPlayers = props
            .lineup
            .filter((player) => player !== chosenPlayer);
        const updatedIDArray = newSelectedPlayers.map((player) => player.id);
        console.log(newSelectedPlayers);
        console.log(updatedIDArray);
        props.onRemoveButton(newSelectedPlayers);
        props.onChangeSelectedRows(updatedIDArray);
        if (chosenPlayer === props.captain) {
            props.onChangeCaptain(undefined);
        }
    }

    const goalkeepers = props.lineup.filter((player) => player.position === 'GK');
    const defenders = props.lineup.filter((player) => player.position === 'DF');
    const midfielders = props.lineup.filter((player) => player.position === 'MF');
    const forwards = props.lineup.filter((player) => player.position === 'FW');

    return (
        <div className="field-container">
            <img className="field-img" src={require('../../../images/field5.png')} alt=""/> {showButton && <LineupCounter lineup={props.lineup}/>}
            <div className="goalkeepers-group">
                {goalkeepers.map(createPlayerButton)}
            </div>

            <div className="defenders-group">
                {defenders.map(createPlayerButton)}
            </div>

            <div className="midfielders-group">
                {midfielders.map(createPlayerButton)}
            </div>

            <div className="forwards-group">
                {forwards.map(createPlayerButton)}
            </div>
            {showButton && <Captain
                lineup={props.lineup}
                captain={props.captain}
                onChangeCaptain={props.onChangeCaptain}/>}
        </div>
    )
}

export default Field;