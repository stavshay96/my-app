import {React ,useState} from "react";
import "./AdminFantasy.css";
import teams from "../Fantasy/data/Teams";
import axios from "axios";
import { Button } from "react-bootstrap";

const AdminFantasy = (props) =>{

/* admin pass to fantasy:
    1. currently gameweek number
    2. deadline per gameweek
    3. budget limit
    4. subs limit per gameweek
    5. set points to players each gameweek
    

*/

const [formData, setFormData] = useState({
    gameweek: 1,
    deadline: '2023-09-12T16:00:00',
    budgetLimit: '',
    subsLimit: '',
    teamsData: teams,
    selectedTeam:'',
    selectedPlayer:''
  });

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
    console.log(formData.deadline, formData.budgetLimit, formData.subsLimit )
    axios.post(`http://localhost:7777/Fantasy/Admin`, {
        deadline: formData.deadline,
        budgetlimit: formData.budgetLimit,
        subslimit: formData.subsLimit
    }).then((res) =>{
        console.log(res.data);
    }).catch(error => {
        console.error(error);
        });
  }


return (
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
                    <option key={index} value={team.name}>
                        {team.name}
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
                                .find((team) => team.name === formData.selectedTeam)
                                .players.map((player, index) => (
                                <div key={index} className="player-label">
                                    <input
                                    type="number"
                                    name={`player-${player.playerName}`}
                                    value={player.points[formData.gameweek-1]}
                                    onChange={handleInputChange}
                                    placeholder="Points"
                                
                                    />
                                     {player.playerName}
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
            )}
          

    </div>

)

}

export default AdminFantasy;