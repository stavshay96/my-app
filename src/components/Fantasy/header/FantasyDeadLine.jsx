/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState, useEffect} from "react";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import "./css/FantasyDeadLine.css"

function FantasyDeadLine(props) {

    const user = document.cookie;
    const [deadLineMessage, setDeadLineMessage] = useState("חלון החילופים סגור");
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const endDate = new Date(props.deadLineDate);

        const updateCountdown = () => {
            const currentTime = new Date();
            const timeDifference = endDate - currentTime;

            if (timeDifference <= 0) {
                setCountdown('00:00:00:00');
                setDeadLineMessage(" חלון החילופים סגור");
                props.handleIsDeadLineDatePass(true);
            } else {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDifference / 1000) % 60);

                setCountdown(`${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                setDeadLineMessage(" חלון החילופים פתוח");
                props.handleIsDeadLineDatePass(false);
            }
        };

        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    const calcTotalPoints = () => {
        let sumPoints = 0;
        if (props.fantasyUser.lineupsArr) {
            for (let lineup of props.fantasyUser.lineupsArr) {
                if (lineup.length > 0) {
                    sumPoints += lineup.reduce((sum, item) => sum + item.currentPoints, 0)
                }
            }
        }
        return sumPoints;
    }

    const totalPoints = props.fantasyUser ? calcTotalPoints() : 0;

    return (
        <Button className="btnDeadLine">
            <Badge>
                {deadLineMessage}
            </Badge>
            <br/> {countdown}
            <hr className="seperator"/>
            <Badge>
                סך נקודות כללי:
                <br/> {user ? totalPoints : 0}
            </Badge>
        </Button>
    )
}

export default FantasyDeadLine;