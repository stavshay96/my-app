const path = require("path");
const DBManager = require(path.join(__dirname, "../Database/DBManager"));

const Player = require('../Classes/Info/Player');
const Team = require('../Classes/Info/Team');
const League = require('../Classes/Info/League');
const { Console } = require("console");
const fs = require('fs').promises;




async function arrangePlayersID(playersIDstartFrom, englishLeagueName) {
    //let playersIDstartFrom = 1000;
    //const englishLeagueName = "PremierLeague";
    const insertStatus = await DBManager.ArrangePlayersIDinDB(englishLeagueName, playersIDstartFrom);
    console.log(insertStatus);
    process.exit(0);
}

async function arrangeLeagueAndTeamsID(numIdentifier, englishLeagueName) {
    const insertStatus = await DBManager.ArrangeLeagueAndTeamsIDinDB(englishLeagueName, numIdentifier);
    console.log(insertStatus);
    process.exit(0);
}

//arrangePlayersID(1000, "PremierLeague")
//arrangeLeagueAndTeamsID(1, "PremierLeague");



async function addPlayer(englishLeagueName, hebrewPlayerName, englishPlayerName, position, englishTeamName, hebrewTeamName, price) {

    try {
        const insertStatus = await DBManager.AddPlayerToTeam(englishLeagueName, hebrewPlayerName, englishPlayerName,
            position, englishTeamName, hebrewTeamName, price);
        console.log(insertStatus);
        process.exit(0);
    } catch (error) {
        console.error("Error inserting player :", error);

    }
}

/*addPlayer(
    "PremierLeague",
    "ברנן ג'ונסון",
    "Brennan Johnson",
    "Midfield",
    "Tottenham",
    "טוטנהאם",
    8
);*/


async function insertHebrewPlayersNameFromFileManyTeams(filePath, englishLeagueName) {
    /* format file:
     ** hebrew team name
     ** each line - hebrew player name , price
     ** blank line
     ** "END" in last line (after blank line)
     */

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const lines = data.split('\n');

        const insertStatus = await DBManager.InsertHebrewNamesManyTeams(lines, englishLeagueName);
        console.log(insertStatus);
        process.exit(0);
    } catch (error) {
        console.error("Error inserting player hebrew names :", error);
        process.exit(1);
    }

}
//const filePath = "../../files/LigaLeumit/namesPricePlayersLeumit2024-2025.txt"
//insertHebrewPlayersNameFromFileManyTeams(filePath, "LigaLeumit");

async function insertNewPlayersToLeagueFromFile(filePath, englishLeagueName) {
    /* format file:
     ** each line - hebrew player name, english player name, position, hebrew team name, price
     ** END in last line
     ** NO BLANK LINES!
     */
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const lines = data.split('\n');
        /*console.log(lines);
        for (let line of lines) {
            const playerInfo = line.split(',');
            console.log(playerInfo);
            if (playerInfo.length === 5) {
                const hebName = playerInfo[0];
                const engName = playerInfo[1];
                const position = playerInfo[2];
                const hebTeamName = playerInfo[3];
                const price = playerInfo[4];
                console.log(`the price of ${engName} is ${price} `)
            }
        }*/
        const insertStatus = await DBManager.InsertNewPlayersToLeague(lines, englishLeagueName);
        console.log(insertStatus);
        process.exit(0);
    } catch (error) {
        console.error(`Error inserting new player to ${englishLeagueName} :`, error);
        process.exit(1);
    }
}

// const filePath = "../../files/LigaLeumit/newPlayersLigaLeumit2.txt"
// insertNewPlayersToLeagueFromFile(filePath, "LigaLeumit");

async function transferPlayersBetweenTeamsFromFileHebrew(filePath, englishLeagueName) {
    /* format file:
     ** first line - current gameweek
     ** second line - num of games in this league (for transfer in whole future linups..)
     ** each line - heb player name, heb team from, heb team to
     ** END in last line
     ** NO BLANK LINES!
     */
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const lines = data.split('\n');

        const insertStatus = await DBManager.transfersPlayersBetweenTeamsHebrew(lines, englishLeagueName);
        console.log(insertStatus);
        process.exit(0);
    } catch (error) {
        console.error(`Error transfer players in ${englishLeagueName} :`, error);
        process.exit(1);
    }
}

const filePath = "../../files/LigaLeumit/transfersInsideLigaLeumit.txt"
transferPlayersBetweenTeamsFromFileHebrew(filePath, "LigaLeumit");


async function insertLeagueAndTeamsToDBFromFile(filePath, leagueID, englishLeagueName, hebrewLeagueName, numOfGames) {
    try {
        const league = new League(leagueID, englishLeagueName, hebrewLeagueName, [], Array.from({ length: numOfGames }, () => []), numOfGames);
        const data = await fs.readFile(filePath, 'utf8');
        const lines = data.split('\n');
        let countTeamID = leagueID * 100;

        //console.log(lines);
        for (let line of lines) {
            const TeamData = line.split(',');
            if (TeamData.length === 2) {
                const hebName = TeamData[0].trim();
                const engName = TeamData[1].trim();
                console.log(`the team name is  ${engName} and in hebrew ${hebName} `)
                const team = new Team(countTeamID, engName, hebName, []);
                league.TeamsList.push(team);
                countTeamID++;
            }
        }
        const insertStatus = await DBManager.CreateNewLeagueInDataBase(league);
        console.log(insertStatus);
        process.exit(0);
    } catch (error) {
        console.error(`Error insert league and team in ${englishLeagueName} :`, error);
        process.exit(1);
    }

}

// const filePath = "../../files/LigaLeumit/namesTeamsLeumit.txt"
// insertLeagueAndTeamsToDBFromFile(filePath, 3, "LigaLeumit", "ליגה לאומית", 37);

async function insertPlayersToDBFromFileManyTeams(filePath, englishLeagueName) {
    /* format file:
     ** hebrew team name
     ** each line - hebrew player name , english player name, position, *price*
     ** blank line
     ** "END" in last line (after blank line)
     */

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const lines = data.split('\n');

        const insertStatus = await DBManager.InsertPlayersInfoManyTeams(lines, englishLeagueName);
        console.log(insertStatus);
        process.exit(0);
    } catch (error) {
        console.error("Error inserting players info :", error);
        process.exit(1);
    }

}
// const filePath = "../../files/LigaLeumit/playersLeumit2025-2026.txt"
// insertPlayersToDBFromFileManyTeams(filePath, "LigaLeumit");

async function insertGameweeksToDBFromFile(filePath, englishLeagueName) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const lines = data.split('\n');
        const nonEmptyLines = lines.filter(line => line.trim() !== '');
        //console.log(nonEmptyLines);

        const insertStatus = await DBManager.InsertGameweeksToList(nonEmptyLines, englishLeagueName);
        console.log(insertStatus);
        process.exit(0);
    } catch (error) {
        console.error("Error reading file:", error);
        process.exit(1);
    }
}

// const filePathGameweek = "../../files/LigaLeumit/matches_full_30.txt";
// insertGameweeksToDBFromFile(filePathGameweek, "LigaLeumit");