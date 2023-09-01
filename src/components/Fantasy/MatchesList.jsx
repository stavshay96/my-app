import {React, useState} from "react";
import {DataGrid} from "@material-ui/data-grid";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./css/MatchesList.css"
import Matches from "./data/Matches.jsx";

const rows = Matches.map(createRowMatch);

const cols = [
    {
        field: "AwayTeam",
        headerName: "חוץ",
        headerAlign: 'center',
        flex: 1.4,
        filterable: false,
        sortable: false,
        align: 'center',
        renderCell: wrapCellTeamNameText,
        renderHeader: wrapHeaderText
    },
    {
        field: "Score",
        headerName: " ",
        headerAlign: 'right',
        type: "number",
        flex: 0.8,
        filterable: false,
        sortable: false,
        align: 'center'
    }, {
        field: "HomeTeam",
        headerName: "בית",
        headerAlign: 'center',
        flex: 1.4,
        filterable: false,
        sortable: false,
        align: 'center',
        renderCell: wrapCellTeamNameText,
        renderHeader: wrapHeaderText
    }
]

function createRowMatch(match) {
    return {id: match.id, HomeTeam: match.HomeTeam, Score: `${match.ScoreAwayTeam}:${match.ScoreHomeTeam}`, AwayTeam: match.AwayTeam}
}

function wrapCellTeamNameText(params) {
    return (
        <div
            style={{
            whiteSpace: 'normal',
            lineHeight: '1.5',
            fontSize: '1vw',
            fontWeight: 'bold'
        }}>
            {params.value}
        </div>
    );
}

function wrapHeaderText(params) {
    return (
        <div
            style={{
            whiteSpace: 'normal',
            lineHeight: '1.5',
            fontSize: '1.1vw',
            textDecoration: 'underline'
        }}>
            {params.colDef.headerName}
        </div>
    );
}

function MatchesList() {
    const [gameweekNumber,
        SetGameweekNumber] = useState(25);
    const gameweek = "מחזור ";
    const limitGameWeek = 38;

    const increaseGameweek = () =>{
        if (gameweekNumber < limitGameWeek) {
            SetGameweekNumber(gameweekNumber+1);
        }
    }
    const decreaseGameweek = () =>{
        if (gameweekNumber > 0) {
            SetGameweekNumber(gameweekNumber-1);
        }
    }

    return (
        <div>
            <ButtonGroup
                style={{
                position: 'absolute',
                top: '100.8%',
                right: '6.25%',
                unicodeBidi: 'plaintext',
                width: '15%'
            }}>
                <Button className="btnLeftArrowFantasy" onClick={increaseGameweek}>
                    <span>&#9664;</span>
                </Button>
                <Button className="btnGameweekFantasy">
                    {gameweek}
                    {gameweekNumber}
                </Button>
                <Button className="btnRightArrowFantasy" onClick={decreaseGameweek}>
                    <span>&#9654;</span>
                </Button>
            </ButtonGroup>

            <DataGrid
                style={{
                position: 'absolute',
                top: '105.8%',
                right: '3.25%',
                width: '25%',
                height: '47%',
                backgroundColor: '#e0f9d5',
                backgroundImage: `url(https://img.freepik.com/premium-photo/green-purple-abstract-watercolor-painting-textured-white-paper-background_7190-1251.jpg?w=740)`,
                backgroundSize: 'cover'
            }}
                rows={rows}
                columns={cols}
                disableColumnMenu
                disableColumnSort
                hideFooter/>
        </div>
    )
}

export default MatchesList;