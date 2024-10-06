import {React, useEffect} from "react";
import LoginSignUpBar from "./Login-SignUpBar"
import Game from "./Game"
import Games from "./data/Games";
import LogOut from "./LogOut";
import axios from "axios";
import "./css/HomePage.css";
import {useLocation} from "react-router-dom";

const Logo = require("../../images/PendelLogo-removebg.png");
const Messi = require("../../images/Players/Messi.png");
const Ronaldo = require("../../images/Players/Cristiano Ronaldo.png");

const HomePage = (props) => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            document.body.classList.add("home-page");
        } else {
            document.body.classList.remove("home-page");
        }

        return () => {
            document.body.classList.remove("home-page");
        };
    }, [location.pathname]);

    function CreateGame(game) {
        return (<Game
            key={game.gameID}
            gameID={game.gameID}
            name={game.name}
            style={game.style}
            userInfo={props.userInfo}
            SetLeagueChoice={props.SetLeagueChoice}
            SetTopbarLeagueName={props.SetTopbarLeagueName}/>)
    }

    const HasCookies = () => {
        const user = document.cookie;
        useEffect(() => {
            if (user) {
                const cookieInfo = splitCookieToString(user);
                console.log(cookieInfo);
                console.log("work");

                axios
                    .post(`https://pendel-server.onrender.com/User/UserCookie`, {
                    email: cookieInfo.email,
                    fullName: cookieInfo.fullName,
                    userID: parseInt(cookieInfo.userID, 10)
                })
                    .then((res) => {
                        console.log(res.data);
                        console.log(res.data.userInfo);

                        if (res.data.Status === "Login succssed") {
                            props.WrapUserInfo(res.data.userInfo);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }

        }, [user]);

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
            <div className="top-line">
                {/*<LangBar/> */}
                { HasCookies()
                    ? <LogOut userInfo={props.userInfo} changeUserInfo={props.WrapUserInfo}/>
                    : <LoginSignUpBar changeUserInfo={props.WrapUserInfo}/>
                }
            </div>
            {/*showSignUp && <SignUp showSignUp={showSignUp} onMovingToSignUp={SetShowSignUp}/>*/}

            <div className="main-logo">
                <img src={Logo} alt=""/>
            </div>

            <div className="grid-games">
                {Games.map(CreateGame)}
            </div>

            <img className="left-photo" src={Messi} alt="Messi"/>
            <img className="right-photo" src={Ronaldo} alt="Ronaldo"/>
        </div>
    )
}

export default HomePage;