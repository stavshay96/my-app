import React from "react";
import Image from 'react-bootstrap/Image'
import "./Field.css"
import { Button, ButtonGroup } from "react-bootstrap";


const top = 20;
const  left = 30.8;



function Field(props)
{
    function createPlayerButton(player)
    {
        return (
            <Button className="btnPlayerButton" >
                <h2>  {player.points} </h2>
                <h3>  {player.price}m </h3>
                <h1>  {player.playerName}  </h1>

                {player.id===props.captain.id?null:<h4>C</h4>}
            </Button>
        )
    }


    const goalkeepers = props.lineup.filter((player) => player.position === 'GK');
    const defenders = props.lineup.filter((player) => player.position === 'DF');
    const midfielders = props.lineup.filter((player) => player.position === 'MF');
    const forwards = props.lineup.filter((player) => player.position === 'FW');
    
    return (
        <div>
            <img className="field-img" src={require('../../images/field5.png')}/>
            <ButtonGroup style={getButtonStyle(top)}>
                {goalkeepers.map(createPlayerButton)}
            </ButtonGroup>

            <ButtonGroup style={getButtonStyle(top+15)}>
                {defenders.map(createPlayerButton)}
            </ButtonGroup>

            <ButtonGroup style={getButtonStyle(top+31)}>
                {midfielders.map(createPlayerButton)}
            </ButtonGroup>

            <ButtonGroup style={getButtonStyle(top+47)}>
                {forwards.map(createPlayerButton)}
            </ButtonGroup>
        </div>
    )
}

const getButtonStyle = (topAdjustment) =>{
    return {display: 'flex',flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start',
    position:'fixed', top:`${topAdjustment}%`, left:`${left}%`, width:'40%'};
}

export default Field;