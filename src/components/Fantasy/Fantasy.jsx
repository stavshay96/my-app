/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {React, useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import axios from "axios";
import "./css/Fantasy.css";
import FantasyHomePage from "./pages/FantasyHomePage";
import FantasySubsPage from "./pages/FantasySubsPage";
import AdminFantasy from "../Admin/AdminFantasy";
import FantasyRoomPage from "./pages/FantasyRoomPage";

function getLineUp() {
    return [];
}

function getCaptain() {
    return {};
}

const Fantasy = (props) => {
  const [fantasyUser, SetFantasyUser] = useState({});
  const [lineup, SetLineup] = useState(getLineUp);
  const [captain, SetCaptain] = useState(getCaptain);
  const [currentBudget, SetCurrentBudget] = useState(0);
  const [budgetLimit, SetBudgetLimit] = useState(0);
  const [currentSubs, SetCurrentSubs] = useState(0);
  const [subsLimit, SetSubsLimit] = useState(0);
  const [deadLineDate,SetDeadLineDate] = useState('2023-09-12T16:00:00');
  const [isDeadLineDatePass, SetIsDeadLineDatePass] = useState(false);
  const [currentGameweek, SetCurrentGameweek] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [leagueData, SetLeagueData] = useState([]);
  const [playersList, SetPlayersList] = useState([]);
  const [fantasyType, SetFantasyType] = useState(11);
  const [numOfGames, SetNumOfGames] = useState(0);
  const [leagueID, SetLeagueID] = useState(0);
  const [playersFromSameTeamLimit, SetPlayersFromSameTeamLimit] = useState(2);
  const [gameweekNumber, SetGameweekNumber] = useState(1);

    const getFantasySettings = () => {
        axios
            .get(`https://pendel-server.onrender.com/Fantasy/FantasySettings?leagueChoice=${props.leagueChoice}`)
            .then((res) => {
                const settings = res.data;
                console.log(settings);

                SetDeadLineDate(settings.deadline);
                SetSubsLimit(settings.numOfSubsLimit);
                SetBudgetLimit(settings.budgetLimit);
                SetPlayersFromSameTeamLimit(settings.playersFromSameTeamLimit);
                SetCurrentGameweek(settings.currentGameweek);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }

    const getFantasyLeagueData = () => {
        axios
            .get(`https://pendel-server.onrender.com/Fantasy/FantasyLeagueData?leagueChoice=${props.leagueChoice}`)
            .then((res) => {
                const leaguedata = res.data;
                SetLeagueData(leaguedata.teamsList);
                SetNumOfGames(leaguedata.numOfGames);
                SetLeagueID(leaguedata.leagueID)
                console.log(leaguedata);
                console.log(leaguedata.teamsList);
                console.log(leaguedata.numOfGames);
                console.log(leaguedata.gameweeksList);
                const extractedPlayers = getPlayersList(leaguedata.teamsList);

                SetPlayersList(extractedPlayers);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }

    const getFantasyUser = () => {
        console.log(props.userInfo.userID);
        axios
            .get(`https://pendel-server.onrender.com/Fantasy/GetFantasyUser?userID=${props.userInfo.userID}&leagueChoice=${props.leagueChoice}&fantasyType=${fantasyType}`)
            .then((res) => {
                const fantasyUserFromDB = res.data;
                console.log(fantasyUserFromDB);
                if (fantasyUserFromDB) {
                    SetFantasyUser(res.data)
                    handleLineup(fantasyUserFromDB.lineupsArr[currentGameweek - 1]);
                    handleCaptain(fantasyUserFromDB.captain[currentGameweek - 1]);
                    handleSubs(fantasyUserFromDB.subsNumInThisGameweek);
                } else {
                    SetFantasyUser(undefined);
                }

            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }

    const getShortedPosition = (position) => {
        if (position === "Goalkeeper") 
            return "GK";
        if (position === "Defence") 
            return "DF";
        if (position === "Midfield") 
            return "MF";
        if (position === "Offence") 
            return "FW";
        }
    
    const getPlayersList = (leagueData) => {
        const extractedPlayers = [];
        leagueData.forEach((team) => {

            team
                .players
                .forEach((player) => {
                    const extractedPlayer = {
                        id: player.playerID,
                        totalPoints: player.totalPoints,
                        currentPoints: 0,
                        price: player.price,
                        playerName: player.englishName,
                        playerHebName: player.hebrewName,
                        position: getShortedPosition(player.position),
                        team: team.hebrewName,
                        kit: team.englishName
                    };
                    // count++;
                    extractedPlayers.push(extractedPlayer);
                });
        });
        return extractedPlayers;

    }

    useEffect(() => {
        getFantasySettings();
        getFantasyLeagueData();
    }, []);

    useEffect(() => {
        if (props.userInfo.userID && isLoading && currentGameweek > 0) {
            getFantasyUser();
        }

        if (currentGameweek > 0) 
            setIsLoading(false);
        
        console.log(playersList);
    }, [fantasyUser, currentGameweek]);

    const handleLineup = (lineup) => {
        SetLineup(lineup); //update lineup

        console.log(`${lineup.length} fantasy`);
    };

    const handleCaptain = (captain) => {
        SetCaptain(captain);
        console.log(`${captain} captain`);
    };

    const handleBudget = (budget) => {
        SetCurrentBudget(budget);
    }

    const handleSubs = (subs) => {
        SetCurrentSubs(subs);
    }

    const handleIsDeadLineDatePass = (isDeadLineDatePass) => {
        SetIsDeadLineDatePass(isDeadLineDatePass);
        console.log(`${isDeadLineDatePass}`);
    }

    window.onpopstate = function (event) {
        // Check if the user is navigating back
        if (event.state && event.state.navigationDirection === "back") {
            // Refresh the page
            window
                .location
                .reload();
        }
    };

    return (
        <Routes>
            {!isLoading && ( <> <Route
                path="/"
                element={< FantasyHomePage lineup = {
                lineup
            }
            handleLineup = {
                handleLineup
            }
            leagueChoice = {
                props.leagueChoice
            }
            currentBudget = {
                currentBudget
            }
            handleBudget = {
                handleBudget
            }
            budgetLimit = {
                budgetLimit
            }
            topbarLeagueName = {
                props.topbarLeagueName
            }
            currentSubs = {
                currentSubs
            }
            handleSubs = {
                handleSubs
            }
            subsLimit = {
                subsLimit
            }
            SetSubsLimit = {
                SetSubsLimit
            }
            currentGameweek = {
                currentGameweek
            }
            captain = {
                captain
            }
            handleCaptain = {
                handleCaptain
            }
            playersList = {
                playersList
            }
            numOfGames = {
                numOfGames
            }
            fantasyType = {
                fantasyType
            }
            leagueID = {
                leagueID
            }
            deadLineDate = {
                deadLineDate
            }
            handleIsDeadLineDatePass = {
                handleIsDeadLineDatePass
            }
            isDeadLineDatePass = {
                isDeadLineDatePass
            }
            userInfo = {
                props.userInfo
            }
            WrapUserInfo = {
                props.WrapUserInfo
            }
            fantasyUser = {
                fantasyUser
            }
            SetFantasyUser = {
                SetFantasyUser
            }
            gameweekNumber = {
                gameweekNumber
            }
            SetGameweekNumber = {
                SetGameweekNumber
            } />}/> < Route path = "subs" element = { < FantasySubsPage lineup = {
                    lineup
                }
                handleLineup = {
                    handleLineup
                }
                leagueChoice = {
                    props.leagueChoice
                }
                currentBudget = {
                    currentBudget
                }
                handleBudget = {
                    handleBudget
                }
                budgetLimit = {
                    budgetLimit
                }
                topbarLeagueName = {
                    props.topbarLeagueName
                }
                currentSubs = {
                    currentSubs
                }
                handleSubs = {
                    handleSubs
                }
                subsLimit = {
                    subsLimit
                }
                SetSubsLimit = {
                    SetSubsLimit
                }
                currentGameweek = {
                    currentGameweek
                }
                captain = {
                    captain
                }
                handleCaptain = {
                    handleCaptain
                }
                playersList = {
                    playersList
                }
                numOfGames = {
                    numOfGames
                }
                deadLineDate = {
                    deadLineDate
                }
                handleIsDeadLineDatePass = {
                    handleIsDeadLineDatePass
                }
                isDeadLineDatePass = {
                    isDeadLineDatePass
                }
                userInfo = {
                    props.userInfo
                }
                WrapUserInfo = {
                    props.WrapUserInfo
                }
                fantasyUser = {
                    fantasyUser
                }
                SetFantasyUser = {
                    SetFantasyUser
                }
                fantasyType = {
                    fantasyType
                }
                playersFromSameTeamLimit = {
                    playersFromSameTeamLimit
                }
                gameweekNumber = {
                    gameweekNumber
                }
                SetGameweekNumber = {
                    SetGameweekNumber
                } />
            } /> <Route
                path="/admin"
                element={< AdminFantasy leagueChoice = {
                props.leagueChoice
            }
            leagueData = {
                leagueData
            }
            SetLeagueData = {
                SetLeagueData
            }
            currentGameweek = {
                currentGameweek
            }
            deadLineDate = {
                deadLineDate
            }
            subsLimit = {
                subsLimit
            }
            budgetLimit = {
                budgetLimit
            }
            playersFromSameTeamLimit = {
                playersFromSameTeamLimit
            }
            userInfo = {
                props.userInfo
            } />}/> < Route path = "/rooms" element = { < FantasyRoomPage leagueChoice = {
                    props.leagueChoice
                }
                currentGameweek = {
                    currentGameweek
                }
                fantasyType = {
                    fantasyType
                }
                userInfo = {
                    props.userInfo
                }
                WrapUserInfo = {
                    props.WrapUserInfo
                } />
            } /> </>)}
        </Routes>
    )
}

export default Fantasy;
