import {React, useState} from "react";
import "./css/Login-SignUpBar.css";
import Login from "./Login";
import SignUp from "./SignUp";

function Login_SignUpBar(props) {
    const isFromHomePage = true;
    const [showSignUp, SetShowSignUp] = useState(false);
    const handleShowSignUp = (showSignUp) => {
        SetShowSignUp(showSignUp);
    };


    return (
        <div className="login-signup-btns">
            <Login
                showSignUp={showSignUp}
                handleShowSignUp={handleShowSignUp}
                changeUserInfo={props.changeUserInfo}/>
            <SignUp
                isFromHomePage={isFromHomePage}
                showSignUp={showSignUp}
                handleShowSignUp={handleShowSignUp}
                changeUserInfo={props.changeUserInfo}/>

        </div>
    )
}

export default Login_SignUpBar;