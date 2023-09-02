import {React} from "react";
import Button from 'react-bootstrap/Button';
import "./css/LangBar.css";


function LangBar(){
    
   return(
      <div>
            <Button className="btnNotCurrLang" variant="primary" style={{position:'absolute', top:'4.5%', left:'3%'}}>English</Button>
            <Button className="btnCurrLang" style={{position:'absolute', top:'4.5%', left:'10%'}}>עברית</Button>
      </div>)
}

export default LangBar;
