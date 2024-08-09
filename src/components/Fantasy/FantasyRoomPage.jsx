import {React, useEffect, useState } from "react";
import "./css/FantasyRoomPage.css"
//import FantasyUsers from "./data/FantasyUsers.jsx";
import BackToHomePage from "../General/BackToHomePage.jsx";
import FantasyHeader from "./FantasyHeader.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";



function FantasyRoomPage(props){
    const [isLoading, SetIsLoading]= useState(true);
    const [fantasyUsersList, SetFantasyUsersList] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [currentRound, SetCurrentRound] = useState(3);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === `/Fantasy/${props.leagueChoice}/rooms`){
            let FantasyUsers = [];
            axios.get(`https://pendel-server.onrender.com/Fantasy/FantasyUsersList?leagueChoice=${props.leagueChoice}&fantasyType=${props.fantasyType}`)
            .then((res) => {
                SetFantasyUsersList(res.data);
                console.log(res.data)
                // need to create get request in fantasyPath
                // then get the list from db manager
                // return the array in response

            })
           // console.log(FantasyUsers)
            
        }
      }, [location.pathname]);

      useEffect(() => {
        if(fantasyUsersList.length >0){
            // Calculate total points for each user
            const usersWithTotalPoints = fantasyUsersList.map((user) => ({
                ...user,
                totalPoints: calcTotalPoints(user.lineupsArr), 
                currentPoints: user.lineupsArr[props.currentGameweek-1].reduce((sum, item) => sum + item.currentPoints, 0), //need to change it to sum all lineups
                fullName: user.userInfo.fullName
                }));

                // Sort users by total points in descending order
                const sortedUsers = usersWithTotalPoints.sort(
                (a, b) => b.totalPoints - a.totalPoints
                );

                setSortedUsers(sortedUsers);
                //setIsLoading(true);
        }
  
      }, [fantasyUsersList])

      useEffect(() => {
        if(sortedUsers.length > 0){
            SetIsLoading(false)
        }

      }, [sortedUsers])

      const calcTotalPoints = (lineupsArr) =>{
        let sumPoints = 0;
            for(let lineup of lineupsArr){
                if(lineup.length > 0){
                    sumPoints += lineup.reduce((sum, item) => sum + item.currentPoints, 0)
                }
            }
        return sumPoints;
    }


    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '150vh'}}>
             <FantasyHeader 
                userInfo={props.userInfo} 
                WrapUserInfo={props.WrapUserInfo} 
            />
             {!isLoading && (
                <div className="form">
                    <table className="fantasyUsers-table">
                        <thead>
                            <tr>
                                <th>סך נקודות כללי</th>
                                <th>נקודות במחזור  {props.currentGameweek}</th>
                                <th>שם קבוצה</th>
                                <th>שם מאמן</th>
                                <th>מיקום</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((user, index) => (
                                <tr key={user.fantasyUserID}>
                                    <td>{user.totalPoints}</td>
                                    {/* Add a cell for points in the current round if needed */}
                                    <td>{user.currentPoints}</td>
                                    <td>{user.fantasyUserTeamName}</td>
                                    <td>{user.fullName}</td>
                                    <td>{index + 1}</td>
                                </tr>
                            ))}  
                        </tbody>
                    </table>
            
               

                </div>
             )}
             {/*<img 
                className= "fantasy-logo" 
                src={require('../../images/FantasyLogo.png')}/>
                 <BackToHomePage style={{position:'absolute', top:'5.5%', right:'3%', width:'4.5%',  
            backgroundSize: "cover", backgroundPosition: '0vw 0.1vw', }}/> */}
        </div>
    )
}

export default FantasyRoomPage;