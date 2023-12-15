import {React, useState, useEffect} from "react";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import "./css/FantasyDeadLine.css"
import Background from "../../images/backgroundDeadline.jpg";

function FantasyDeadLine(props) {
   
    const user = document.cookie;
    const [deadLineMessage,
        setDeadLineMessage] = useState("חלון החילופים סגור");
    const [countdown,
        setCountdown] = useState('');

    useEffect(() => {
        //const deadLineDate = '2023-05-22T20:00:00';
        const endDate = new Date(props.deadLineDate); // Replace with your desired end date and time

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

    const calcTotalPoints = () =>{
        let sumPoints = 0;
        if(props.fantasyUser.lineupsArr){
            for(let lineup of props.fantasyUser.lineupsArr){
                if(lineup.length > 0){
                    sumPoints += lineup.reduce((sum, item) => sum + item.currentPoints, 0)
                }
            }
        }
        return sumPoints;
    }

    const totalPoints = calcTotalPoints();

    return (
        <Button
            className="btnDeadLine"
            style={{
            position: 'absolute',
            top: '12%',
            left: '8.5%',
            unicodeBidi: 'plaintext',
            backgroundImage: `url(https://img.freepik.com/free-vector/green-curve-frame-template_53876-99025.jpg?w=900&t=st=1693520574~exp=1693521174~hmac=31612521b16feec03c061c9f10c87d1c819cb5e958fb984c702d1e23fac40d2a)`, // Use the background image URL
            backgroundSize: 'cover', // Adjust the background size as needed
        }}>
            <Badge style={{lineHeight: '1.5'}}>
                {deadLineMessage}
            </Badge>
            <br/> {countdown}
            <hr className="seperator" style={{width: '75%'}}/>
            <Badge style={{fontSize: "75%"}}>
                  סך נקודות כללי:
                <br/> {user? totalPoints:0}
            </Badge>
        </Button>
    )
}

export default FantasyDeadLine;