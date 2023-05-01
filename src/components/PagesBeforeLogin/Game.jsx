import {React, useState} from "react";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";

import "./Game.css";



function Game(props){
      let navigate = useNavigate();
      const GameHandler = () =>
      {
            console.log(`${props.gameID}`);
            console.log(`${props.name}`);

            if(props.gameID === 1) {
                navigate("/Fantasy", { replace: true })
                //window.location.reload(true);
            }
            else if(props.gameID === 2) {
                  navigate("/NotReadyYet", { replace: true })
            }
            else if(props.gameID === 3) {
                  navigate("/NotReadyYet", { replace: true })
            }
      }
    
   return(
            <Button className="btnGame" variant="primary" style={props.style} onClick={GameHandler}>
                  {props.name}
            </Button>
      )
}

export default Game;