import {React} from "react";
import Button from 'react-bootstrap/Button';
import "./css/LangBar.css";
import { useLocation } from "react-router-dom";


function LangBar(){

   const location = useLocation();
   const buttonClass =  (location.pathname.includes("/Predictions/"))? "btnCurrLangPred": "btnCurrLang";
  
    
   return(
      <div>
            <Button className="btnNotCurrLang" variant="primary" style={{position:'absolute', top:'4.5%', left:'3%'}}>English</Button>
            <Button className={buttonClass} style={{position:'absolute', top:'4.5%', left:'10%'}}>עברית</Button>
      </div>)
}

export default LangBar;
