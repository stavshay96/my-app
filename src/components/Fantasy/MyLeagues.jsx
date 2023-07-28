import {React, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./css/MyLeagues.css";
import Leagues from "./data/Leagues.jsx";

let emptyRows = [ {id:1, leagueName: '' , position: ''} ];
const user = document.cookie;
let rows = user? Leagues.map(createRowLeague):emptyRows;

const cols = [
    { field: "Position", headerName: "מיקום", headerAlign: 'center',  type:"number", flex: 0.8, filterable: false, sortable: false, align: 'center',
    renderCell: wrapPositionText, renderHeader: wrapHeaderText},
    { field: "LeagueName", headerName: "שם הליגה", headerAlign: 'center', flex: 1.4, filterable: false, sortable: false, align: 'center', 
    renderCell: wrapCellTeamNameText ,  renderHeader: wrapHeaderText},
]

function createRowLeague(league) {
    return {id: league.id, LeagueName: league.leagueName, Position: league.position}
}

function wrapHeaderText(params) {
    return (
        <div style={{ whiteSpace: 'normal',lineHeight:'1.5', fontSize:'1.3vw', textDecoration:'underline' }}>
            {params.colDef.headerName}
        </div>
    );
}

function wrapCellTeamNameText(params) {
    return (
        <div style={{ whiteSpace: 'normal', lineHeight:'1.5', fontSize:'1.1vw', fontWeight: 'bold'}}>
            {params.value}
        </div>
    );
}

function wrapPositionText(params) {
    return (
        <div style={{ whiteSpace: 'normal', lineHeight:'1.5', fontSize:'1.1vw'}}>
            {params.value}
        </div>
    );
}
  
function MyLeagues()
{
    const [refreshFlag, setRefreshFlag] = useState(false);
    useEffect(() => {
        console.log("rows");
    }, [rows]);

    return(
        <div>
    <DataGrid
    style={{position:'fixed', top:'45.8%', left:'5%',
        width:'25%', height: '47%', backgroundColor: '#e0f9d5'}}
    rows={rows}
    columns={cols}
    disableColumnMenu
    disableColumnSort
    hideFooter
    />
    </div>)
}

export default MyLeagues;