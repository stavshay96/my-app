import {React, useState, useEffect} from "react";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import "./FantasyDeadLine.css"

function FantasyDeadLine()
{
    const [deadLineMessage, setDeadLineMessage] = useState(" חלון החילופים פתוח");
    const [deadLine, setDeadLine] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const interval = setInterval(() => {
            setDeadLine(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    return(
    <Button className="btnDeadLine" style={{position:'fixed', top:'15%', left:'10%'}}>
        {deadLine}
        <Badge> 
            <div>
                
            </div>
        </Badge>
    </Button>
    )
}

export default FantasyDeadLine;