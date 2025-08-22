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
        localStorage.removeItem("userInfo");
        if (!locatedAtHomePage) {
            navigate("/", {replace: true});
        }
        window
            .location
            .reload(true);

    }

    const buttonClass = (location.pathname.includes("/Predictions/")) ? "btnLogOutPred" : "btnLogOut";

    return (
        <div className="logout-container">
            <img
                className="user"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="UserIcon"/> {locatedAtHomePage && <h1 className="btnNamePresent">
                {`${props.userInfo["fullName"]}`}
            </h1>}
            <Button className={buttonClass} onClick={LogOutHandler}>
                התנתק
            </Button>
        </div>
    )
}

export default LogOut;