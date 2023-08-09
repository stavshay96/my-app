import {React ,useState} from "react";
import "./AdminFantasy.css";
import teams from "../Fantasy/data/Teams";
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
            <Button className="btnSave">שמור נתונים</Button>
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
                                    name={`${player.playerName}`}
                                    value={player.points[formData.gameweek]}
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