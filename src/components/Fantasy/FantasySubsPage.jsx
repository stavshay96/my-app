import {React, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation , useNavigate } from "react-router-dom";
import { browserHistory } from 'react-router';
import Button from 'react-bootstrap/Button';
import { useStateWithCallback } from "../../useStateWithCallBack"
import "./css/Fantasy.css";
import LangBar from "../General/LangBar"
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
import LineupCounter from "./LineupCounter";
import Rules from "./Rules";




const FantasySubsPage = (props) => {
    let navigate = useNavigate();
    const location = useLocation();

  
    useEffect(() => {
      if (location.pathname === '/Fantasy/subs') {
        console.log('FantasySubsPage is rendering');
        console.log(`isDeadLineDatePass: ${props.isDeadLineDatePass}`);
        if (props.isDeadLineDatePass === true) {
          alert('חלון החילופים סגור! לא ניתן לבצע חילופים');
          navigate('/Fantasy', { replace: false });
        }
      }
    }, [location.pathname, props.isDeadLineDatePass]);

    return(
        <div>
            <LangBar/> 
            <FantasyDeadLine deadLineDate={props.deadLineDate} handleIsDeadLineDatePass={props.handleIsDeadLineDatePass}  />
            <PlayersList lineup={props.lineup} onCheckBoxChange={props.handleLineup} />
            <TopBar currentBudget={props.currentBudget} onCalcBudget={props.handleBudget} lineup={props.lineup}
                currentSubs={props.currentSubs} onCountingSubs={props.handleSubs}/>
            <LineupCounter lineup={props.lineup}/>
            <Field lineup={props.lineup} onRemoveButton={props.handleLineup} captain={props.captain}/>
            <SpecialChips/> 
            <SubmitAndReset lineup={props.lineup} isDeadLineDatePass={props.isDeadLineDatePass} />
            <InfoAndFantasyOptions/>
            <MatchesList/>
            <Captain lineup={props.lineup} captain={props.captain} onChangeCaptain={props.handleCaptain}/>
            <Rules/>
            <BackToHomePage style={{position:'fixed', top:'4.5%', right:'3%', width:'4.5%',  
                      backgroundSize: "cover",
                    backgroundPosition: '0vw 0.1vw', }}/>
            <img className= "fantasy-logo" src={require('../../images/FantasyLogo.png')}/>
           
        </div>
    )
}

export default FantasySubsPage;