import Button from "react-bootstrap/esm/Button";
import React from "react";
import "./LogOut.css"

const LogOut =(props) =>
{
    const LogOutHandler = (event) =>{
        document.cookie = 'userID=; Max-Age=0; path=/;';
        document.cookie = 'fullName=; Max-Age=0; path=/;';
        document.cookie = 'email=; Max-Age=0; path=/;';
        window.location.reload(true);
    }

    return (
        <div>
            <h1 className="btnNamePresent" style={{position:'fixed', top:'5%', right:'9%' ,fontSize:'1.6vw'}}> ! {`${props.userInfo["fullName"]}`} שלום</h1>
            <Button className="btnLogOut" style={{position:'fixed', top:'5%', right:'24%'}} onClick={LogOutHandler}>
                התנתק
            </Button>
        </div>
    )
}

export default LogOut;