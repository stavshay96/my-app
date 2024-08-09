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
import FantasyHeader from "./FantasyHeader";

const Logo = require("../../images/PendelLogo-removebg.png");

const FantasyHomePage = (props) => {
    const [isThisGameweek,SetisThisGameweek] = useState(true);
    const user = document.cookie;
    console.log(`${user} user info`);
    console.log(`${props.leagueChoice} fantasyhomepage`);
    console.log(props.gameweeksList);

    return(
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '210vh'}}>
            {/*<LangBar/> */}
            <FantasyHeader 
                userInfo={props.userInfo} 
                WrapUserInfo={props.WrapUserInfo} 
            />
            <InfoAndFantasyOptions
                leagueChoice={props.leagueChoice}/>
            <FantasyDeadLine
                deadLineDate={props.deadLineDate} 
                handleIsDeadLineDatePass={props.handleIsDeadLineDatePass} 
                fantasyUser={props.fantasyUser} />
            <TopBar
                currentBudget={props.currentBudget} 
                onCalcBudget={props.handleBudget} 
                lineup={props.lineup} 
                leagueChoice={props.leagueChoice}
                currentSubs={props.currentSubs} 
                onCountingSubs={props.handleSubs}  
                topbarLeagueName={props.topbarLeagueName} 
                budgetLimit={props.budgetLimit} 
                subsLimit={props.subsLimit}  
                SetSubsLimit={props.SetSubsLimit} 
                fantasyUser={props.fantasyUser} 
                currentGameweek={props.currentGameweek}
                fantasyType={props.fantasyType}
                gameweekNumber={props.gameweekNumber}/>
            <Field 
                lineup={props.lineup} 
                onRemoveButton={props.handleLineup} 
                captain={props.captain} 
                leagueChoice={props.leagueChoice}
                fantasyUser={props.fantasyUser}
                currentGameweek={props.currentGameweek}
                gameweekNumber={props.gameweekNumber}/>
            <MovingToSubsButton 
                isDeadLineDatePass={props.isDeadLineDatePass} 
                leagueChoice={props.leagueChoice} 
                isThisGameweek={isThisGameweek}/>
            <LineupByFixture 
                currentGameweek={props.currentGameweek} 
                numOfGames={props.numOfGames} 
                fantasyUser={props.fantasyUser} 
                handleLineup={props.handleLineup} 
                handleCaptain={props.handleCaptain} 
                isThisGameweek={isThisGameweek} 
                SetisThisGameweek={SetisThisGameweek}
                gameweekNumber={props.gameweekNumber} 
                SetGameweekNumber={props.SetGameweekNumber}/>
            <MatchesList 
                currentGameweek={props.currentGameweek} 
                numOfGames={props.numOfGames}
                leagueChoice={props.leagueChoice}
                gameweeksList={props.gameweeksList}/>
            <Rules/>
            <MyLeagues
             leagueChoice={props.leagueChoice}/>
           
          
            {/*<img 
                className= "fantasy-logo" 
    src={require('../../images/FantasyLogo.png')}/>*/}
          

            {user && <FantasyTeamNamePopup userInfo={props.userInfo} fantasyUser={props.fantasyUser} SetFantasyUser={props.SetFantasyUser}
                         numOfGames={props.numOfGames} currentGameweek={props.currentGameweek} leagueID= {props.leagueID}
                         leagueChoice={props.leagueChoice} fantasyType={props.fantasyType}/> }
        </div>
    )
}

export default FantasyHomePage;



/*****************************************************  (if fantastHeader component doesnt work well - use this) ***************
 *  <div className="fantasy-header">
                {user? <LogOut userInfo={props.userInfo} changeUserInfo={props.WrapUserInfo}
                                 /> : <Login changeUserInfo={props.WrapUserInfo}/>}
                <div  className="fantasy-logo" >
                    <img src={Logo}/>
                </div>
                <BackToHomePage />
            </div>

       ****************************************************************************************************/