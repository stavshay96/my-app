import {React} from "react";
import Button from 'react-bootstrap/Button';
import "./css/LangBar.css";
import {useLocation} from "react-router-dom";

function LangBar() {

    const location = useLocation();
    const buttonClass = (location.pathname.includes("/Predictions/"))
        ? "btnCurrLangPred"
        : "btnCurrLang";

    return (
        <div className="lang-btns">
            <Button className="btnNotCurrLang" variant="primary">English</Button>
            <Button className={buttonClass}>עברית</Button>
        </div>
    )
}

export default LangBar;
