import {React , useState} from "react";
import { DataGrid,  GridToolbar } from "@material-ui/data-grid";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./css/MatchesList.css"
import Leagues from "./data/Leagues.jsx";

const rows = Leagues.map(createRowLeague);

const cols = [
    { field: "Position", headerName: "מיקום", headerAlign: 'center',  type:"number", flex: 0.7, filterable: false, sortable: false, align: 'center',
    renderHeader: wrapHeaderText }, 
    { field: "LeagueName", headerName: "שם הליגה", headerAlign: 'center', flex: 1.4, filterable: false, sortable: false, align: 'center', 
    renderCell: wrapCellTeamNameText ,  renderHeader: wrapHeaderText},
]

function createRowLeague(league) {
    return {id: league.id, LeagueName: league.leagueName, Position: league.position}
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
  
function MyLeagues()
{
    return(
        <div>
    <DataGrid
    style={{position:'fixed', top:'45.8%', left:'5%',
        width:'25%', height: '47%', backgroundColor: '#e0f9d5',     }}
    rows={rows}
    columns={cols}
    disableColumnMenu
    disableColumnSort
    hideFooter
    />
    </div>)
}

export default MyLeagues;