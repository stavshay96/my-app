import {React ,useState, useEffect} from "react";
import "./AdminFantasy.css";
import teams from "../Fantasy/data/Teams";
import axios from "axios";
import { Button } from "react-bootstrap";
import BackToHomePage from "../General/BackToHomePage"
import {useNavigate, useLocation} from "react-router-dom";


const AdminFantasy = (props) =>{

/* admin pass to fantasy:
    1. currently gameweek number
    2. deadline per gameweek
    3. budget limit
    4. subs limit per gameweek
    5. set points to players each gameweek
    

*/
let navigate = useNavigate();
const [isLoading, setIsLoading] = useState(true);
const [formData, setFormData] = useState({
    gameweek: 1,
    deadline: '2023-09-12T16:00:00',
    budgetLimit: 100,
    subsLimit: 3,
    playersFromSameTeamLimit: 2,
    teamsData: props.leagueData,
    selectedTeam:'',
    selectedPlayer:''
  });

  const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("/admin/")) {
          document.body.classList.add("home-page");
        } else {
          document.body.classList.remove("home-page");
        }
      
        // Cleanup function to remove the class when the component unmounts
        return () => {
          document.body.classList.remove("home-page");
        };
      }, [location.pathname]);

  useEffect(() => {
    if (props.userInfo && props.userInfo["email"] !== "pendel@gmail.com") {
        navigate(`/Fantasy/${props.leagueChoice}`, {replace: true});
        }
    }, [isLoading]);


    useEffect(() => {
    
        //getFantasyLeagueData();

       setFormData((prevData) => ({
            ...prevData,
            gameweek: props.currentGameweek,
            deadline: props.deadLineDate,
            budgetLimit: props.budgetLimit,
            subsLimit: props.subsLimit ,
            playersFromSameTeamLimit: props.playersFromSameTeamLimit,
            teamsData: props.leagueData
        }))
        console.log(props.leagueData);
        if(props.leagueData && props.leagueData.length > 0) {
         setIsLoading(false);
        }
      
    }, [isLoading, props.leagueData]);

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'gameweek') {
        const gameweekValue =parseInt(value);
        // If gameweek is less than 1, set it to 1
        if (gameweekValue < 1){
            setFormData((prevData) => ({
                ...prevData,
                gameweek: 1
            }));
        }
        else {
            setFormData((prevData) => ({
                ...prevData,
                gameweek: gameweekValue
            }));
        }
    } else if (name === 'subsLimit' || name === 'budgetLimit' || name === 'playersFromSameTeamLimit') {
        const intValue = parseInt(value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: intValue,
        }));
    } else if (name.startsWith('player_')) {
        const playerName = name.split('_')[1];
        console.log(playerName);
        const updatedTeamsData = formData.teamsData.map((team) => {
            // console.log(team.hebrewName);
             //console.log(`${ formData.selectedTeam} has chosen`);
             if (team.englishName === formData.selectedTeam) {
                 const updatedPlayers = team.players.map((player) => {
                     if (player.englishName === playerName) {
                         console.log(value);
                         const updatedPoints = [...player.pointsPerWeek];
                         updatedPoints[formData.gameweek - 1] = parseInt(value);
                         console.log(updatedPoints);
 
                         return {
                             ...player,
                             pointsPerWeek: updatedPoints,
                         };
                     }
                     return player;
                 });
 
                 return {
                     ...team,
                     players: updatedPlayers,
                 };
             }
             return team;
         });

         console.log(updatedTeamsData);
         setFormData((prevData) => ({
            ...prevData,
            ["teamsData"]: updatedTeamsData,
        }));
       // console.log(`${formData.teamsData[1].players[0].fullName} now get ${formData.teamsData[1].players[0].pointsPerWeek[0]} points`)
    }
   
    else {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
};

const handleTeamChange = (event) => {
    const { value } = event.target;
    console.log(`${value} from select` );
    setFormData((prevData) => ({
      ...prevData,
      selectedTeam: value,
      selectedPlayer: '' // Reset selected player when changing teams
    }));
  };

  const handleFantasySettingsUpdate = () => {
    console.log(props.leagueChoice)
    axios.post(`https://pendel-server.onrender.com/Fantasy/AdminFantasySettings`, {
        leagueChoice: props.leagueChoice,
        deadline: formData.deadline,
        budgetlimit: formData.budgetLimit,
        subslimit: formData.subsLimit,
        playersFromSameTeamLimit: formData.playersFromSameTeamLimit,
        currentGameweek: formData.gameweek
    }).then((res) =>{
        console.log(res.data);
        alert("הגדרות הליגה עודכנו בהצלחה!");
    }).catch(error => {
        console.error(error);
        alert("ניסיון עדכון הגדרות הליגה נכשל!!");
        });
  }

  const handlePlayersPointsUpdate = () => {
    //alert("points update");
    axios.post(`https://pendel-server.onrender.com/Fantasy/AdminPointsUpdate`, {
        leagueChoice: props.leagueChoice,
        teamsData : formData.teamsData,
        currentGameweek: formData.gameweek
    }).then((res) =>{
        console.log(res.data);
        alert("הנקודות עודכנו בהצלחה!");
    }).catch(error => {
        console.error(error);
        alert("ניסיון עדכון הנקודות נכשל!!");
        });
    
  }


return (
    
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '150vh'}}>
    {!isLoading && (
    <>
        <div className="adminform">
            <div className="form-column">
            <form >
                <div className="form-group">
                    <label htmlFor="gameweek">Gameweek:</label>
                    <input
                    type="number"
                    name="gameweek"
                    value={formData.gameweek}
                    onChange={handleInputChange}
                    placeholder="Gameweek"
                    min="1"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="deadline">Deadline:</label>
                    <input
                    type="datetime-local"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    placeholder="Deadline"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="budgetLimit">Budget Limit:</label>
                    <input
                    type="number"
                    name="budgetLimit"
                    value={formData.budgetLimit}
                    onChange={handleInputChange}
                    placeholder="budgetLimit"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subsLimit">Subs Limit:</label>
                    <input
                    type="number"
                    name="subsLimit"
                    value={formData.subsLimit}
                    onChange={handleInputChange}
                    placeholder="subsLimit"
        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="playersFromSameTeamLimit">Players From Same Team Limit:</label>
                    <input
                    type="number"
                    name="playersFromSameTeamLimit"
                    value={formData.playersFromSameTeamLimit}
                    onChange={handleInputChange}
                    placeholder="playersFromSameTeamLimit"
        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="selectedTeam">Select Team:</label>
                    <select
                        name="selectedTeam"
                        value={formData.selectedTeam}
                        onChange={handleTeamChange}

                    >
                        <option value="">Select a team</option>
                        {props.leagueData.map((team, index) => (
                        <option key={index} value={team.englishName} >
                            {team.hebrewName}
                        </option>
                        ))}
                    </select>
                </div>
                <Button className="btnSave" onClick={handleFantasySettingsUpdate}>שמור הגדרות</Button>
                <Button className="btnSave" onClick={handlePlayersPointsUpdate}>שמור ניקוד  </Button>
                <div style={{fontSize:'1rem', textAlign:'center', unicodeBidi:'plaintext', color:'red'}}>לשים לב: הניקוד שנשמר בלחיצה הוא הניקוד למחזור המצוין ב-gameweek</div>
            </form>
            </div>
                {formData.selectedTeam && (
                    <div className="player-column">
                            <div className="form-group">
                                <table className="players-table">
                                    <thead>
                                        <tr>
                                            <th>Player Name Eng</th>
                                            <th>Player Name Heb</th>
                                            <th>Position</th>
                                            <th>Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.teamsData
                                            .find((team) => team.englishName === formData.selectedTeam)
                                            .players.map((player, index) => (
                                                <tr key={index} >
                                                     <td  className="player-name">
                                                        {player.englishName}
                                                    </td>
                                                    <td  className="player-name">
                                                        {player.hebrewName}
                                                    </td>
                                                    <td className="player-position">
                                                        {player.position}
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name={`player_${player.englishName}`}
                                                            value={player.pointsPerWeek[formData.gameweek - 1]}
                                                            onChange={handleInputChange}
                                                            placeholder="Points"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>

                            </div>
                    </div>
                )}
            
        </div>
     
    <BackToHomePage style={{position:'absolute', top:'5.5%', right:'3%', width:'4.5%',  
                  backgroundSize: "cover",
                backgroundPosition: '0vw 0.1vw', }}/> 
                  </>)}
    </div>
  

)

}

export default AdminFantasy;