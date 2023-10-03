'use strict';
const { MongoClient } = require("mongodb");
const uriDB = "mongodb+srv://Pendel:Pendel@pendel.2h5nfcp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uriDB);

///--------------------------------- main connecting ------------------------------/////
async function ConnectToMongoDB() {
    try {
        console.log("Connecting To database...");
        await client.connect();
        console.log("Connecting To database succssed");
    } catch (e) {
        console.log("Error connecting to Data base");
        console.log(e);
    }
}

////--------------------------------- user functions ------------------------////////

async function CreateNewPersonInDataBase(NewPerson) {
    let num_of_users = await client.db("Users").collection("Users").estimatedDocumentCount();
    NewPerson.changeUserID(num_of_users + 1);
    const newAddedUser = await client.db("Users").collection("Users").insertOne(NewPerson);
}

async function CheckUserExists(email, password) {
    const user = await client.db("Users").collection("Users").findOne({ email: email, password: password });
    return user;
}

async function FindUserByCookie(email, fullName, userID) {
    const user = await client.db("Users").collection("Users").findOne({ email: email, fullName: fullName, userID: userID });
    return user;
}



////--------------------------------- fantasy functions ------------------------////////

async function InsertFantasySettings(FantasySettings) {
    const query = { leagueChoice: FantasySettings.leagueChoice }
    const pervFantasySettings = await client.db("FantasyUser").collection("FantasySettings").findOne(query);

    if (pervFantasySettings) {
        await client.db("FantasyUser").collection("FantasySettings").deleteOne(pervFantasySettings);
        await client.db("FantasyUser").collection("FantasySettings").insertOne(FantasySettings);
    } else {
        return await client.db("FantasyUser").collection("FantasySettings").insertOne(FantasySettings);
    }

}

async function GetFantasySettingsFromDatabase(i_leagueChoice) {
    const query = { leagueChoice: i_leagueChoice }
    try {
        // Use the leagueChoice parameter to fetch the specific Fantasy settings from the database
        const fantasySettings = await client.db("FantasyUser").collection("FantasySettings").findOne(query);
        return fantasySettings;
    } catch (error) {
        console.error("Error fetching Fantasy settings:", error);
        throw error; // You might want to handle this error in the calling function
    }
}


//if teams are in league object in Info collection
async function GetLeagueDataFromDatabase(i_leagueChoice) {
    const query = { englishleagueName: i_leagueChoice }
        //console.log(formattedLeagueChoice);
    try {
        // Use the leagueChoice parameter to fetch the specific Fantasy settings from the database
        const fantasyLeagueData = await client.db("LeaguesInfo").collection("Info").findOne(query);
        //console.log(fantasyLeagueData);
        return fantasyLeagueData;
    } catch (error) {
        console.error("Error fetching Fantasy data:", error);
        throw error; // You might want to handle this error in the calling function
    }
}



async function CreateNewLeagueInDataBase(NewLeague) {
    const query = { englishleagueName: NewLeague.englishleagueName }

    const league = await client
        .db("LeaguesInfo")
        .collection("Info")
        .findOne(query);

    if (league) {
        await client.db("LeaguesInfo").collection("Info").deleteOne(league);
        await client.db("LeaguesInfo").collection("Info").insertOne(NewLeague);
    } else {
        await client.db("LeaguesInfo").collection("Info").insertOne(NewLeague);
    }
}



async function AddPlayerToTeam(englishLeagueName, hebrewPlayerName, englishPlayerName, position, englishTeamName, hebrewTeamName, price) {
    const query = { englishleagueName: englishLeagueName };
    const league = await client.db("LeaguesInfo").collection("Info").findOne(query);
    if (league) {
        // Find the team in the teamsList array
        const teamIndex = league.teamsList.findIndex(team => team.englishName === englishTeamName);
        console.log(`league found ${teamIndex}`);
        if (teamIndex !== -1) {
            const playerID = findPlayerID(league);
            console.log(`playerID found ${playerID}`);
            // Create the player object
            const player = new Player(playerID, englishPlayerName, hebrewPlayerName, englishTeamName, hebrewTeamName, position,
                Array.from({ length: league.numOfGames }, () => 0), 0, price, []);

            // Add the player to the team's playersList (assuming you have a playersList array in your team object)
            league.teamsList[teamIndex].players.push(player);
            // league.teamsList[teamIndex].players.sort(comparePositions);

            // Update the league document in the database
            await client.db("LeaguesInfo").collection("Info").updateOne(query, { $set: league });

            return `the player ${englishPlayerName} added to the team successfully`;
        } else {
            return "Team not found in the league";
        }
    } else {
        return "League not found";
    }

}

function findPlayerID(league) {

    let LeagueNumOfPlayers = league.teamsList.reduce((sum, team) => sum + team.players.length, 0);
    LeagueNumOfPlayers += (league.leagueID * 1000 + 1);
    return LeagueNumOfPlayers;
}

function comparePositions(playerA, playerB) {
    const positionsOrder = ["Goalkeeper", "Defence", "Midfield", "Offence"];
    const positionA = playerA.position;
    const positionB = playerB.position;

    // Use the positionsOrder array to determine the sorting order
    const indexA = positionsOrder.indexOf(positionA);
    const indexB = positionsOrder.indexOf(positionB);

    return indexA - indexB;
}

async function ArrangePlayersIDinDB(i_englishLeagueName, i_playerIDStartFrom) {
    const query = { englishleagueName: i_englishLeagueName };
    const league = await client.db("LeaguesInfo").collection("Info").findOne(query);
    if (league) {
        league.teamsList.forEach(team => {
            team.players.forEach(player => {
                player.playerID = i_playerIDStartFrom;
                i_playerIDStartFrom++;
            })
        })
        console.log(`stop in player with the  id - ${i_playerIDStartFrom}`);
        await client.db("LeaguesInfo").collection("Info").updateOne(query, { $set: league });
        return `the changes of ids succeeded`;

    } else {
        return "League not found";
    }
}

async function ArrangeLeagueAndTeamsIDinDB(i_englishLeagueName, i_numIdentifier) {
    const query = { englishleagueName: i_englishLeagueName };
    const league = await client.db("LeaguesInfo").collection("Info").findOne(query);
    let countTeamID = i_numIdentifier * 100;
    if (league) {
        league.leagueID = i_numIdentifier;
        league.teamsList.forEach(team => {
            team.teamID = countTeamID;
            countTeamID++;

        })
        console.log(`stop in team with id ${countTeamID}`);
        await client.db("LeaguesInfo").collection("Info").updateOne(query, { $set: league });
        return `the changes of ids succeeded`;

    } else {
        return "League not found";
    }
}


async function InsertHebrewNamesManyTeams(i_lines, i_englishLeagueName) {
    const query = { englishleagueName: i_englishLeagueName };
    const league = await client.db("LeaguesInfo").collection("Info").findOne(query);
    if (league) {
        let i = 0
        let line = i_lines[i];
        while (line !== "END") {
            console.log(line);
            let teamIndex = league.teamsList.findIndex(team => team.hebrewName.trim() === line.trim());
            console.log(`league found ${teamIndex}`);
            i++;
            if (teamIndex !== -1) {
                //console.log(i_lines);
                league.teamsList[teamIndex].players.forEach(player => {
                    const playerdetails = i_lines[i].split(',');
                    player.hebrewName = playerdetails[0];
                    player.price = parseInt(playerdetails[1]);
                    player.hebrewTeamName = line.trim();
                    i++;
                    // console.log(player);
                })

            } else {
                return "Team not found in the league";
            }
            i++;
            line = i_lines[i];


        }
        // Update the league document in the database
        await client.db("LeaguesInfo").collection("Info").updateOne(query, { $set: league });
        return `the players hebrew names in  the teams added  successfully`;
    } else {
        return "League not found";
    }

}

async function InsertNewPlayersToLeague(i_lines, i_englishLeagueName) {
    const query = { englishleagueName: i_englishLeagueName };
    const league = await client.db("LeaguesInfo").collection("Info").findOne(query);
    if (league) {
        let i = 0
        let line = i_lines[i];
        while (line.trim() !== "END") {
            const playerInfo = line.split(',');
            const hebPlayerName = playerInfo[0].trim();
            const engPlayerName = playerInfo[1].trim();
            const position = translatePosition(playerInfo[2].trim());
            const hebTeamName = playerInfo[3].trim();
            const price = parseInt(playerInfo[4]);

            //console.log(line);
            let team = league.teamsList.find(team => team.hebrewName.trim() === hebTeamName);
            console.log(team.englishName);
            let teamIndex = league.teamsList.findIndex(team => team.hebrewName.trim() === hebTeamName);
            console.log(`league found ${teamIndex}`);
            if (teamIndex !== -1) {
                const playerID = findPlayerID(league);
                console.log(`playerID found ${playerID}`);
                // Create the player object
                const player = new Player(playerID, engPlayerName, hebPlayerName, team.englishName, hebTeamName, position,
                    Array.from({ length: league.numOfGames }, () => 0), 0, price, []);

                // Add the player to the team's playersList (assuming you have a playersList array in your team object)
                league.teamsList[teamIndex].players.push(player);
                //console.log(player);
            } else {
                return "Team not found in the league";
            }
            i++;
            line = i_lines[i];


        }
        // Update the league document in the database
        await client.db("LeaguesInfo").collection("Info").updateOne(query, { $set: league });
        return `the new players added to  the teams   successfully`;
    } else {
        return "League not found";
    }
}

function translatePosition(position) {
    if (position.toLowerCase() === "gk" || position === "שוער" || position.toLowerCase() === "goalkeeper") {
        return "Goalkeeper";
    } else if (position.toLowerCase() === "df" || position === "הגנה" || position.toLowerCase() === "defence") {
        return "Defence";
    } else if (position.toLowerCase() === "mf" || position === "קישור" || position.toLowerCase() === "midfield") {
        return "Midfield";
    } else if (position.toLowerCase() === "fw" || position === "התקפה" || position.toLowerCase() === "offence") {
        return "Offence";
    } else {
        return position;
    }
}

const { ObjectId } = require('mongodb');

async function transfersPlayersBetweenTeamsHebrew(i_lines, i_englishLeagueName) {
    const query = { englishleagueName: i_englishLeagueName };
    const league = await client.db("LeaguesInfo").collection("Info").findOne(query);
    const fantasyUsers11CollectionName = `${i_englishLeagueName}_11`;
    const fantasyUsers11 = await client.db("FantasyUser").collection(fantasyUsers11CollectionName).find().toArray();
    const fantasyUsers15CollectionName = `${i_englishLeagueName}_15`;
    const fantasyUsers15 = await client.db("FantasyUser").collection(fantasyUsers15CollectionName).find().toArray();
    //console.log(fantasyUsers11);
    // console.log(fantasyUsers15);

    if (league) {
        const currentGameweek = parseInt(i_lines[0]);
        let i = 1
        let line = i_lines[i];
        while (line.trim() !== "END") {
            const info = line.split(',');
            const transerResult = makeTransferInLeagueDB(league, info)
            updateTransferInFantasyUsers(currentGameweek, fantasyUsers11, transerResult.player, transerResult.teamTo);
            updateTransferInFantasyUsers(currentGameweek, fantasyUsers15, transerResult.player, transerResult.teamTo);

            i++;
            line = i_lines[i];
        }
        // Update the league document in the database
        await client.db("LeaguesInfo").collection("Info").updateOne(query, { $set: league });
        if (fantasyUsers11.length > 0) {
            const updateOperations11 = collectUpdatesInArray(fantasyUsers11);
            const result11 = await client.db("FantasyUser").collection(fantasyUsers11CollectionName).bulkWrite(updateOperations11);
            console.log(`${result11.modifiedCount} documents updated in ${fantasyUsers11CollectionName}`); // Print the number of updated documents
        }
        if (fantasyUsers15.length > 0) {
            const updateOperations15 = collectUpdatesInArray(fantasyUsers15);
            const result15 = await client.db("FantasyUser").collection(fantasyUsers15CollectionName).bulkWrite(updateOperations15);
            console.log(`${result15.modifiedCount} documents updated in ${fantasyUsers15CollectionName}`);
        }

        return `the transfers made successfully`;
    } else {
        return "League not found";
    }

}

function makeTransferInLeagueDB(io_league, i_info) {
    const hebPlayerName = i_info[0].trim();
    const hebTeamNameFrom = i_info[1].trim();
    const hebTeamNameTo = i_info[2].trim();

    // find team from
    let teamFrom = io_league.teamsList.find(team => team.hebrewName.trim() === hebTeamNameFrom);
    console.log(teamFrom.englishName);

    // cut player from list
    let player;
    for (let j = 0; j < teamFrom.players.length; j++) {
        if (teamFrom.players[j].hebrewName === hebPlayerName) {
            player = teamFrom.players[j];
            teamFrom.players.splice(j, 1);
        }
    }
    console.log(player.englishName);

    // find team to and add the player to list
    let teamTo = io_league.teamsList.find(team => team.hebrewName.trim() === hebTeamNameTo);
    console.log(teamTo.englishName);
    player.englishTeamName = teamTo.englishName;
    player.hebrewTeamName = teamTo.hebrewName;
    teamTo.players.push(player);

    // Return both teamTo and player as an object
    return { teamTo, player };
}

function updateTransferInFantasyUsers(i_currentGameweek, io_fantasyUsersArr, i_player, i_teamTo) {
    const currentGameweekInIndex = i_currentGameweek - 1;

    console.log("update fantasy users \n");

    for (let i = 0; i < io_fantasyUsersArr.length; i++) {
        const currentLineup = io_fantasyUsersArr[i].lineupsArr[currentGameweekInIndex];
        const currentCaptain = io_fantasyUsersArr[i].captain[currentGameweekInIndex];

        for (let player of currentLineup) {
            updatePlayerDataInFantasyUser(player, i_player, currentGameweekInIndex);
            //console.log(player);
        }
        if (currentCaptain) {
            updatePlayerDataInFantasyUser(currentCaptain, i_player, currentGameweekInIndex);
            //console.log(currentCaptain);
        }
    }
}

function updatePlayerDataInFantasyUser(io_fantasyUserPlayer, i_updatedPlayerInDB, i_currentGameweekInIndex) {
    if (io_fantasyUserPlayer.id === i_updatedPlayerInDB.playerID) {
        io_fantasyUserPlayer.team = i_updatedPlayerInDB.hebrewTeamName;
        io_fantasyUserPlayer.kit = i_updatedPlayerInDB.englishTeamName;
        io_fantasyUserPlayer.currentPoints = i_updatedPlayerInDB.pointsPerWeek[i_currentGameweekInIndex];
        io_fantasyUserPlayer.totalPoints = i_updatedPlayerInDB.totalPoints;
    }
}

function collectUpdatesInArray(i_arr) {
    const updateOperations = i_arr.map((user) => ({
        updateOne: {
            filter: { _id: new ObjectId(user._id) }, // Specify the document to update by _id
            update: { $set: user }, // Set the entire document with the updated values
        },
    }));
    return updateOperations;
}


async function GetLeagueFromDataBase(LeagueName) {
    const query = { englishleagueName: LeagueName }
    const league = await client.db("LeaguesInfo").collection("Info").findOne(query);
    return league;
}


//////////--------------------------------------------------------------------------//////////////////////////////


/////////////--------------------------- fantasy user functions -----------------------------///////////////////

const FantasyUser_11 = require('../Classes/Games/Fantasy/FantasyUser_11');
const Player = require("../Classes/Info/Player");

async function CreateFantasyUserInDB(userInfo, fantasyUserTeamName, numOfGames, startFromGameweek) {
    const gameCode = 1; // 1 - fantasy, 2 - predictions ...
    const leagueCode = 1; // 1 - premier league , 2 -ligat ha'al ...
    const typeOfGameCode = 1; // 1 - lineup11, 2 - squad15, 0 - other
    const fantasyUserID = gameCode * 100000000 + leagueCode * 10000000 + typeOfGameCode * 1000000 + userInfo.userID;
    const fantasyUser = new FantasyUser_11(fantasyUserID, userInfo, fantasyUserTeamName, Array.from({ length: numOfGames }, () => []),
        Array.from({ length: numOfGames }, () => {}), 0, 0, 0, [1], startFromGameweek);
    const newAddedFantasyUser = await client.db("FantasyUser").collection("PremierLeague_11").insertOne(fantasyUser);
    return fantasyUser;
}

async function GetFantasyUserFromDB(i_userID, i_LeagueChoice, i_FantasyType) {
    const query = { "userInfo.userID": parseInt(i_userID) };
    const collection = `${i_LeagueChoice}_${i_FantasyType}`;
    console.log(query);
    console.log(collection);
    try {

        const fantasyUser = await client.db("FantasyUser").collection(collection).findOne(query);
        //console.log(fantasyLeagueData);
        return fantasyUser;
    } catch (error) {
        console.error("Error fetching Fantasy User from dbManager:", error);
        throw error; // You might want to handle this error in the calling function
    }

}

async function SetFantasyUserLineUp(i_userID, i_LeagueChoice, i_FantasyType, gameweek, lineup, captain) {
    const query = { "userInfo.userID": parseInt(i_userID) };
    const filter = { userID: parseInt(i_userID) }
    const collection = `${i_LeagueChoice}_${i_FantasyType}`;
    try {

        const fantasyUser = await client.db("FantasyUser").collection(collection).findOne(query);

        if (fantasyUser) {
            fantasyUser.lineupsArr[gameweek - 1] = lineup;
            fantasyUser.captain[gameweek - 1] = captain;
            await client.db("FantasyUser").collection(collection).updateOne(query, { $set: fantasyUser });
        }
    } catch (error) {
        console.error("Error fetching Fantasy User from dbManager:", error);
        throw error; // You might want to handle this error in the calling function
    }

}





module.exports = {

    ConnectToMongoDB: ConnectToMongoDB,
    CreateNewPersonInDataBase: CreateNewPersonInDataBase,
    CheckUserExists: CheckUserExists,
    CreateNewLeagueInDataBase: CreateNewLeagueInDataBase,
    // UpdateUserTeamInDataBase: UpdateUserTeamInDataBase,
    GetLeagueFromDataBase: GetLeagueFromDataBase,
    //GetFantasyUserFromDataBase: GetFantasyUserFromDataBase,
    //CreateFantasyUserInDataBase: CreateFantasyUserInDataBase,
    FindUserByCookie: FindUserByCookie,
    InsertFantasySettings: InsertFantasySettings,
    GetFantasySettingsFromDatabase: GetFantasySettingsFromDatabase,
    GetLeagueDataFromDatabase: GetLeagueDataFromDatabase,
    // GetLeagueDataFromDatabaseArray: GetLeagueDataFromDatabaseArray,
    // CreateNewTeamsInDataBase: CreateNewTeamsInDataBase,
    CreateFantasyUserInDB: CreateFantasyUserInDB,
    GetFantasyUserFromDB: GetFantasyUserFromDB,
    SetFantasyUserLineUp: SetFantasyUserLineUp,
    AddPlayerToTeam: AddPlayerToTeam,
    ArrangePlayersIDinDB: ArrangePlayersIDinDB,
    ArrangeLeagueAndTeamsIDinDB: ArrangeLeagueAndTeamsIDinDB,
    InsertHebrewNamesManyTeams: InsertHebrewNamesManyTeams,
    InsertNewPlayersToLeague: InsertNewPlayersToLeague,
    transfersPlayersBetweenTeamsHebrew: transfersPlayersBetweenTeamsHebrew,


};