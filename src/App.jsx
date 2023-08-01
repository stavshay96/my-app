import { React, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Fantasy from "./components/Fantasy/Fantasy"
import Predictions from "./components/Predictions/Predictions"
import NotReadyPage from "./components/NotReadyYet/NotReadyPage";
import HomePage from "./components/HomePage/HomePage";
import "./App.css"


function App() {
    const [userInfo, SetUserInfo] = useState({});
    const [leagueChoice, SetLeagueChoice] = useState(() => {
      // Try to retrieve 'leagueChoice' from localStorage, or use an empty string if not found
      return localStorage.getItem("leagueChoice") || "";});

    const WrapUserInfo = (userInfo) => {
        SetUserInfo(() => {
          return userInfo;
        });
    };

     // Save 'leagueChoice' to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem("leagueChoice", leagueChoice);
    }, [leagueChoice]);


    return ( 
    <div>
       <Router>
         <Routes>
            <Route path='/' element= {<HomePage userInfo={userInfo} WrapUserInfo={WrapUserInfo}
                                                leagueChoice={leagueChoice} SetLeagueChoice={SetLeagueChoice} />}/>

            <Route path="/Fantasy/:fantasyLeague/*" element={<Fantasy userInfo={userInfo} WrapUserInfo={WrapUserInfo} leagueChoice={leagueChoice}/>}/>
            
            <Route path="/Predictions" element={<NotReadyPage/>} />

            <Route path="/NotReadyYet" element={<NotReadyPage/>}/>
           
        </Routes>
       </Router> 
    </div>
    );
}


export default App;

