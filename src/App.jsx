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

    const [topbarLeagueName, SetTopbarLeagueName] =useState(() => {
      // Try to retrieve 'leagueChoice' from localStorage, or use an empty string if not found
      return localStorage.getItem("topbarLeagueName") || "";});

    /*const WrapLeagueChoice = (chosenPathName, chosenLeagueName) =>{
      SetLeagueChoice({pathName:chosenPathName, leagueName: chosenLeagueName})
    }
    */


    const WrapUserInfo = (userInfo) => {
        SetUserInfo(() => {
          return userInfo;
        });
    };

     // Save 'leagueChoice' to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem("leagueChoice", leagueChoice);
      localStorage.setItem("topbarLeagueName", topbarLeagueName);
    }, [leagueChoice, topbarLeagueName]);


    return ( 
    <div>
       <Router>
         <Routes>
            <Route path='/' element= {<HomePage userInfo={userInfo} WrapUserInfo={WrapUserInfo}
                                                leagueChoice={leagueChoice} SetLeagueChoice={SetLeagueChoice} 
                                                topbarLeagueName={topbarLeagueName} SetTopbarLeagueName={SetTopbarLeagueName}/>}/>

            <Route path="/Fantasy/:fantasyLeague/*" element={<Fantasy userInfo={userInfo} WrapUserInfo={WrapUserInfo}
                                                           leagueChoice={leagueChoice} topbarLeagueName={topbarLeagueName}/>}/>
            
            <Route path="/Predictions/:predictionsLeague/*" element={<Predictions userInfo={userInfo} WrapUserInfo={WrapUserInfo}
                                                           leagueChoice={leagueChoice} topbarLeagueName={topbarLeagueName}/>}/>

            <Route path="/NotReadyYet" element={<NotReadyPage/>}/>
           
        </Routes>
       </Router> 
    </div>
    );
}


export default App;

