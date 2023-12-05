import {React, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/Fantasy.css";
import LangBar from "../General/LangBar"
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
import MyLeagues from "./MyLeagues";
import LogOut from "../HomePage/LogOut";
import Login from "../HomePage/Login";
import FantasyTeamNamePopup from "./FantasyTeamNamePopup";

const FantasyHomePage = (props) => {
    const [isThisGameweek,SetisThisGameweek] = useState(true);
    const user = document.cookie;
    console.log(`${user} user info`);
    console.log(`${props.leagueChoice} fantasyhomepage`);

    return(
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '150vh'}}>
            <LangBar/> 
            <FantasyDeadLine deadLineDate={props.deadLineDate} handleIsDeadLineDatePass={props.handleIsDeadLineDatePass}  />
            <TopBar currentBudget={props.currentBudget} onCalcBudget={props.handleBudget} lineup={props.lineup} leagueChoice={props.leagueChoice}
                        currentSubs={props.currentSubs} onCountingSubs={props.handleSubs}  topbarLeagueName={props.topbarLeagueName} 
                        budgetLimit={props.budgetLimit} subsLimit={props.subsLimit}  SetSubsLimit={props.SetSubsLimit} fantasyUser={props.fantasyUser}  currentGameweek={props.currentGameweek}/>
            <Field lineup={props.lineup} onRemoveButton={props.handleLineup} captain={props.captain} leagueChoice={props.leagueChoice}/>
            <InfoAndFantasyOptions/>
            <MatchesList currentGameweek={props.currentGameweek} numOfGames={props.numOfGames}/>
            <LineupByFixture currentGameweek={props.currentGameweek} numOfGames={props.numOfGames} fantasyUser={props.fantasyUser} 
            handleLineup={props.handleLineup} handleCaptain={props.handleCaptain} isThisGameweek={isThisGameweek} SetisThisGameweek={SetisThisGameweek}/>
            <MovingToSubsButton isDeadLineDatePass={props.isDeadLineDatePass} leagueChoice={props.leagueChoice} isThisGameweek={isThisGameweek}/>
            <MyLeagues/>
            <Rules/>
            <BackToHomePage style={{position:'absolute', top:'5.5%', right:'3%', width:'4.5%',  
                  backgroundSize: "cover", zIndex: '1',
                backgroundPosition: '0vw 0.1vw', }}/>
            <img className= "fantasy-logo" src={require('../../images/FantasyLogo.png')}/>
            {user? <LogOut userInfo={props.userInfo} changeUserInfo={props.WrapUserInfo}
                                  h1style={{position:'absolute', top:'4.35%', right:'7.75%' ,fontSize:'1.3vw', textShadow: "0vw 0.05vw 0vw"}}
                                  btnstyle={{position:'absolute', top:'11%',left:'69%'}}
                                  imgstyle={{position:'absolute', top:'4.5%', left:'70.5%' }}/> : <Login changeUserInfo={props.WrapUserInfo}/>}

            {user && <FantasyTeamNamePopup userInfo={props.userInfo} fantasyUser={props.fantasyUser} SetFantasyUser={props.SetFantasyUser}
                         numOfGames={props.numOfGames} currentGameweek={props.currentGameweek} leagueID= {props.leagueID}
                         leagueChoice={props.leagueChoice} fantasyType={props.fantasyType}/> }
        </div>
    )
}

export default FantasyHomePage;