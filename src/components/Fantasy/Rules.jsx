import React from "react";
import "./css/Rules.css"
import { Button } from "react-bootstrap";

function Rules(){
   return (
    <Button className="btnRules" style={{position:'fixed', top:'3.5%', left:'27%'}}>
        חוקים
    </Button>
   )
}

export default Rules;