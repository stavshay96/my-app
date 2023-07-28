import {React} from "react";
import "./css/Login-SignUpBar.css";
import Login from "./Login";
import SignUp from "./SignUp";

function SignUpClick() {
    alert("navigate to sign up page")
}

function Login_SignUpBar(props) {
    return (
        <div>
            <Login
                showSignUp={props.showSignUp}
                onMovingToSignUp={props.onMovingToSignUp}
                changeUserInfo={props.changeUserInfo}/>
            <SignUp
                showSignUp={props.showSignUp}
                onMovingToSignUp={props.onMovingToSignUp}/>
        </div>
    )
}

export default Login_SignUpBar;