import {React ,useState, useEffect} from "react";
import "./AdminFantasy.css";
import teams from "../Fantasy/data/Teams";
import axios from "axios";
import { Button } from "react-bootstrap";
import BackToHomePage from "../General/BackToHomePage"


const AdminFantasy = (props) =>{

/* admin pass to fantasy:
    1. currently gameweek number
    2. deadline per gameweek
    3. budget limit
    4. subs limit per gameweek
    5. set points to players each gameweek
    

*/
const [isLoading, setIsLoading] = useState(true);
const [formData, setFormData] = useState({
    gameweek: 1,
    deadline: '2023-09-12T16:00:00',
    budgetLimit: 100,
    subsLimit: 3,
    teamsData: teams,
    selectedTeam:'',
    selectedPlayer:''
  });

  const getFantasyLeagueData = () => {
    axios.get(`http://localhost:7777/Fantasy/FantasyLeagueData?leagueChoice=${props.leagueChoice}`)
    .then((res) => {
      const leaguedata = res.data;
       console.log(leaguedata);

      setFormData((prevData) => ({
        ...prevData,
        teamsData: leaguedata
    }));

      setIsLoading(false);
    })
    .catch(error => {
        console.error(error);
        setIsLoading(false);
    });
  }

    useEffect(() => {
    
        getFantasyLeagueData();
    
    }, []);

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'gameweek' && parseInt(value) < 1) {
        // If gameweek is less than 1, set it to 1
        setFormData((prevData) => ({
            ...prevData,
            gameweek: 1
        }));
    } else if (name.startsWith('player-')) {
        const playerName = name.split('-')[1];
        setFormData((prevData) => {
            const updatedTeamsData = prevData.teamsData.map((team) => {
                if (team.name === prevData.selectedTeam) {
                    const updatedPlayers = team.players.map((player) => {
                        if (player.playerName === playerName) {
                            const updatedPoints = [...player.points];
                            updatedPoints[prevData.gameweek - 1] = parseInt(value);
    
                            return {
                                ...player,
                                points: updatedPoints,
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
    
            return {
                ...prevData,
                teamsData: updatedTeamsData,
            };
        });
        console.log(`${formData.teamsData[1].players[0].playerName} now get ${formData.teamsData[1].players[0].points[0]} points`)
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
    setFormData((prevData) => ({
      ...prevData,
      selectedTeam: value,
      selectedPlayer: '' // Reset selected player when changing teams
    }));
  };

  const handleFantasySettingsUpdate = () => {
    console.log(props.leagueChoice)
    axios.post(`http://localhost:7777/Fantasy/Admin`, {
        leagueChoice: props.leagueChoice,
        deadline: formData.deadline,
        budgetlimit: formData.budgetLimit,
        subslimit: formData.subsLimit,
    }).then((res) =>{
        console.log(res.data);
        alert("הגדרות הליגה עודכנו בהצלחה!");
    }).catch(error => {
        console.error(error);
        alert("ניסיון עדכון הגדרות הליגה נכשל!!");
        });
  }


return (
    
    <div>
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
                    <label htmlFor="selectedTeam">Select Team:</label>
                    <select
                        name="selectedTeam"
                        value={formData.selectedTeam}
                        onChange={handleTeamChange}

                    >
                        <option value="">Select a team</option>
                        {formData.teamsData.map((team, index) => (
                        <option key={index} value={team.hebrwTeamName} >
                            {team.hebrwTeamName}
                        </option>
                        ))}
                    </select>
                </div>
                <Button className="btnSave" onClick={handleFantasySettingsUpdate}>שמור נתונים</Button>
            </form>
            </div>
                {formData.selectedTeam && (
                    <div className="player-column">
                            <div className="form-group">
                            
                                <div className="players-list">
                                {formData.teamsData
                                    .find((team) => team.hebrwTeamName === formData.selectedTeam)
                                    .players.map((player, index) => (
                                    <div key={index} className="player-label">
                                        <div className="player-info">
                                            <div className="player-name">
                                                <input
                                                    type="number"
                                                    name={`player-${player.fullName}`}
                                                    value={player.pointsPerWeek[formData.gameweek - 1]}
                                                    onChange={handleInputChange}
                                                    placeholder="Points"
                                                />
                                                {player.fullName}
                                            </div>
                                            <div className="player-position">
                                                ({player.position})
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                )}
            
        </div>
     
    <BackToHomePage style={{position:'fixed', top:'4.5%', right:'3%', width:'4.5%',  
                  backgroundSize: "cover",
                backgroundPosition: '0vw 0.1vw', }}/> 
                  </>)}
    </div>
  

)

}

export default AdminFantasy;