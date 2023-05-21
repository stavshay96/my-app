import {React, useState} from "react";
import Button from 'react-bootstrap/Button';
import "./css/LangBar.css";


function LangBar(){
    
   return(
      <div>
            <Button className="btnNotCurrLang" variant="primary" style={{position:'fixed', top:'3.5%', left:'3%'}}>English</Button>
            <Button className="btnCurrLang" style={{position:'fixed', top:'3.5%', left:'10%'}}>עברית</Button>
      </div>)
}

export default LangBar;
