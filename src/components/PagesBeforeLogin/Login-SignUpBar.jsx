import { React, useState } from "react";
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import "./Login-SignUpBar.css";
import Login from "./Login";
import SignUp from "./SignUp";


function SignUpClick()
{
    alert("navigate to sign up page")
}



function Login_SignUpBar()
{
    return (<div>
        <Login/>

        <Popup trigger={ 
          <Button className="btnLSBar" style={{position:'fixed', top:'5%', right:'20%'}} onClick={SignUpClick}>
             הרשמה 
          </Button>}  modal nested>
          
            <SignUp/>
            <div>Popup SignUp content here !!</div>
        </Popup>



    </div>)
}

export default Login_SignUpBar;