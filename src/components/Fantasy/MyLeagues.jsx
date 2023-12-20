import {React, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./css/MyLeagues.css";
import Leagues from "./data/Leagues.jsx";
import DownArrow from "../../images/download.png";
import UpArrow from "../../images/up-arrow.png";
import {useNavigate} from "react-router-dom";


let emptyRows = [ {id:1, leagueName: '' , position: ''} ];
function MyLeagues(props)
{
    const [rows, setRows] = useState(emptyRows);
    useEffect(() => {
        const user = document.cookie;
        let updatedRows  = user? Leagues.map(createRowLeague):emptyRows;
        setRows(updatedRows);
    }, []);

    let navigate = useNavigate();

    


const cols = [
    /*{ field: "Position", headerName: "מיקום", headerAlign: 'center',  type:"number", flex: 0.8, filterable: false, sortable: false, align: 'center',
    renderCell: wrapPositionText, renderHeader: wrapHeaderText},*/
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



function wrapPositionText(params) {
    return (
        <div style={{ whiteSpace: 'normal', lineHeight:'1.5', fontSize:'1.1vw'}}>
            <img src={UpArrow} alt="upArrow" style={{ marginRight: '0.2rem', height: '0.7rem', width: 'auto' }} />
            {params.value}
        </div>
    );
}

    function wrapCellTeamNameText(params) {
       
        return (
            <div style={{ whiteSpace: 'normal', lineHeight:'1.5', fontSize:'1.1vw', fontWeight: 'bold'}}  >
                {params.value}
            </div>
        );
    }

    const handleRowClick = () =>{
        window.history.pushState({ navigationDirection: "back" }, "", `/Fantasy/${props.leagueChoice}`);
        navigate(`/Fantasy/${props.leagueChoice}/rooms`, {replace:false });
    }


    return(
        <div>
    <DataGrid
    style={{position:'absolute', top:'45.8%', left:'5%',
        width:'25%', height: '47%', backgroundColor: '#e0f9d5',
        backgroundImage: `url(https://img.freepik.com/premium-photo/green-purple-abstract-watercolor-painting-textured-white-paper-background_7190-1251.jpg?w=740)`,
        backgroundSize: 'cover'
    }}
    rows={rows}
    columns={cols}
    disableColumnMenu
    disableColumnSort
    hideFooter
    onRowClick={handleRowClick} 
    />
    </div>)
}

export default MyLeagues;