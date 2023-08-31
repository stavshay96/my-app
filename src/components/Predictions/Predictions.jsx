import React from "react";
import "./css/Predictions.css";
import LangBar from "../General/LangBar";
// import InfoAndFantasyOptions from "./InfoAndFantasyOptions";
import MyLeagues from "./MyLeagues";
import UserPoints from "./UserPoints";
import MatchesList from "./MatchesList";
import BackToHomePage from "../General/BackToHomePage";
import LogOut from "../HomePage/LogOut";
import Login from "../HomePage/Login";
import InfoAndPredictionsOptions from "./InfoAndPredictionsOptions";

const Predictions = (props) => {
    const user = document.cookie;
    console.log(`${user} user info`);
    console.log(`${props.leagueChoice} predictionshomepage`);

    return(
        <div>
            <LangBar/> 
            <UserPoints/>
            <MatchesList/>
            <MyLeagues/>
            <BackToHomePage style={{position:'fixed', top:'4.5%', right:'3%', width:'4.5%',  
                  backgroundSize: "cover",
                backgroundPosition: '0vw 0.1vw', }}/>
            <img className="Predictions-logo" src={require('../../images/PredictionsLogo.jpg')}
             style={{ marginLeft: '80%', marginTop: '2.5%', height: '1vw%' }} />

        </div>
    )
}

/*
<BackToHomePage style={{position:'fixed', top:'4.5%', right:'3%', width:'4.5%',  
                  backgroundSize: "cover",
                backgroundPosition: '0vw 0.1vw', }}/>
            <img className= "Predictions-logo" src={require('../../images/PredictionsLogo.png')}/>
            {user? <LogOut userInfo={props.userInfo} changeUserInfo={props.WrapUserInfo}
                                  h1style={{position:'fixed', top:'4.35%', right:'7.75%' ,fontSize:'1.3vw', textShadow: "0vw 0.05vw 0vw"}}
                                  btnstyle={{position:'fixed', top:'11%',left:'69%'}}
                                  imgstyle={{position:'fixed', top:'4%', left:'70.5%' }}/> : <Login changeUserInfo={props.WrapUserInfo}/>}
 */

export default Predictions;