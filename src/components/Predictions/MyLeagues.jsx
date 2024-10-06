import {React, useEffect, useState} from "react";
import {DataGrid} from "@material-ui/data-grid";
import "./css/MyLeagues.css";
import Leagues from "./data/Leagues.jsx";
import UpArrow from "../../images/up-arrow.png";

let emptyRows = [
    {
        id: 1,
        leagueName: '',
        position: ''
    }
];

const cols = [
    {
        field: "Position",
        headerName: "מיקום",
        headerAlign: 'center',
        type: "number",
        flex: 0.8,
        filterable: false,
        sortable: false,
        align: 'center',
        renderCell: wrapPositionText,
        renderHeader: wrapHeaderText
    }, {
        field: "LeagueName",
        headerName: "שם הליגה",
        headerAlign: 'center',
        flex: 1.4,
        filterable: false,
        sortable: false,
        align: 'center',
        renderCell: wrapCellTeamNameText,
        renderHeader: wrapHeaderText
    }
]

function createRowLeague(league) {
    return {id: league.id, LeagueName: league.leagueName, Position: league.position}
}

function wrapHeaderText(params) {
    return (
        <div
            style={{
            whiteSpace: 'normal',
            lineHeight: '1.5',
            fontSize: '1.3vw',
            textDecoration: 'underline'
        }}>
            {params.colDef.headerName}
        </div>
    );
}

function wrapCellTeamNameText(params) {
    return (
        <div
            style={{
            whiteSpace: 'normal',
            lineHeight: '1.5',
            fontSize: '1.1vw',
            fontWeight: 'bold'
        }}>
            {params.value}
        </div>
    );
}

function wrapPositionText(params) {
    return (
        <div
            style={{
            whiteSpace: 'normal',
            lineHeight: '1.5',
            fontSize: '1.1vw'
        }}>
            <img
                src={UpArrow}
                alt="upArrow"
                style={{
                marginRight: '0.2rem',
                height: '0.7rem',
                width: 'auto'
            }}/> {params.value}
        </div>
    );
}

function MyLeagues() {
    const [rows,
        setRows] = useState(emptyRows);
    useEffect(() => {
        const user = document.cookie;
        let updatedRows = user
            ? Leagues.map(createRowLeague)
            : emptyRows;
        setRows(updatedRows);
    }, []);

    return(
        <div>
    <DataGrid
    style={{position:'fixed', top:'44.8%', left:'4%',
        width:'20%', height: '47%', backgroundColor: '#ffdec9',
        backgroundImage: `url(https://img.freepik.com/free-vector/yellow-orange-gradient-abstract-background_53876-60243.jpg?w=740&t=st=1693524857~exp=1693525457~hmac=3be0050042821c39d05c028b710da828ca2700c3e549914f54c82de025cbfb2a)`, // Use the background image URL
        backgroundSize: 'cover', // Adjust the background size as needed
    }}
    rows={rows}
    columns={cols}
    disableColumnMenu
    disableColumnSort
    hideFooter
    />
    </div>)
}

export default MyLeagues;