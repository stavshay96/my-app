import React from "react";
import "./css/TopBar.css"
import {Button, ButtonGroup} from "react-bootstrap";
import {useLocation} from 'react-router-dom';

function TopBar(props) {
    const fantasy = "ליגה";
    const fantasyName = props.topbarLeagueName;
    const teamName = "שם קבוצה";
    const teamGivenName = "האקדמית";

    const subs = "חילופים";
    const maxSubs = 80;

    const budget = "תקציב";
    const maxBudget = 100;

    //calculating Budget
    const totalBudget = props
        .lineup
        .reduce((sum, item) => sum + item.price, 0);
    props.onCalcBudget(totalBudget);

    //counting Subs
    const totalSubs = props
        .lineup
        .reduce((count, item) => count + 1, 0);
    props.onCountingSubs(totalSubs);

    const location = useLocation();

    const showButton = location.pathname === `/Fantasy/${props.leagueChoice}/subs`;

    return (
        <div>
            <ButtonGroup
                className="btnTopBar"
                style={{
                position: 'absolute',
                top: '3.5%',
                right: '31.7%',
                width: '29%',
                height: '8%'
            }}>
                <Button
                    className="btnItems"
                    style={{
                    height: '110%',
                    unicodeBidi: 'plaintext'
                }}>{budget}<hr/>{props.currentBudget}M/{maxBudget}M</Button>
                {showButton && <Button
                    className="btnItems"
                    style={{
                    height: '110%',
                    unicodeBidi: 'plaintext'
                }}>{subs}<hr/>{props.currentSubs}/{maxSubs}</Button>}
                <Button
                    className="btnItems"
                    style={{
                    height: '110%',
                    unicodeBidi: 'plaintext'
                }}>{teamName}<hr/>{teamGivenName}</Button>
                <Button
                    className="btnItems"
                    style={{
                    height: '110%',
                    unicodeBidi: 'plaintext'
                }}>{fantasy}<hr/>{fantasyName}</Button>
            </ButtonGroup>
        </div>
    )
}

export default TopBar;