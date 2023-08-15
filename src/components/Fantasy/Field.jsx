import React from "react";
import "./css/Field.css"
import {Button, ButtonGroup} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
//import manCityKit from "../../images/city_1.png"
import Arsenal from "../../images/kits/Arsenal.png"

const top = 20;
const left = 30.8;

function Field(props) {

    let location = useLocation();

    function createPlayerButton(player) {
       console.log(`team ${player.team}`);
       // const urlback = `url(../../images/kits/${player.kit}.png)`;
        //const urlback1 = "../../images/kits/Arsenal.png"
      //  console.log(urlback);
    
        return (
            <Button className="btnPlayerButton"  style={{ backgroundImage: `url(${Arsenal})`, backgroundSize: 'cover'}} key={player.id}>
                <h2>
                    {player.totalPoints}
                </h2>
                <h3>
                    {player.price}m
                </h3>
                <h1>
                    {player.playerName}
                </h1>

                {player === props.captain
                    ? <h4>C</h4>
                    : null}
            </Button>
        )
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