import {React, useState, useEffect} from "react";
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

function MatchesList(props) {
    
    const [gameweekNumber,
        SetGameweekNumber] = useState(1);
    const gameweek = "מחזור ";
    const limitGameWeek = props.numOfGames;


    useEffect(() => {
        SetGameweekNumber(props.currentGameweek);
     }, [props.currentGameweek]);
    
    const increaseGameweek = () =>{
        if (gameweekNumber < limitGameWeek) {
            //gameweekNumber1++;
            SetGameweekNumber(gameweekNumber+1);
        }
    }
    const decreaseGameweek = () =>{
        if (gameweekNumber > 1) {
            //gameweekNumber1++;
            SetGameweekNumber(gameweekNumber-1);
        }
    }

    return (
        <div style={{
            position: 'absolute',
            top: '54%',
            right: '3.25%',
            width: '26%',
            height: '47%',
            unicodeBidi: 'plaintext',
          // alignItems:'flex-start',
          alignContent:'flex-start',
           display:'block',
        }}>
            <ButtonGroup
                style={{ marginLeft:'6rem' }}>
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
                   style={{ backgroundColor: '#e0f9d5',
                   backgroundImage: `url(https://img.freepik.com/premium-photo/green-purple-abstract-watercolor-painting-textured-white-paper-background_7190-1251.jpg?w=740)`,
                   backgroundSize: 'cover',
                   height: '20rem',}}
                    rows={rows}
                    columns={cols}
                    disableColumnMenu
                    disableColumnSort
                    hideFooter/>
           
        </div>
    )
}

export default MatchesList;