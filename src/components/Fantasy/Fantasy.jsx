import {React, useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { browserHistory } from 'react-router';
import Button from 'react-bootstrap/Button';

import "./Fantasy.css";
import LangBar from "../HomePage/LangBar"
import FantasyDeadLine from "./FantasyDeadLine";
import PlayersList from "./PlayersList";
import TopBar from "./TopBar";
import Field from "./Field";
import SpecialChips from "./SpecialChips";
import InfoAndFantasyOptions from "./InfoAndFantasyOptions";
import MatchesList from "./MatchesList";
import BackToHomePage from "../General/BackToHomePage";
import HomePageImage from "../../images/HomePageImage.png"


const Fantasy = (props) => {

 

  return(
    <div>
        <LangBar/> 
        <FantasyDeadLine/>
        <PlayersList/>
        <TopBar/>
        <Field/>
        <SpecialChips/> 
        <InfoAndFantasyOptions/>
        <MatchesList/>
        <BackToHomePage style={{position:'fixed', top:'4.5%', right:'3%', width:'4.5%',  
          backgroundSize: "cover",
        backgroundPosition: '0vw 0.1vw', }}/>
        <img className= "fantasy-logo" src={require('../../images/FantasyLogo.png')}/>

    </div>
  )
}

export default Fantasy;
