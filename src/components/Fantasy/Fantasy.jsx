import {React, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { browserHistory } from 'react-router';
import Button from 'react-bootstrap/Button';
import { useStateWithCallback } from "../../useStateWithCallBack"

import "./Fantasy.css";
import LangBar from "../HomePage/LangBar"
import FantasyDeadLine from "./FantasyDeadLine";
import PlayersList from "./PlayersList";
import TopBar from "./TopBar";
import Field from "./Field";
import SpecialChips from "./SpecialChips";
import SubmitAndReset from "./SubmitAndReset";
import InfoAndFantasyOptions from "./InfoAndFantasyOptions";
import MatchesList from "./MatchesList";
import BackToHomePage from "../General/BackToHomePage";
import HomePageImage from "../../images/HomePageImage.png"
import Captain from "./Captain";


function getLineUp(){
  return [];
}

const Fantasy = (props) => {
    const [lineup, SetLineup] = useState(getLineUp);
    const [captain, SetCaptain] = useState('');

    const handleLineup = (lineup) => {
      SetLineup(lineup);
      console.log(`${lineup.length} fantasy`); 
    };
    
    const handleCaptain = (captain) => {
      SetCaptain(captain);
      console.log(`${captain.playerName} captain`); 
    };
 

  return(
    <div>
        <LangBar/> 
        <FantasyDeadLine/>
        <PlayersList  lineup={lineup} onCheckBoxChange={handleLineup} />
        <TopBar/>
        <Field lineup={lineup} onRemoveButton={handleLineup} captain={captain}/>
        <SpecialChips/> 
        <SubmitAndReset/>
        <InfoAndFantasyOptions/>
        <MatchesList/>
        <Captain lineup={lineup} captain={captain} onChangeCaptain={handleCaptain}/>
        <BackToHomePage style={{position:'fixed', top:'4.5%', right:'3%', width:'4.5%',  
          backgroundSize: "cover",
        backgroundPosition: '0vw 0.1vw', }}/>
        <img className= "fantasy-logo" src={require('../../images/FantasyLogo.png')}/>

    </div>
  )
}

export default Fantasy;
