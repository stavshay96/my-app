import { React, useState , useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUpBar from "./components/HomePage/Login-SignUpBar"
import LangBar from "./components/HomePage/LangBar"
import Game from "./components/HomePage/Game"
import games from "./components/HomePage/data/Games"
import LogOut from "./components/HomePage/LogOut";  
import Fantasy from "./components/Fantasy/Fantasy"
import Predictions from "./components/Predictions/Predictions"
import NotReadyPage from "./components/NotReadyYet/NotReadyPage";
import Button from 'react-bootstrap/Button';
import Background from "./images/Background.png"
import axios from "axios";


import "./App.css"
import logo from './logo.svg';

function CreateGame(game){
    return (
               <Game key={game.gameID} gameID={game.gameID} name={game.name} style= {game.style} />  
             )
}



function App() {
    const [userInfo, SetUserInfo] = useState({});
    const WrapUserInfo = (userInfo) => {
        SetUserInfo(() => {
          return userInfo;
        });
    };

    const HasCookies = () => {
        const user = document.cookie;
        useEffect(() => 
        {
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
                        SetUserInfo(res.data.userInfo);
                    }     
                }).catch(error => {
                console.error(error);
                });
            }
         
        }, []);
        
       
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

  
    return ( 
    <div>
       <Router>
         <Routes>
            <Route path='/' element= 
             {<div>
                  {HasCookies()? <LogOut userInfo={userInfo} changeUserInfo={WrapUserInfo}/>: 
                                <LoginSignUpBar changeUserInfo={WrapUserInfo}/>}
                  <LangBar/>
                  {games.map(CreateGame)}
                  <img className="left-photo" src={require('./images/Players/Messi.png')} alt="Messi" />
                  <img className="right-photo" src={require("./images/Players/Cristiano Ronaldo.png")} alt="Ronaldo"/>
             </div>}
             />

            <Route path="/Fantasy" element={<Fantasy />}/>
            

            <Route path="/Predictions" element={<NotReadyPage/>} />

            <Route path="/NotReadyYet" element={<NotReadyPage/>}/>
           
            
          
        </Routes>
       </Router> 
    </div>
    );
}


export default App;

/*<MenuBar/>
<Login/>
<SignUp/>
<Fantasy/>
<Predictions/>
<Other/>*/

/*
   <header className = "App-header">
        <
        img src = { logo }
        className = "App-logo"
        alt = "logo" / >
        <p >
        Edit <code> src / App.js </code> and save to reload. </p >
        <a className = "App-link"
        href = "https://reactjs.org"
        target = "_blank"
        rel = "noopener noreferrer" >
        Learn React </a>  
        </header>
*/


 /*style = {
            {
               // backgroundImage: `url(${process.env.PUBLIC_URL + "images/Background.png" })`,
                //backgroundSize: "cover",

                //backgroundRepeat: "no-repeat",
                // minHeight: 1000,
               // backgroundAttachment: "fixed",
               // height : "100vh",
                //mozBackgroundSize: 1000 ,
            }
        } */