import { React, useState } from "react";
import LoginSignUpBar from "./components/PagesBeforeLogin/Login-SignUpBar"
import LangBar from "./components/PagesBeforeLogin/LangBar"
import Game from "./components/PagesBeforeLogin/Game"
import games from "./components/PagesBeforeLogin/Games"
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
    return ( 
    <div>
       <LoginSignUpBar/>
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