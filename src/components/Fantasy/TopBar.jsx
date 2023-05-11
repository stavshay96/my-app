import React, { useState } from "react";
import "./TopBar.css"
import { Button, ButtonGroup } from "react-bootstrap";

function TopBar()
{
    const fantasy = "ליגת פנטזי:";
    const fantasyName = "פרמייר ליג";
    const teamName= "שם קבוצה:";

    const subs = "חילופים:";
    const maxSubs = 80;
    const [currentSubs, SetCurrentSubs] = useState(0);
    const budget = "תקציב:";
    const maxBudget = 100;
    const [currentBudget, SetCurrentBudget] = useState(0);

    return(
    <ButtonGroup className="btnTopBar" style={{position:'absolute', top:'4%', right:'32%',  width:'29%'}}>
        <Button className="btnItems" style={{unicodeBidi:'plaintext',}}>{budget} {currentBudget}M/{maxBudget}M</Button>
        <Button className="btnItems" style={{unicodeBidi:'plaintext',}}>{subs} {currentSubs}/{maxSubs}</Button>
        <Button className="btnItems" style={{unicodeBidi:'plaintext',}}>{teamName}</Button>
        <Button className="btnItems" style={{unicodeBidi:'plaintext',}}>{fantasy} {fantasyName}</Button>
    </ButtonGroup>
    )
}

export default TopBar;