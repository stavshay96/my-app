import {React , useState} from "react";
import { DataGrid,  GridToolbar } from "@material-ui/data-grid";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./css/MatchesList.css"
import Matches from "./data/Matches.jsx";

const rows = Matches.map(createRowMatch);

const cols = [
    { field: "AwayTeam", headerName: "חוץ", headerAlign: 'center', flex: 1.4, filterable: false, sortable: false, align: 'center', 
    renderCell: wrapCellTeamNameText ,  renderHeader: wrapHeaderText},
    /*{ field: "ScoreAwayTeam", headerName: " ", headerAlign: 'right', type:"number", flex: 0.7, filterable: false, sortable: false, align: 'right' },*/
    { field: "Score", headerName: " ", headerAlign: 'right',  type:"number", flex: 0.8, filterable: false, sortable: false, align: 'center' },
    { field: "HomeTeam", headerName: "בית", headerAlign: 'center', flex: 1.4, filterable: false, sortable: false, align: 'center',
     renderCell: wrapCellTeamNameText, renderHeader: wrapHeaderText },
]

function createRowMatch(match){
    return {id: match.id, HomeTeam: match.HomeTeam, Score: `${match.ScoreAwayTeam}:${match.ScoreHomeTeam}`, AwayTeam: match.AwayTeam}
  }

function wrapCellTeamNameText(params) {
    return (
        <div style={{ whiteSpace: 'normal', lineHeight:'1.5', fontSize:'1vw', fontWeight: 'bold'}}>
            {params.value}
        </div>
    );
}

  function wrapHeaderText(params) {
    return (
        <div style={{ whiteSpace: 'normal',lineHeight:'1.5', fontSize:'1.1vw', textDecoration:'underline' }}>
            {params.colDef.headerName}
        </div>
    );
}
  
function MatchesList()
{
    const [gameweekNumber,SetGameweekNumber] = useState(25);
    const gameweek = "מחזור";

    return(
        <div>
            <ButtonGroup style={{position:'fixed', top:'40.8%', right:'6.25%', unicodeBidi:'plaintext', width:'15%' }}>
                <Button className= "btnLeftArrow"> <span>&#9664;</span></Button>
                <Button className= "btnGameweek"> {gameweek} {gameweekNumber} </Button>
                <Button className= "btnRightArrow"><span>&#9654;</span></Button>
            </ButtonGroup>

    <DataGrid
    style={{position:'fixed', top:'45.8%', right:'3.25%',
        width:'25%', height: '47%', backgroundColor: '#e0f9d5',     }}
    rows={rows}
    columns={cols}
    disableColumnMenu
    disableColumnSort
    hideFooter
    />
    </div>)
}

export default MatchesList;