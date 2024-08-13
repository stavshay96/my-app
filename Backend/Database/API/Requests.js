const axios = require('axios');
const Player = require('../../Classes/Info/Player');
const Team = require('../../Classes/Info/Team');
const League = require('../../Classes/Info/League');
const path = require("path");
const DBManager = require(path.join(
    __dirname,
    "../DBManager"
));

let config = {
    method: 'get',
    url: 'http://api.football-data.org/v4/competitions/PL/matches',
    headers: {
        'X-Auth-Token': 'ae8e44252c794be0bac8932ad4e29edd'
    }
};

let countTeamID = 100;
let countPlayerID = 1000;
const numOfGames = 38;
const gamesInGameweek = 10;

axios(config)
    .then(async function(response) {
        let gameweeks_full_data = JSON.parse(JSON.stringify(response.data));
        //console.log(Object.keys(gameweeks_full_data.matches));
        gameweeksList = [];
        let matches = []
        let matchIndex = 1;


        gameweeks_full_data.matches.forEach(element => {
            const match = {
                hebHomeTeamName: getHebrewName(element.homeTeam.shortName),
                engHomeTeamName: element.homeTeam.shortName,
                homeScore: '@',
                awayScore: '@',
                hebAwayTeamName: getHebrewName(element.awayTeam.shortName),
                engAwayTeamName: element.awayTeam.shortName
            }
            matches.push(match);
            matchIndex++;
            if (matchIndex > gamesInGameweek) {
                gameweeksList.push(matches);
                matches = [];
                matchIndex = 1;
            }

        });

        const status = DBManager.InsertGameweeksToListFromAPI("PremierLeague", gameweeksList);

        console.log(status);

        console.log("finished")

    })
    .catch(function(error) {
        console.log(error);
    });




/////////////----------------------------------  teams data -----------------------------//////////////


/*let config = {
    method: 'get',
    url: 'http://api.football-data.org/v4/competitions/PL/teams',
    headers: {
        'X-Auth-Token': 'ae8e44252c794be0bac8932ad4e29edd'
    }
};


axios(config)
    .then(async function(response) {
        let league_full_data = JSON.parse(JSON.stringify(response.data))
        const league = new League(1, "PremierLeague", "ליגה אנגלית", [], Array.from({ length: 38 }, () => []), 38)
        league_full_data.teams.forEach(element => {
                const team = new Team(countTeamID, element.shortName, "", [])
                    //console.log(team.englishName);
                element.squad.forEach(p => {
                        const position = translatedPosition(p.position);
                        const player = new Player(countPlayerID, p.name, "", team.englishName, "", position, Array.from({ length: league.numOfGames }, () => 0), 0, 0, [])
                        team.Players.push(player)
                        countPlayerID++;
                    })
                    //team.players.sort(comparePositions);
                league.TeamsList.push(team)
                    //console.log(team.players.forEach(element => console.log(`${element.englishName} , ${element.position}`)));
                    //console.log(" ");
                countTeamID++;
            })
            //console.log(league);
            //console.log(league.teamsList[6].Players)
            //league.teamsList[6].Players.forEach(element => console.log(element.englishName));
        const status = DBManager.CreateNewLeagueInDataBase(league);
        console.log(status);
        console.log("finished")

    })
    .catch(function(error) {
        console.log(error);
    });

function translatedPosition(position) {
    if (position.includes("Back")) {
        return "Defence";
    } else if (position.includes("Winger") || position.includes("Midfield")) {
        return "Midfield";
    } else if (position.includes("Forward")) {
        return "Offence";
    } else {
        return position;
    }
}
    */

function comparePositions(playerA, playerB) {
    const positionsOrder = ["Goalkeeper", "Defence", "Midfield", "Offence"];
    const positionA = playerA.position;
    const positionB = playerB.position;

    // Use the positionsOrder array to determine the sorting order
    const indexA = positionsOrder.indexOf(positionA);
    const indexB = positionsOrder.indexOf(positionB);

    return indexA - indexB;
}

const teamDictionary = {
    "Man United": "מנצ'סטר יונייטד",
    "Fulham": "פולהאם",
    "Ipswich Town": "איפסוויץ'",
    "Liverpool": "ליברפול",
    "Arsenal": "ארסנל",
    "Wolverhampton": "וולבס",
    "Everton": "אברטון",
    "Brighton Hove": "ברייטון",
    "Newcastle": "ניוקאסל",
    "Southampton": "סאות'המפטון",
    "Nottingham": "נוטינגהאם",
    "Bournemouth": "בורנמות'",
    "West Ham": "ווסטהאם",
    "Aston Villa": "אסטון וילה",
    "Brentford": "ברנטפורד",
    "Crystal Palace": "קריסטל פאלאס",
    "Chelsea": "צ'לסי",
    "Man City": "מנצ'סטר סיטי",
    "Leicester City": "לסטר",
    "Tottenham": "טוטנהאם"
};

// Function to get the Hebrew name by English key
function getHebrewName(englishName) {
    return teamDictionary[englishName] || "Unknown team";
}