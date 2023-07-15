import {React, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/Fantasy.css";
import LangBar from "../HomePage/LangBar"
import FantasyDeadLine from "./FantasyDeadLine";
import TopBar from "./TopBar";
import Field from "./Field";
import InfoAndFantasyOptions from "./InfoAndFantasyOptions";
import MatchesList from "./MatchesList";
import BackToHomePage from "../General/BackToHomePage";
import LineupCounter from "./LineupCounter";
import Rules from "./Rules";
import LineupByFixture from "./LineupByFixture";
import MovingToSubsButton from "./MovingToSubsButton";
import UserPoints from "./UserPoints";

const FantasyHomePage = (props) => {

    return(
        <div>
            <LangBar/> 
            <FantasyDeadLine/>
            <TopBar currentBudget={props.currentBudget} onCalcBudget={props.handleBudget} lineup={props.lineup}
                        currentSubs={props.currentSubs} onCountingSubs={props.handleSubs}/>
            <LineupCounter lineup={props.lineup}/>
            <Field lineup={props.lineup} onRemoveButton={props.handleLineup} captain={props.captain}/>
            <InfoAndFantasyOptions/>
            <MatchesList/>
            <LineupByFixture/>
            <UserPoints/>
            <MovingToSubsButton/>
            <Rules/>
            <BackToHomePage style={{position:'fixed', top:'4.5%', right:'3%', width:'4.5%',  
                  backgroundSize: "cover",
                backgroundPosition: '0vw 0.1vw', }}/>
            <img className= "fantasy-logo" src={require('../../images/FantasyLogo.png')}/>
        </div>
    )

}

export default FantasyHomePage;