import React from "react";
import "./css/FantasyHeader.css"
import LogOut from "../../HomePage/LogOut";
import Login from "../../HomePage/Login";
import InfoAndFantasyOptions from "./InfoAndFantasyOptions";
import {Link} from "react-router-dom";

const Logo = require("../../../images/PendelLogo-removebg.png");

function FantasyHeader(props) {

    const user = document.cookie;

    return (
        <div className="fantasy-header">
            {user
                ? <LogOut userInfo={props.userInfo} changeUserInfo={props.WrapUserInfo}/>
                : <Login changeUserInfo={props.WrapUserInfo}/>}
            <InfoAndFantasyOptions leagueChoice={props.leagueChoice}/>

            <Link to="/">
                <div className="fantasy-logo">
                    <img src={Logo} alt=""/>
                </div>
            </Link>
        </div>
    )
}

export default FantasyHeader;