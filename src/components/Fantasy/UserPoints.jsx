import React from "react";
import { Button } from "react-bootstrap";
import "./css/UserPoints.css"

function UserPoints()
{
    const weeklyPoints = 20;
    const totalPoints = 524;
    return(
        <div>
            <Button  className="btnPoints"  style= {{position:'fixed', top:'41%', left:'3%'}}>
            סך נקודות שבועי: {weeklyPoints}
            </Button>  
            <Button  className="btnPoints"  style= {{position:'fixed', top:'61%', left:'3%'}}>
            סך נקודות כללי: {totalPoints}
            </Button> 
         </div>
    )
}

export default UserPoints;