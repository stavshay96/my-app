import React from "react";
import Button from 'react-bootstrap/Button';
import "./SubmitAndReset.css"

const buttons = [
    {
        buttonID: 1,
        name: 'הגש הרכב',
        style: { position:'fixed',bottom:'4%', right:'37%'}
    },
    {
        buttonID: 2,
        name: 'נקה הרכב',
        style: { position:'fixed', bottom:'4%', right:'51.5%', unicodeBidi:'plaintext',}
    },
]

function CreateSubmitAndResetButtons(button){
    return (
               <Button key={button.buttonID} className="btnSubmitAndReset"  style= {button.style}>
                {button.name}
                </Button>  
    )
}


function SubmitAndReset()
{
    return(
        <div>
        {buttons.map(CreateSubmitAndResetButtons)}
        </div>
    )

}

export default SubmitAndReset;