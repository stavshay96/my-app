import {React, useState, useEffect} from "react";
import {DataGrid} from "@material-ui/data-grid";
import {useLocation} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./css/MatchesList.css"
import Matches from "./data/Matches.jsx";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import axios from "axios";

// const rows = Matches.map(createRowMatch);


function createRowMatch(match, index) {
    return {
        id: index, // If `id` does not exist, you should either remove this or provide an appropriate unique value
        HomeTeam: match.hebHomeTeamName, // Change to match actual property name
        Score: `${match.awayScore === '@' ? '-' : match.awayScore}:${match.homeScore === '@' ? '-' : match.homeScore}`, // Adjust the format to match your data
        AwayTeam: match.hebAwayTeamName // Change to match actual property name
    };
}

function wrapCellTeamNameText(params) {
    return (
        <div className="cells-grid"
            style={{
           /* whiteSpace: 'normal',
            lineHeight: '1.5',
            fontSize: '1vw',
            fontWeight: 'bold'*/
        }}>
            {params.value}
        </div>
    );
}

function wrapHeaderText(params) {
    return (
        <div className="headers-grid"
            style={{/*
            whiteSpace: 'normal',
            lineHeight: '1.5',
            fontSize: '1.1vw',
            textDecoration: 'underline'*/
        }}>
            {params.colDef.headerName}
        </div>
    );
}


function MatchesList(props) {

    const [cols, setCols] = useState([
        {
            field: "AwayTeam",
            headerName: "חוץ",
            headerAlign: 'center',
            minWidth:150,
            /*width:150,*/
            
            flex:1,
            /*width: 350,*/
            filterable: false,
            sortable: false,
            align: 'center',
            renderCell: wrapCellTeamNameText,
            renderHeader: wrapHeaderText,
            cellClassName: "away-team-cell"
        },
        {
            field: "Score",
            headerName: " ",
            headerAlign: 'right',
            type: "number",
            minWidth:50,
            flex:0.5,
            filterable: false,
            sortable: false,
            align: 'center'
        }, {
            field: "HomeTeam",
            headerName: "בית",
            headerAlign: 'center',
            minWidth:150,
            flex:1,
            /*width:350,*/
            filterable: false,
            sortable: false,
            align: 'center',
            renderCell: wrapCellTeamNameText,
            renderHeader: wrapHeaderText
        }
    ])

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gameweekNumber, setGameweekNumber] = useState(1);
    const limitGameWeek = props.numOfGames;

    // Fetch data whenever gameweekNumber changes
    useEffect(() => {
        axios.get(`https://pendel-server.onrender.com/Fantasy/FantasyLeagueData?leagueChoice=${props.leagueChoice}`)
            .then((res) => {
                const leaguedata = res.data;
                const currentGameweek = leaguedata.gameweeksList?.[gameweekNumber - 1] || [];
                setRows(currentGameweek.map(createRowMatch));
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setRows([]);
                setLoading(false);
            });
    }, [gameweekNumber, props.leagueChoice]);

    const leftArrow = "<";
    const rightArrow = ">";
    const gameweek = "מחזור ";

    const location = useLocation();

    useEffect(() => {
        setGameweekNumber(1);
        // SetGameweekNumber(props.currentGameweek);
     }, [props.currentGameweek]);
     

    const increaseGameweek = () =>{
        if (gameweekNumber < limitGameWeek) {
            //gameweekNumber1++;
            setGameweekNumber(gameweekNumber+1);
        }
    }
    const decreaseGameweek = () =>{
        if (gameweekNumber > 1) {
            //gameweekNumber1++;
            setGameweekNumber(gameweekNumber-1);
        }
    }

    useEffect(() => {
        function handleResize() {
            const screenWidth = window.innerWidth;
            const updatedCols = [...cols];
            const minWidthTeamName = 150;
            const minWidthScore = 60;
            
            if(screenWidth>=1600){
                updatedCols[0].minWidth = updatedCols[2].minWidth = minWidthTeamName+40;
                updatedCols[1].minWidth = minWidthScore+20;

            } else if (screenWidth >= 1200) {
                // Apply desktop minWidth
                updatedCols[0].minWidth = updatedCols[2].minWidth = minWidthTeamName;
                updatedCols[1].minWidth = minWidthScore;
                /*updatedCols[2].minWidth = minWidthTeamName;*/
            } else {
                // Apply default or mobile minWidth
               updatedCols[0].minWidth =  updatedCols[2].minWidth = minWidthTeamName*3-50;
                updatedCols[1].minWidth = minWidthScore*2+20;
                /*updatedCols[2].minWidth = minWidthTeamName*3-50;*/
            }

            setCols(updatedCols);
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Call it initially to set the size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="matches-list-container" >
            <div className="gameweeks-table-label"> לוח משחקים</div>
            <ButtonGroup className="gameweekFantasyRow">
                <Button className="btnLeftArrowFantasy" onClick={increaseGameweek}>
                    <span> {leftArrow} {/*&#9664;*/}</span>
                </Button>
                <Button className="btnGameweekFantasy">
                    {gameweek}
                    {gameweekNumber}
                </Button>
                <Button className="btnRightArrowFantasy" onClick={decreaseGameweek}>
                    <span> {rightArrow} {/*&#9654;*/}</span>
                </Button>
            </ButtonGroup>
            
                <DataGrid
                    className="data-grid-matches"
                   style={{/* backgroundColor: '#e0f9d5',
                   backgroundImage: `url(https://img.freepik.com/premium-photo/green-purple-abstract-watercolor-painting-textured-white-paper-background_7190-1251.jpg?w=740)`,
                   backgroundSize: 'cover',
    height: '20rem',*/}}
                    rows={rows}
                    columns={cols}
                    disableColumnMenu
                    disableColumnSort
                    hideFooter
                    autoHeight/>
           
        </div>
    )
}

export default MatchesList;