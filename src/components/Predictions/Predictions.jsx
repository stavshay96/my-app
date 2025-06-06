import {React, useEffect} from "react";
import "./css/Predictions.css";
import LangBar from "../General/LangBar";
import MyLeagues from "./MyLeagues";
import UserPoints from "./UserPoints";
import MatchesList from "./MatchesList";
import Winners from "./Winners";
import BackToHomePage from "../General/BackToHomePage";
import LogOut from "../HomePage/LogOut";
import Login from "../HomePage/Login";
import {useLocation} from "react-router-dom";

const Predictions = (props) => {
    const user = document.cookie;
    const location = useLocation();

    console.log(`${user} user info`);
    console.log(`${props.leagueChoice} predictionshomepage`);


    useEffect(() => {
        if (location.pathname.includes("/Predictions/")) {
            document.body.classList.add("predictions-page");
        } else {
            document.body.classList.remove("predictions-page");
        }

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("predictions-page");
        };
    }, [location.pathname]);

    return (
        <div className="predictionsDiv">
            <UserPoints/>
            <MatchesList/>
            <MyLeagues/>
            <Winners/>
            <BackToHomePage
                style={{
                position: 'fixed',
                top: '4.5%',
                right: '3%',
                width: '4.5%',
                backgroundSize: "cover",
                backgroundPosition: '0vw 0.1vw'
            }}/>
            <img
                className="Predictions-logo"
                src={require('../../images/PredictionsLogo.jpg')}
                style={{
                marginLeft: '81%',
                marginTop: '2.5%',
                height: '1vw%'
            }}
                alt=""/> {user
                ? <LogOut
                        userInfo={props.userInfo}
                        changeUserInfo={props.WrapUserInfo}
                        h1style={{
                        position: 'fixed',
                        top: '4.35%',
                        right: '7.75%',
                        fontSize: '1.3vw',
                        textShadow: "0vw 0.05vw 0vw"
                    }}
                        btnstyle={{
                        position: 'fixed',
                        top: '11%',
                        left: '69%'
                    }}
                        imgstyle={{
                        position: 'fixed',
                        top: '4%',
                        left: '70.5%'
                    }}/>
                : <Login changeUserInfo={props.WrapUserInfo}/>}
        </div>
    )
}

export default Predictions;