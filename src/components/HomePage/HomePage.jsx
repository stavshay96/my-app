import { React, useState , useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginSignUpBar from "./Login-SignUpBar"
import LangBar from "../General/LangBar";
import Game from "./Game"
import Games from "./data/Games";
import LogOut from "./LogOut";  
import Button from 'react-bootstrap/Button';
import axios from "axios";
import "./css/HomePage.css";
import SignUp from "./SignUp";

const Messi = require("../../images/Players/Messi.png");
const Ronaldo = require("../../images/Players/Cristiano Ronaldo.png");


function CreateGame(game){
    return (
               <Game key={game.gameID} gameID={game.gameID} name={game.name} style= {game.style} />  
             )
}


const HomePage = (props) =>{

    const [showSignUp, SetShowSignUp] = useState(false);
    //window.location.reload();

    useEffect(()=>{
        console.log("1");
       // window.location.reload();
    },[showSignUp])


    const HasCookies = () => {
        const user = document.cookie;
        useEffect(() => 
        {
            console.log(`showSignUp ${showSignUp}`);
            if (user){
                    const cookieInfo = splitCookieToString(user);
                    console.log(cookieInfo);
                    console.log("work");
               
                    axios.post(`http://localhost:7777/User/UserCookie`, {
                    email: cookieInfo.email,
                    fullName: cookieInfo.fullName,
                    userID: parseInt(cookieInfo.userID,10)
                }).then((res) =>{
                    console.log(res.data);
                    console.log(res.data.userInfo);

                    if (res.data.Status === "Login succssed")
                    {
                        props.WrapUserInfo(res.data.userInfo);
                    }     
                }).catch(error => {
                console.error(error);
                });
            }
         
        }, [showSignUp]);
        
       
        return user;

    };

    const splitCookieToString = (user) => {
        let str = user;
        str = str.split('; ');
        const result = {};
        for (let i in str) {
            const cur = str[i].split('=');
            result[cur[0]] = cur[1];
        }
        return result;
    }


    return(
        <div>
                {HasCookies()? <LogOut userInfo={props.userInfo} changeUserInfo={props.WrapUserInfo}
                                  h1style={{position:'fixed', top:'4.35%', right:'7.75%' ,fontSize:'1.3vw', textShadow: "0vw 0.05vw 0vw"}}
                                  btnstyle={{position:'fixed', top:'13%', right:'8.825%'}}
                                  imgstyle={{position:'fixed', top:'6.5%', left:'92%' }}/>: 
                                <LoginSignUpBar showSignUp={showSignUp} onMovingToSignUp={SetShowSignUp} changeUserInfo={props.WrapUserInfo}/>}

                {showSignUp && <SignUp showSignUp={showSignUp} onMovingToSignUp={SetShowSignUp}/>}
                <LangBar/>
                {Games.map(CreateGame)}
                <img className="left-photo" src={Messi} alt="Messi" />
                <img className="right-photo" src={Ronaldo} alt="Ronaldo"/>
        </div>
    )

}

export default HomePage;