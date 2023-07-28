import {React, useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
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
import Captain from "./Captain";
import LineupCounter from "./LineupCounter";
import Rules from "./Rules";

const FantasySubsPage = (props) => {
    let navigate = useNavigate();
    const location = useLocation();
    const [initialSelectedRows,
        SetInitialSelectedRows] = useState([]);

    useEffect(() => {
        if (location.pathname === '/Fantasy/subs') {
            console.log('FantasySubsPage is rendering');
            console.log(`isDeadLineDatePass: ${props.isDeadLineDatePass}`);
            if (props.isDeadLineDatePass === true) {
                alert('חלון החילופים סגור! לא ניתן לבצע חילופים');
                navigate('/Fantasy', {replace: false});
            }
        }
    }, [location.pathname, props.isDeadLineDatePass]);

    return (
        <div>
            <LangBar/>
            <FantasyDeadLine
                deadLineDate={props.deadLineDate}
                handleIsDeadLineDatePass={props.handleIsDeadLineDatePass}/>
            <PlayersList
                lineup={props.lineup}
                initialSelectedRows={initialSelectedRows}
                onCheckBoxChange={props.handleLineup}
                captain={props.captain}
                handleCaptain={props.handleCaptain}/>
            <TopBar
                currentBudget={props.currentBudget}
                onCalcBudget={props.handleBudget}
                lineup={props.lineup}
                currentSubs={props.currentSubs}
                onCountingSubs={props.handleSubs}/>
            <LineupCounter lineup={props.lineup}/>
            <Field
                lineup={props.lineup}
                onRemoveButton={props.handleLineup}
                captain={props.captain}
                onChangeCaptain={props.handleCaptain}/>
            <SpecialChips/>
            <SubmitAndReset
                lineup={props.lineup}
                onResetClick={props.handleLineup}
                isDeadLineDatePass={props.isDeadLineDatePass}
                initialSelectedRows={initialSelectedRows}
                onChangeSelectedRows={SetInitialSelectedRows}
                captain={props.captain}
                handleCaptain={props.handleCaptain}/>
            <InfoAndFantasyOptions/>
            <MatchesList/>
            <Captain
                lineup={props.lineup}
                captain={props.captain}
                onChangeCaptain={props.handleCaptain}/>
            <Rules/>
            <BackToHomePage
                style={{
                position: 'fixed',
                top: '4.5%',
                right: '3%',
                width: '4.5%',
                backgroundSize: "cover",
                backgroundPosition: '0vw 0.1vw'
            }}/>
            <img className="fantasy-logo" src={require('../../images/FantasyLogo.png')}/>

        </div>
    )
}

export default FantasySubsPage;