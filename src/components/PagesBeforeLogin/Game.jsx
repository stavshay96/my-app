import {React, useState} from "react";
import Button from 'react-bootstrap/Button';

import "./Game.css";



function Game(props){
    
   return(
      <div>
            <Button className="btnGame" variant="primary" style={props.style}>{props.name}</Button>
      </div>)
}

export default Game;