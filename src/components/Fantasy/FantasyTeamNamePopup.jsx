import React, { useState } from "react";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./css/FantasyTeamNamePopup.css";

const FantasyTeamNamePopup = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fantasyTeamName, setFantasyTeamName] = useState("");
 
  const handleTrigger = () =>{
    console.log(props.fantasyUser);
    const isFantasyUserExists = props.fantasyUser;
    if (!isFantasyUserExists) {
       return (<div>{setOpen(true)}</div>)
    } else {
        return(<div>{setOpen(false)}</div>)
    }
}


  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    //console.log(props.userInfo);
    setFantasyTeamName(value);
  };

  const handleSubmit = () => {
  
    //const cookieInfo = splitCookieToString(user);
    const userInfoWithoutPassword = { ...props.userInfo };
     delete userInfoWithoutPassword.password;
    if(fantasyTeamName){
        axios.post(`https://pendel-server.onrender.com/Fantasy/CreateFantasyUser`, {
            leagueID: props.leagueID,
            leagueChoice: props.leagueChoice,
            fantasyType: props.fantasyType,
            userInfo: userInfoWithoutPassword,
            fantasyUserTeamName: fantasyTeamName,
            numOfGames: props.numOfGames,
            startFromGameweek: props.currentGameweek,
        }).then((res) =>{
            console.log(res.data);
            window.location.reload(); 
        }).catch(error => {
            console.error(error);
            alert("ניסיון יצירת הפנטזי יוזר נכשל!!");
            });
    }
    else{
        alert("שם הקבוצה ריק!!!");
    }
  };

  return (
    <Popup
      trigger={handleTrigger}
      modal
      open={open}
      closeOnDocumentClick={false}
    >
      {(close) => (
        <div >
          <Button
            className="close-btn-teamname"
            onClick={() => navigate("/", { replace: true })}
          >
            X
          </Button>

          <form className="fantasyTeamNameForm">
            <h1 className="welcome-header"> ברוך הבא!</h1>
            <div>
            <label className="labelStyle"> שם הקבוצה:</label>
              <input
                name="fantasyTeamName"
                value={fantasyTeamName}
                onChange={handleInputChange}
                onKeyDown={handleEnterPress}
                placeholder="שם הקבוצה"
                className="input-style"
                dir="auto" // Automatically detect text direction
              />
             
            </div>
            <div>
              <Button onClick={handleSubmit} className="submit-btn">
                שמירת שם הקבוצה
              </Button>
            </div>
            <label className="error-label">
              לא ניתן להשאיר שם ריק!
            </label>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default FantasyTeamNamePopup;
