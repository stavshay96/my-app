import {React, useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Fantasy from "./components/Fantasy/Fantasy"
import Predictions from "./components/Predictions/Predictions"
import NotReadyPage from "./components/NotReadyYet/NotReadyPage";
import HomePage from "./components/HomePage/HomePage";
import "./App.css"

function App() {
    const [userInfo, SetUserInfo] = useState(() => {
        // Try to retrieve 'userInfo' from localStorage and parse it back into an object
        const storedUserInfo = localStorage.getItem("userInfo");

        return storedUserInfo ? JSON.parse(storedUserInfo) : {};
    });

    const [leagueChoice, SetLeagueChoice] = useState(() => {
        // Try to retrieve 'leagueChoice' from localStorage, or use an empty string if not found
        return localStorage.getItem("leagueChoice") || "";
    });

    const [topbarLeagueName, SetTopbarLeagueName] = useState(() => {
        // Try to retrieve 'leagueChoice' from localStorage, or use an empty string if not found
        return localStorage.getItem("topbarLeagueName") || "";
    });

    const WrapUserInfo = (userInfo) => {
        SetUserInfo(() => {
            return userInfo;
        });
    };

    useEffect(() => {
        localStorage.setItem("leagueChoice", leagueChoice);
        localStorage.setItem("topbarLeagueName", topbarLeagueName);

        // Serialize userInfo to JSON and save it to localStorage
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }, [leagueChoice, topbarLeagueName, userInfo]);

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
