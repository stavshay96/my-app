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
                handleShowSignUp={props.handleShowSignUp}
                changeUserInfo={props.changeUserInfo}/>
            <SignUp
                showSignUp={props.showSignUp}
                handleShowSignUp={props.handleShowSignUp}/>
        </div>
    )
}

export default Login_SignUpBar;