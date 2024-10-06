/* eslint-disable no-unused-vars */
import {React, useState, useEffect} from "react";
import {DataGrid} from "@material-ui/data-grid";
import {useLocation} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./css/MatchesList.css"
import axios from "axios";

function createRowMatch(match, index) {
    return {
        id: index,
        HomeTeam: match.hebHomeTeamName,
        Score: `${match.awayScore === '@' ? '-' : match.awayScore}:${match.homeScore === '@' ? '-' : match.homeScore}`,
        AwayTeam: match.hebAwayTeamName
    };
}

function wrapCellTeamNameText(params) {
    return (
        <div className="cells-grid">
            {params.value}
        </div>
    );
}

function wrapHeaderText(params) {
    return (
        <div className="headers-grid">
            {params.colDef.headerName}
        </div>
    );
}

const getGameweeksList = (leagueData) => {
    const extractedGameweek = [];
    leagueData.forEach((gameweek) => {
        const extractedMatches = [];

        gameweek.forEach((match) => {
            const extractedMatch = {
                hebHomeTeamName: match.hebHomeTeamName,
                engHomeTeamName: match.engHomeTeamName,
                homeScore: match.homeScore,
                awayScore: match.awayScore,
                hebAwayTeamName: match.hebAwayTeamName,
                engAwayTeamName: match.engAwayTeamName
            };
            extractedMatches.push(extractedMatch);
        });
        extractedGameweek.push(extractedMatches);
    });

    return extractedGameweek;
}

function MatchesList(props) {
    const leftArrow = "<";
    const rightArrow = ">";
    const gameweek = "מחזור ";
    const location = useLocation();

    const [gameweeksList, setGameweeksList] = useState([]);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gameweekNumber, setGameweekNumber] = useState(1);
    const [limitGameweek, setLimitGameweek] = useState(30);

    const [cols, setCols] = useState([{
            field: "AwayTeam", headerName: "חוץ", headerAlign: 'center', minWidth:150, /*width:150,*/ flex:1, /*width: 350,*/
            filterable: false, sortable: false, align: 'center', renderCell: wrapCellTeamNameText, renderHeader: wrapHeaderText,
            cellClassName: "away-team-cell"
        }, {
            field: "Score", headerName: " ", headerAlign: 'right', type: "number", minWidth:50, flex:0.5,
            filterable: false, sortable: false, align: 'center'
        }, {
            field: "HomeTeam", headerName: "בית", headerAlign: 'center', minWidth:150, flex:1, /*width:350,*/
            filterable: false, sortable: false, align: 'center', renderCell: wrapCellTeamNameText, renderHeader: wrapHeaderText
        }
    ])

    // get the gameweeks list from the db as a const
    useEffect(() => {
        axios
            .get(`https://pendel-server.onrender.com/Fantasy/FantasyLeagueData?leagueChoice=${props.leagueChoice}`)
            .then((res) => {
                const leaguedata = res.data;
                const extractedGameweeks = getGameweeksList(leaguedata.gameweeksList);
                setGameweeksList(extractedGameweeks);
                setLimitGameweek(FindLimitGameweek(leaguedata.gameweeksList));
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [props.leagueChoice]);

    // find the limit gameweek
    function FindLimitGameweek(i_gameweeksList) {
        let index;
        for (index = 0; index < i_gameweeksList.length; index++) {
            if (i_gameweeksList[index].length === 0) {
                break;
            }
        }

        return index;
    }

    // change the gameweek games everytime the gameweek number change
    useEffect(() => {
        const currentGameweek = gameweeksList
            ?.[gameweekNumber - 1] || [];
        setRows(currentGameweek.map(createRowMatch));
    }, [gameweekNumber, props.leagueChoice, gameweeksList]);

    useEffect(() => {
        setGameweekNumber(props.currentGameweek);
    }, [props.currentGameweek]);

    const increaseGameweek = () => {
        if (gameweekNumber < limitGameweek) {
            setGameweekNumber(gameweekNumber + 1);
        }
    }
    const decreaseGameweek = () => {
        if (gameweekNumber > 1) {
            setGameweekNumber(gameweekNumber - 1);
        }
    }

    useEffect(() => {
        function handleResize() {
            const screenWidth = window.innerWidth;
            const updatedCols = [...cols];
            const minWidthTeamName = 150;
            const minWidthScore = 60;

            if (screenWidth >= 1600) {
                updatedCols[0].minWidth = updatedCols[2].minWidth = minWidthTeamName + 40;
                updatedCols[1].minWidth = minWidthScore + 20;

            } else if (screenWidth >= 1200) {
                updatedCols[0].minWidth = updatedCols[2].minWidth = minWidthTeamName;
                updatedCols[1].minWidth = minWidthScore;
            } else {
                updatedCols[0].minWidth = updatedCols[2].minWidth = minWidthTeamName * 3 - 50;
                updatedCols[1].minWidth = minWidthScore * 2 + 20;
            }
            
            // Only update cols if they have changed
            if (JSON.stringify(updatedCols) !== JSON.stringify(cols)) {
                setCols(updatedCols);
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [cols]);

    return (
        <div className="matches-list-container">
            <div className="gameweeks-table-label">
                לוח משחקים</div>
            <ButtonGroup className="gameweekFantasyRow">
                <Button className="btnLeftArrowFantasy" onClick={increaseGameweek}>
                    <span>
                        {leftArrow}
                        {/*&#9664;*/}</span>
                </Button>
                <Button className="btnGameweekFantasy">
                    {gameweek}
                    {gameweekNumber}
                </Button>
                <Button className="btnRightArrowFantasy" onClick={decreaseGameweek}>
                    <span>
                        {rightArrow}
                        {/*&#9654;*/}</span>
                </Button>
            </ButtonGroup>

            <DataGrid
                className="data-grid-matches"
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