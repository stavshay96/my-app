import { React, useState , useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Fantasy from "./components/Fantasy/Fantasy"
import Predictions from "./components/Predictions/Predictions"
import NotReadyPage from "./components/NotReadyYet/NotReadyPage";
import HomePage from "./components/HomePage/HomePage";
import "./App.css"


function App() {
    const [userInfo, SetUserInfo] = useState({});
    const WrapUserInfo = (userInfo) => {
        SetUserInfo(() => {
          return userInfo;
        });
    };

    return ( 
    <div>
       <Router>
         <Routes>
            <Route path='/' element= {<HomePage userInfo={userInfo} WrapUserInfo={WrapUserInfo} />}/>

            <Route path="/Fantasy/*" element={<Fantasy userInfo={userInfo} WrapUserInfo={WrapUserInfo}/>}/>
            
            <Route path="/Predictions" element={<NotReadyPage/>} />

            <Route path="/NotReadyYet" element={<NotReadyPage/>}/>
           
        </Routes>
       </Router> 
    </div>
    );
}


export default App;

