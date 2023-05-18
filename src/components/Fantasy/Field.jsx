import React from "react";
import Image from 'react-bootstrap/Image'
import "./Field.css"
import { Button, ButtonGroup } from "react-bootstrap";


const top = 17;
const  left = 48;

function createPlayerButton(player)
{
    return (
        <Button className="btnPlayerButton" >
            <h1>{player.playerName}</h1>
        </Button>
    )
}

function Field(props)
{
   
    const goalkeepers = props.lineup.filter((player) => player.position === 'GK');
    const defenders = props.lineup.filter((player) => player.position === 'DF');
    const midfielders = props.lineup.filter((player) => player.position === 'MF');
    const forwards = props.lineup.filter((player) => player.position === 'FW');
    return (
        <div>
        <img className="field-img" src={require('../../images/field5.png')}/>
        <ButtonGroup style={{position:'fixed', top:`${top}%`, left:`${left}%`, width:'30%', }}>
            {goalkeepers.map(createPlayerButton)}
        </ButtonGroup>

        <ButtonGroup style={getButtonDEFStyle(defenders)}>
            {defenders.map(createPlayerButton)}
        </ButtonGroup>

        <ButtonGroup style={getButtonMIDStyle(midfielders)}>
            {midfielders.map(createPlayerButton)}
        </ButtonGroup>

        <ButtonGroup style={getButtonFWDStyle(forwards)}>
            {forwards.map(createPlayerButton)}
        </ButtonGroup>
        </div>
    )
}

const getButtonDEFStyle = (defenders) => {
    const topDEF = top+15;
    switch (defenders.length) {
    
      case 1:
        return {position:'fixed', top:`${topDEF}%`, left:`${left}%`, width:'40%',};;
      case 2:
        return {position:'fixed', top:`${topDEF}%`, left:`${left-2.5}%`, width:'40%',};;
      case 3:
        return  {position:'fixed', top:`${topDEF}%`, left:`${left-5}%`, width:'40%', };
      case 4:
        return{position:'fixed', top:`${topDEF}%`, left:`${left-8.5}%`, width:'40%', };
      case 5:
        return {position:'fixed', top:`${topDEF}%`, left:`${left-11.5}%`, width:'40%', };  
      default:
        return {};
    }
  };

  const getButtonMIDStyle = (midfielders) => {
    const topMid = top+34;

    switch (midfielders.length) {
        case 1:
            return {position:'fixed', top:`${topMid}%`, left:`${left+0.5}%`, width:'30%',};;
          case 2:
            return {position:'fixed', top:`${topMid}%`, left:`${left-1.7}%`, width:'30%',};;
          case 3:
            return  {position:'fixed', top:`${topMid}%`, left:`${left-4}%`, width:'30%',};
      case 4:
        return{position:'fixed', top:`${topMid}%`, left:`${left-7.8}%`, width:'40%', marginright: '10px', };
      case 5:
        return  {position:'fixed', top:`${topMid}%`, left:`${left-11.7}%`, width:'40%',}; 
      default:
        return {};
    }
  };

  const getButtonFWDStyle = (forwards) => {

    const topFWD = top+55;
    switch (forwards.length) {
      case 1:
        return {position:'fixed', top:`${topFWD}%`, left:`${left}%`, width:'40%'};
      case 2:
        return {position:'fixed', top:`${topFWD}%`, left:`${left-3}%`, width:'40%'};
      case 3:
        return {position:'fixed', top:`${topFWD}%`, left:`${left-6.5}%`, width:'40%', };
      default:
        return {};
    }
  };






export default Field;