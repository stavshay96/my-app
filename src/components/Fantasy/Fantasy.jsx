import {React, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { browserHistory } from 'react-router';
import Button from 'react-bootstrap/Button';
import "./css/Fantasy.css";
import FantasyHomePage from "./FantasyHomePage";
import FantasySubsPage from "./FantasySubsPage";
import AdminFantasy from "../Admin/AdminFantasy";


function getLineUp(){
  return [];
}

function getCaptain(){
  return undefined;
}

const Fantasy = (props) => {
    const [lineup, SetLineup] = useState(getLineUp);
    const [captain, SetCaptain] = useState(getCaptain);
    const [currentBudget, SetCurrentBudget] = useState(0);
    const [currentSubs, SetCurrentSubs] = useState(0);
    const deadLineDate = '2023-09-12T16:00:00';
    const [isDeadLineDatePass, SetIsDeadLineDatePass] = useState(false);

    const handleLineup = (lineup) => {
      SetLineup(lineup); //update lineup

      console.log(`${lineup.length} fantasy`); 
    };
    
    const handleCaptain = (captain) => {
      SetCaptain(captain);
      console.log(`${ captain} captain`); 
    };

    const handleBudget = (budget) => {
      SetCurrentBudget(budget);
    }

    const handleSubs = (subs) => {
      SetCurrentSubs(subs);
    }

    const handleIsDeadLineDatePass = (isDeadLineDatePass) => {
      SetIsDeadLineDatePass(isDeadLineDatePass);
      console.log(`${isDeadLineDatePass}`);
    }

 

  return(

    <Routes>
      <Route path="/" element={<FantasyHomePage lineup={lineup} handleLineup={handleLineup} leagueChoice={props.leagueChoice}
      currentBudget={currentBudget} handleBudget={handleBudget}  topbarLeagueName={props.topbarLeagueName}
      currentSubs={currentSubs} handleSubs={handleSubs}
      captain={captain} handleCaptain={handleCaptain} 
      deadLineDate={deadLineDate}  handleIsDeadLineDatePass={handleIsDeadLineDatePass}  isDeadLineDatePass={isDeadLineDatePass} WrapUserInfo={props.WrapUserInfo} />}/>

      <Route path="subs" element={<FantasySubsPage lineup={lineup} handleLineup={handleLineup} leagueChoice={props.leagueChoice}
      currentBudget={currentBudget} handleBudget={handleBudget}  topbarLeagueName={props.topbarLeagueName}
      currentSubs={currentSubs} handleSubs={handleSubs}
      captain={captain} handleCaptain={handleCaptain} 
      deadLineDate={deadLineDate}  handleIsDeadLineDatePass={handleIsDeadLineDatePass}  isDeadLineDatePass={isDeadLineDatePass}
      userInfo={props.userInfo} WrapUserInfo={props.WrapUserInfo} />}/>
              
      <Route path="/daniel" element={<div><h1>daniel</h1></div>} />
      
      <Route path ="/admin" element={<AdminFantasy/>}/>
    </Routes>
  )
}

export default Fantasy;
