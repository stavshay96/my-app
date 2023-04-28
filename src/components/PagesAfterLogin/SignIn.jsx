import Button from "react-bootstrap/esm/Button";
import React from "react";
import "./SignIn.css"

const SignIn =(props) =>
{
    const signInHandler = (event) =>{
        document.cookie = 'userID=; Max-Age=0; path=/;';
        document.cookie = 'fullName=; Max-Age=0; path=/;';
        document.cookie = 'email=; Max-Age=0; path=/;';
        window.location.reload(true);
    }

    return (
        <div>
            <h1 className="btnNamePresent" style={{position:'fixed', top:'5%', right:'9%' ,fontSize:'1.6vw'}}> ! {`${props.userInfo["fullName"]}`} שלום</h1>
            <Button className="btnSignIn" style={{position:'fixed', top:'5%', right:'24%'}} onClick={signInHandler}>
                התנתק
            </Button>
        </div>
    )
}

export default SignIn;