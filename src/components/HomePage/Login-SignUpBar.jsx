import {React,useState} from "react";
import "./css/Login-SignUpBar.css";
import Login from "./Login";
import SignUp from "./SignUp";

function SignUpClick() {
    alert("navigate to sign up page")
}

function Login_SignUpBar(props) {

    const [showSignUp,
        SetShowSignUp] = useState(false);
    //window.location.reload();

    const handleShowSignUp = (showSignUp) => {
        SetShowSignUp(showSignUp);
      };

      const isFromHomePage=true;

    return (
        <div>
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