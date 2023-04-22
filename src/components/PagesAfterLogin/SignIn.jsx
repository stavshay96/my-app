import Button from "react-bootstrap/esm/Button";
import React from "react";
import "./SignIn.css"

const SignIn =(props) =>
{
    const signInHandler = (event) =>{
        /*let removing = document.cookies.remove({
            "userID": props.userInfo["userID"],
            "fullName": props.userInfo["fullName"]
          });
          props.userInfo({});*/
    }

    return (
        <div>
            <Button className="btnNamePresent" style={{position:'fixed', top:'5%', right:'9%' ,fontSize:'1.6vw'}}> ! {`${props.userInfo["fullName"]}`} שלום</Button>
            <Button className="btnSignIn" style={{position:'fixed', top:'5%', right:'24%'}} onClick={signInHandler}>
                התנתק
            </Button>
        </div>
    )
}

export default SignIn;