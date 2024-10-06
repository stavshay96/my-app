/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./css/TopBar.css"
import {Button, ButtonGroup} from "react-bootstrap";
import {useLocation} from 'react-router-dom';

function TopBar(props) {
    const fantasy = "ליגה";
    const teamName = "שם קבוצה";
    const subs = "חילופים";
    const budget = "תקציב";
    const points = "נקודות";

    const fantasyName = props.topbarLeagueName;
    const teamGivenName = props.fantasyUser ? props.fantasyUser.fantasyUserTeamName : "";

    const determineMaxSubs = () => {
        return props.fantasyUser.startFromGameweek
            ? props.fantasyUser.startFromGameweek === props.currentGameweek
                ? 80
                : props.fantasyUser.lineupsArr[props.currentGameweek - 1].length === 0
                    ? 80
                    : //bug: need to change startFromGameweek to currentGameweek - done 31.7.24
                    props.fantasyUser.wildCardUsedInGameweek === props.currentGameweek
                        ? props.fantasyType
                        : props.subsLimit
            : props.subsLimit;
    }

    const maxSubs = props.fantasyUser ? determineMaxSubs() : props.subsLimit;
    const totalBudget = props.lineup.reduce((sum, item) => sum + item.price, 0);

    useEffect(() => {
        props.SetSubsLimit(maxSubs);
    }, [maxSubs, props.SetSubsLimit]);

    
    const maxBudget = props.budgetLimit;

    const calcWeeklyPoints = () => {
        return props.fantasyUser.lineupsArr
            ? props.fantasyUser.lineupsArr[props.gameweekNumber - 1].reduce((sum, item) => sum + item.currentPoints, 0) : 0;
    }

    const weeklyPoints = props.fantasyUser ? calcWeeklyPoints() : 0;
    
    useEffect(() => {
        props.onCalcBudget(totalBudget);
    }, [totalBudget, props.onCalcBudget]);

    const location = useLocation();
    const showButton = location.pathname === `/Fantasy/${props.leagueChoice}/subs`;

    return (
        <div>
            <ButtonGroup className="btnTopBar">
                {showButton && <Button className="btnItems">{budget}<hr className="seperator"/>{props.currentBudget}M/{maxBudget}M</Button>}
                {showButton && <Button className="btnItems">{subs}<hr className="seperator"/>{props.currentSubs}/{maxSubs}</Button>}
                <Button className="btnItems">{teamName}<hr className="seperator"/>{teamGivenName}</Button>
                {!showButton && <Button className="btnItems">{points}<hr className="seperator"/>{weeklyPoints}</Button>}
                <Button className="btnItems">{fantasy}<hr className="seperator" style={{
            width: '75%'
        }}/>{fantasyName}</Button>
            </ButtonGroup>
        </div>
    )
}

export default TopBar;