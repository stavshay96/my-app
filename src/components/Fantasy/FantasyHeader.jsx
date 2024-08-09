import React from "react";
import "./css/FantasyHeader.css"

import LogOut from "../HomePage/LogOut";
import Login from "../HomePage/Login";
import BackToHomePage from "../General/BackToHomePage";

const Logo = require("../../images/PendelLogo-removebg.png");

function FantasyHeader(props) {

    const user = document.cookie;

    return (
        <div className="fantasy-header">
        {user? <LogOut userInfo={props.userInfo} changeUserInfo={props.WrapUserInfo}/> 
                : <Login changeUserInfo={props.WrapUserInfo}/>}
        <div  className="fantasy-logo" >
            <img src={Logo}/>
        </div>
        <BackToHomePage />
    </div>
    )
}

export default FantasyHeader;