import React, { useState } from "react";
import "./TopBar.css"
import { Button, ButtonGroup } from "react-bootstrap";

function TopBar()
{
    const fantasy = "ליגת פנטזי:";
    const fantasyName = "פרמייר ליג";
    const teamName = "שם קבוצה:";
    const teamGivenName = "האקדמית";

    const subs = "חילופים:";
    const maxSubs = 80;
    const [currentSubs, SetCurrentSubs] = useState(0);
    const budget = "תקציב:";
    const maxBudget = 100;
    const [currentBudget, SetCurrentBudget] = useState(0);

    const lineup= "הרכב:";
    const maxPlayersInTeam =11;
    const [playersInTeamNumber, SetPlayersInTeamNumber] = useState(0);
    const GK ="שוער";
    const DEF= "הגנה";
    const MID = "קישור";
    const FWD = "התקפה";
    const [GKSInTeamNumber, SetGKSInTeamNumber] = useState(0);
    const [DEFInTeamNumber, SetDEFInTeamNumber] = useState(0);
    const [MIDInTeamNumber, SetMIDInTeamNumber] = useState(0);
    const [FWDInTeamNumber, SetFWDInTeamNumber] = useState(0);

    return(
        <div>
    <ButtonGroup className="btnTopBar" style={{position:'absolute', top:'3.5%', right:'31.7%',  width:'29%', height: '8%'}}>
        <Button className="btnItems" style={{unicodeBidi:'plaintext',}}>{budget} {currentBudget}M/{maxBudget}M</Button>
        <Button className="btnItems" style={{unicodeBidi:'plaintext',}}>{subs} {currentSubs}/{maxSubs}</Button>
        <Button className="btnItems" style={{unicodeBidi:'plaintext',}}>{teamName} {teamGivenName}</Button>
        <Button className="btnItems" style={{unicodeBidi:'plaintext',}}>{fantasy} {fantasyName}</Button>
    </ButtonGroup>

    <ButtonGroup style={{position:'absolute', top:'14%', right:'8.5%', width:'30%', }}>
        <ul>
        <li>  <Button className="btnItems2" style={{unicodeBidi:'plaintext'}}> {lineup} {playersInTeamNumber}/{maxPlayersInTeam}</Button></li>
        <li>  <Button className="btnItems2" style={{unicodeBidi:'plaintext',}}>{GKSInTeamNumber} {GK}</Button></li>
        <li>  <Button className="btnItems2" style={{unicodeBidi:'plaintext',}}>{DEFInTeamNumber} {DEF}</Button></li>
        <li>  <Button className="btnItems2" style={{unicodeBidi:'plaintext',}}>{MIDInTeamNumber} {MID}</Button></li>
        <li>  <Button className="btnItems2" style={{unicodeBidi:'plaintext',}}>{FWDInTeamNumber} {FWD}</Button></li>
        </ul>
</ButtonGroup>
</div>
    )
}

export default TopBar;