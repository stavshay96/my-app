import {React, useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import "./css/SubmitAndReset.css"
import { Link, useNavigate } from "react-router-dom";

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




function SubmitAndReset(props)
{
    let navigate = useNavigate();
   

    function CreateSubmitAndResetButtons(button){
       
    
       const buttonsHandler = () =>{
            if(button.buttonID === 1){
             submitHandler();
            }
            else if(button.buttonID === 2) {
             resetHandler();
            }
        }

        const submitHandler = () =>{
            if(props.lineup.length < 11){
                alert("ההרכב לא מלא!");
            }
            else if(props.isDeadLineDatePass === true) {
                alert("חלון החילופים סגור! לא ניתן לבצע חילופים");
            }
            else {
                navigate("/Fantasy", { replace: false } );
            }
        }

        const resetHandler = () =>{
            
        }
    
        return (
                   <Button key={button.buttonID} className="btnSubmitAndReset"  style= {button.style} onClick={buttonsHandler}>
                    {button.name}
                    </Button>  
        )
    }
    return(
        <div>
        {buttons.map(CreateSubmitAndResetButtons)}
        </div>
    )

}

export default SubmitAndReset;