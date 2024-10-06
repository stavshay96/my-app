/* eslint-disable no-unused-vars */
import {React, useEffect, useState} from "react";
import {DataGrid} from "@material-ui/data-grid";
import "./css/MyLeagues.css";
import Leagues from "../data/Leagues.jsx";
import {useNavigate} from "react-router-dom";

let emptyRows = [
    {
        id: 1,
        leagueName: '',
        position: ''
    }
];

function MyLeagues(props) {
    const [rows, setRows] = useState(emptyRows);
    let navigate = useNavigate();

    useEffect(() => {
        const user = document.cookie;
        let updatedRows = user
            ? Leagues.map(createRowLeague)
            : emptyRows;
        setRows(updatedRows);
    }, []);

    const cols = [
        {
            field: "LeagueName",
            headerName: "שם הליגה",
            headerAlign: 'center',
            flex: 1.7,
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
            <div className="header-myLeagues-grid">
                {params.colDef.headerName}
            </div>
        );
    }

    function wrapCellTeamNameText(params) {

        return (
            <div className="cells-myLeagues-grid">
                {params.value}
            </div>
        );
    }

    const handleRowClick = () => {
        window.history.pushState({
                navigationDirection: "back"
            }, "", `/Fantasy/${props.leagueChoice}`);

        navigate(`/Fantasy/${props.leagueChoice}/rooms`, {replace: false});
    }

    return (
        <div className="myLeagues-container">
            <DataGrid
                className="myLeagues-grid"
                rows={rows}
                columns={cols}
                disableColumnMenu
                disableColumnSort
                hideFooter
                onRowClick={handleRowClick}
                autoHeight/>
        </div>
    )
}

export default MyLeagues;