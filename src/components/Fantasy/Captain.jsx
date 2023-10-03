import {React, useState} from "react";

import "./css/Captain.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { right } from "@popperjs/core";

const Captain = (props) => {
    //const [captainName, setCaptainName] = useState('');

    const handleCaptainChoice = (event) => {
      const { key, selectedIndex ,value} = event.target;
      //const selecet = event.target.selectedIndex;
      console.log(`${value} value   captain` );
      //const selectedPlayerId = parseInt(value);
      //const selectedPlayer = props.lineup.find((player) => player.id === selectedPlayerId);
      
      const selectedPlayer = props.lineup.find((player) => player.playerName === value);
      //setCaptainName(selectedPlayer? selectedPlayer.playerName : '');
      props.onChangeCaptain(selectedPlayer);
    };
  
    return (
      <div className="form-group">
       
        <select
          className="minimal"
          name="selectedCaptain"
          value={props.captain? props.captain.playerName: ''}
          onChange={handleCaptainChoice}
          style={{
            fontSize: "1vw",
            unicodeBidi: "plaintext",
            width: "14%",
            maxHeight: "2.75rem",
            position: "absolute",
            left: "19%",
            top: "40%",
            textAlign: "center",
          }}
        >
          <option value="">בחר קפטן</option>
       
          {props.lineup.map((player) => (
            <option key={player.id} value={player.playerName}>
              {player.playerHebName}
            </option>
          ))}
        </select>
      </div>
    );
  };

export default Captain;