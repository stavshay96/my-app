import {React, useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import Kane from "../../images/Players/Kane.png"

import "./Game.css";



function Game(props){
      let navigate = useNavigate();
      const GameHandler = () =>
      {
            console.log(`${props.gameID}`);
            console.log(`${props.name}`);

            if(props.gameID === 1) {
                navigate("/Fantasy", { replace: false });

               
                  const originalBackground =document.body.style.backgroundImage;
                 // document.body.style.backgroundImage=`url(${Kane})`;

                  return () =>{
                        document.body.style.backgroundImage = originalBackground;
                  }
              
         
                //window.location.reload(true);
            }
            else if(props.gameID === 2) {
                  navigate("/NotReadyYet", { replace: false })
            }
            else if(props.gameID === 3) {
                  navigate("/NotReadyYet", { replace: false })
            }
      }
    
   return(
            <Button className="btnGame" variant="primary" style={props.style} onClick={GameHandler}>
                  {props.name}
            </Button>
      )
}

export default Game;