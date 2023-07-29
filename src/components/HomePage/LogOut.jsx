import Button from "react-bootstrap/esm/Button";
import React from "react";
import "./css/LogOut.css"
import {useLocation, useNavigate} from 'react-router-dom';

var LogOut = (props) => {
    let navigate = useNavigate();
    const location = useLocation();
    const locatedAtHomePage = location.pathname === '/';

    const LogOutHandler = (event) => {
        document.cookie = 'userID=; Max-Age=0; path=/;';
        document.cookie = 'fullName=; Max-Age=0; path=/;';
        document.cookie = 'email=; Max-Age=0; path=/;';
        if (!locatedAtHomePage) {
            navigate("/", {replace: true});
        }
        window
            .location
            .reload(true);

    }

    return (
        <div>
            <img
                className="user"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                style={props.imgstyle}
                alt="UserIcon"/> {locatedAtHomePage && <h1 className="btnNamePresent" style={props.h1style}>
                !{`${props.userInfo["fullName"]}`} שלום
               </h1>}
            <Button className="btnLogOut" style={props.btnstyle} onClick={LogOutHandler}>
                התנתק
            </Button>
        </div>
    )
}

export default LogOut;