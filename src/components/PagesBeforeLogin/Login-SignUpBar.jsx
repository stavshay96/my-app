import { React, useState } from "react";
import Button from 'react-bootstrap/Button';
import "./Login-SignUpBar.css";


function SignUpClick()
{
    alert("navigate to sign up page")
}

function LoginClick()
{
    alert("navigate to log in page")
}

function Login_SignUpBar()
{
    return (<div>
        <Button style={{position:'fixed', top:'5%', right:'20%'}} onClick={SignUpClick}>
            הרשמה 
        </Button>
        <Button style={{position:'fixed', top:'5%', right:'10%'}}onClick={LoginClick}>
            התחברות 
        </Button>
    </div>)
}

export default Login_SignUpBar;