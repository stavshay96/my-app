import {React} from "react";
import Button from 'react-bootstrap/Button';
import "./css/SubmitAndReset.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";

const buttons = [
    {
        buttonID: 1,
        name: 'שמור הרכב'
    }, {
        buttonID: 2,
        name: 'נקה הרכב'
    }
]

function SubmitAndReset(props) {
    let navigate = useNavigate();

    function CreateSubmitAndResetButtons(button) {
        const goalkeeperCount = props.lineup.filter(player => player.position === "GK").length;
        const defendersCount = props.lineup.filter(player => player.position === "DF").length;
        const midfieldersCount = props.lineup.filter(player => player.position === "MF").length;
        const forwardsCount = props.lineup.filter(player=> player.position === "FW").length;

        const buttonsHandler = () => {
            if (button.buttonID === 1) {
                submitHandler();
            } else if (button.buttonID === 2) {
                resetHandler();
            }
        }

        const submitHandler = () => {
            if (props.lineup.length < 11) {
                alert("ההרכב לא מלא!");
            } else if (goalkeeperCount < 1) {
                alert("ההרכב שלך חייב להכיל שוער");
            } else if (defendersCount < 3) {
                alert("ההרכב שלך חייב להכיל לפחות 3 שחקני הגנה");
            } else if (midfieldersCount < 3) {
                alert("ההרכב שלך חייב להכיל לפחות 3 שחקני קישור");
            } else if (forwardsCount < 1) {
                alert("ההרכב שלך חייב להכיל לפחות שחקן התקפה אחד");
            } else if (props.isDeadLineDatePass === true) {
                alert("חלון החילופים סגור! לא ניתן לבצע חילופים");
            } else if (!props.captain) {
                alert("יש לבחור קפטן!");
            } else if (!props.lineup.find(((player) => player.id === props.captain.id))) {
                alert("הקפטן לא חלק מהקבוצה. יש לבחור קפטן חדש");
            } else {
                saveLineup();
                navigate(`/Fantasy/${props.leagueChoice}`, {replace: true});
            }
        }

        const resetHandler = () => {
            props.onResetClick([]);
            props.onChangeSelectedRows([]);
            props.handleCaptain(undefined);
        }

        const saveLineup = () => {
            axios
                .post(`https://pendel-server.onrender.com/Fantasy/SetUserLineUpAndCaptain`, {
                userInfo: props.fantasyUser.userInfo.userID,
                leagueChoice: props.leagueChoice,
                fantasyType: props.fantasyType,
                Gameweek: props.currentGameweek,
                lineup: props.lineup,
                Captain: props.captain,
                tripleUsedInGameweek: props.fantasyUser.tripleUsedInGameweek,
                wildCardUsedInGameweek: props.fantasyUser.wildCardUsedInGameweek
            })
                .then((res) => {
                    console.log(res.data);
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error);
                    alert("ניסיון שמירת ההרכב נכשלה!!");
                });
        }

        return (
            <Button
                key={button.buttonID}
                className="btnSubmitAndReset"
                style={button.style}
                onClick={buttonsHandler}>
                {button.name}
            </Button>
        )
    }

    return (
        <div className="submit-reset-container">
            {buttons.map(CreateSubmitAndResetButtons)}
        </div>
    )
}

export default SubmitAndReset;