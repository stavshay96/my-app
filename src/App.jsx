import { React, useState , useEffect} from "react";
import LoginSignUpBar from "./components/PagesBeforeLogin/Login-SignUpBar"
import LangBar from "./components/PagesBeforeLogin/LangBar"
import Game from "./components/PagesBeforeLogin/Game"
import games from "./components/PagesBeforeLogin/Games"
import SignIn from "./components/PagesAfterLogin/SignIn";  
import Fantasy from "./components/PagesBeforeLogin/Fantasy"
import Predictions from "./components/PagesBeforeLogin/Predictions"
import OtherGames from "./components/PagesBeforeLogin/OtherGames"
import Button from 'react-bootstrap/Button';


import "./App.css"
import logo from './logo.svg';

function CreateGame(game){
    return ( <Game
        key={game.gameID} 
        name={game.name}
        style= {game.style}
    />)
}



function App() {

    //const [isLoggedIn, SetLogin] = useState(false);
    const [userInfo, SetUserInfo] = useState({});
    const WrapUserInfo = (userInfo) => {
        SetUserInfo(() => {
          return userInfo;
        });
    };

    const HasCookies = () => {
        //const user = document.getCookie();
        const user = document.cookie;
        
        useEffect(() => 
        {
            const cookieInfo = splitCookieToString(user);
            SetUserInfo(cookieInfo);
        }, []);
        
       
        console.log(user);
        console.log(userInfo);
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
      <div> {HasCookies()? <SignIn userInfo={userInfo} changeUserInfo={WrapUserInfo}/>:  <LoginSignUpBar changeUserInfo={WrapUserInfo}/>}</div>
       <LangBar/>
       {games.map(CreateGame)}
       <img className="left-photo" src={require('./images/Players/Messi.png')} alt="Messi" />
       <img className="right-photo" src={require("./images/Players/Cristiano Ronaldo.png")} alt="Ronaldo"/>
        
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