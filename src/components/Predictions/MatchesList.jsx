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
      headerClassName: 'CustomHeader',
      cellClassName: 'DataRow',
      renderCell: wrapCellTeamNameText,
      renderHeader: wrapHeaderText
    },
    {
      field: "Score",
      headerName: "תוצאה",
      headerAlign: 'center',
      type: "number",
      flex: 0.8,
      filterable: false,
      sortable: false,
      align: 'center',
      headerClassName: 'CustomHeader',
      cellClassName: 'DataRow',
      renderCell: wrapCellTeamNameText,
      renderHeader: wrapHeaderText,
    },
    {
      field: "HomeTeam",
      headerName: "בית",
      headerAlign: 'center',
      flex: 1.4,
      filterable: false,
      sortable: false,
      align: 'center',
      headerClassName: 'CustomHeader',
      cellClassName: 'DataRow',
      renderCell: wrapCellTeamNameText,
      renderHeader: wrapHeaderText,
    }
  ];
  

function CustomDropdown(match) {
    const options = [];
    const start = 0;
    const end = 30;

    const [homeTeamScore, setHomeTeamScore] = useState(0);
    const [awayTeamScore, setAwayTeamScore] = useState(0);

    for (let i = start; i <= end; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        if (name === "awayScore") {
            setAwayTeamScore(value);
        }
        else if (name === "homeScore") {
            setHomeTeamScore(value);
        }
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '1vw', marginLeft: "0.2rem"}}>
        <input
          name="awayScore"
          type="number"
          style={{
            fontSize: '1vw',
            width: "2.1rem",
            appearance: 'textfield',
          }}
          value={awayTeamScore}
          onChange={handleInputChange}
          min={start}
          max={end}
        />
        <span style={{ margin: '0 2%' }}>:</span>
        <input
          name="homeScore"
          type="number"
          style={{
            fontSize: '1vw',
            width: "2.1rem",
          }}
          value={homeTeamScore}
          onChange={handleInputChange}
          min={start}
          max={end}
        />
      </div>
    );
}

function createRowMatch(match) {
    // Check if the scores match
    const isMatch = match.ScoreHomeTeam === match.GuessScoreHomeTeam && match.ScoreAwayTeam === match.GuessScoreAwayTeam;
    const isHalfMatch = match.ScoreHomeTeam !== '-' && match.ScoreAwayTeam !== '-' &&
            ((match.ScoreHomeTeam > match.ScoreAwayTeam && match.GuessScoreHomeTeam > match.GuessScoreAwayTeam) ||
            (match.ScoreHomeTeam < match.ScoreAwayTeam && match.GuessScoreHomeTeam < match.GuessScoreAwayTeam));

    const textStyle = {
        color: isMatch ? 'green' : isHalfMatch ? 'black' : 'red',
    };

    return {
      id: match.id,
      HomeTeam: match.HomeTeam,
      Score: match.ScoreHomeTeam !== '-' ? (
        <p style={textStyle}>
          ({match.GuessScoreAwayTeam}) &nbsp;
          {match.ScoreAwayTeam} : {match.ScoreHomeTeam} &nbsp;
          ({match.GuessScoreHomeTeam})
        </p>
      ) : (
        <CustomDropdown />
      ),
      AwayTeam: match.AwayTeam
    };
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
        }}>
            {params.colDef.headerName}
        </div>
    );
}

function MatchesList() {
    const [gameweekNumber,
        SetGameweekNumber] = useState(5);
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
                position: 'fixed',
                top: '12%',
                right: '38.75%',
                unicodeBidi: 'plaintext',
                width: '15%',
            }}>
                <Button className="btnLeftArrow" onClick={increaseGameweek}>
                    <span>&#9664;</span>
                </Button>
                <Button className="btnGameweek">
                    {gameweek}
                    {gameweekNumber}
                </Button>
                <Button className="btnRightArrow" onClick={decreaseGameweek}>
                    <span>&#9654;</span>
                </Button>
            </ButtonGroup>

            <DataGrid
                style={{
                position: 'fixed',
                top: '16.8%',
                right: '23.75%',
                width: '50.4%',
                height: '75%',
                backgroundColor: '#ffdec9',
                backgroundImage: `url(https://img.freepik.com/free-vector/yellow-orange-gradient-abstract-background_53876-60243.jpg?w=740&t=st=1693524857~exp=1693525457~hmac=3be0050042821c39d05c028b710da828ca2700c3e549914f54c82de025cbfb2a)`, // Use the background image URL
                backgroundSize: 'cover',
            }}
                rows={rows}
                columns={cols}
                disableColumnMenu
                disableColumnSort
                hideFooter
                headerHeight={'5.25%'}
                />
        </div>
    )
}

export default MatchesList;