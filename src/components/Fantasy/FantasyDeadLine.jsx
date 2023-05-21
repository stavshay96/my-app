import {React, useState, useEffect} from "react";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import "./css/FantasyDeadLine.css"

function FantasyDeadLine()
{
    const [deadLineMessage, setDeadLineMessage] = useState(" חלון החילופים פתוח");
    const [countdown, setCountdown] = useState('');

      useEffect(() => {
        const deadLineDate = '2023-05-22T20:00:00';
        const endDate = new Date(deadLineDate); // Replace with your desired end date and time
    
        const updateCountdown = () => {
          const currentTime = new Date();
          const timeDifference = endDate - currentTime;
    
          if (timeDifference <= 0) {
            setCountdown('00:00:00:00');
            setDeadLineMessage(" חלון החילופים סגור");
          }
          else
          {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDifference / 1000) % 60);
    
            setCountdown(`${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            setDeadLineMessage(" חלון החילופים פתוח");
          }
        };
    
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
      }, []);

    return(
    <Button className="btnDeadLine" style={{position:'fixed', top:'12%', left:'3%', unicodeBidi:'plaintext'}}>
        <Badge> 
         {deadLineMessage} 
        </Badge>
        <hr className="seperator"/>
        {countdown}
    </Button>
    )
}

export default FantasyDeadLine;