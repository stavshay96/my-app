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
            <img className="user" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="UserIcon" />
            <h1 className="btnNamePresent" style={{position:'fixed', top:'4.35%', right:'7.75%' ,fontSize:'1.3vw', textShadow: "0vw 0.05vw 0vw"}}> !{`${props.userInfo["fullName"]}`} שלום</h1>
            <Button className="btnLogOut" style={{position:'fixed', top:'13%', right:'8.825%'}} onClick={LogOutHandler}>
                התנתק
            </Button>
        </div>
    )
}

export default LogOut;