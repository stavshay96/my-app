import {React, useState} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./Captain.css";

const Captain = (props)=>{

    const handleCaptainChoice = (event) => {
        props.onChangeCaptain(event.target.value);
        
    }

    return(
        <div>
            <Box sx={{ minWidth: 120 }} style={{position:'fixed', top:'32.5%', right:'67%',
            width:'13%',  backgroundColor: '#e0f9d5',     }}>
                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">קפטן</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={props.Captain}
                        label="captain"
                        onChange={handleCaptainChoice}
                    >
                    {props.lineup.map((player) => (
                        <MenuItem key={player.id} value={player}>
                            {player.playerName}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )

}
export default Captain;