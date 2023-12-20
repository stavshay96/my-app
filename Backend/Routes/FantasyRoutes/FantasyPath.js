const express = require("express");
const FantasyRouter = express.Router();
module.exports = FantasyRouter;
const path = require("path");
const Fantasy = require('../../Classes/Games/Fantasy/Fantasy');
const FantasyUser = require('../../Classes/Games/Fantasy/FantasyUser_11');
const cookieParser = require('cookie-parser');
const FantasySettings = require("../../Classes/Games/Fantasy/FantasySettings");
const lod = require('lodash');

const DBManager = require(path.join(
    __dirname,
    "../../Database/DBManager"
));



FantasyRouter.use(cookieParser());



FantasyRouter.post("/FantasyPL", async(req, res) => {
    const FantasyPL = new Fantasy(await DBManager.GetLeagueFromDataBase("Premier League"), [], []);
    console.log(req.cookies);
    console.log(FantasyPL);
    res.send(await BuildFantasyUser(req.cookies, FantasyPL));
});

///------------------ post admin  to DB -------------------/////

FantasyRouter.post("/AdminFantasySettings", async(req, res) => {
    const newFantasySet = new FantasySettings(req.body.leagueChoice, req.body.deadline, req.body.budgetlimit,
        req.body.subslimit, req.body.playersFromSameTeamLimit, req.body.currentGameweek);
    console.log(newFantasySet.leagueChoice)
    await DBManager.InsertFantasySettings(newFantasySet);

    res.send("The Fantasy Settings is updated");
});

FantasyRouter.post("/AdminPointsUpdate", async(req, res) => {
    console.log("post http request of points")
        //console.log(req.body.teamsData);
    const reponse = await DBManager.UpdatePlayersPointsInDB(req.body.leagueChoice, req.body.teamsData, req.body.currentGameweek);

    res.send(reponse);
});

///--------------------------------------------Fantasy Data ---------------------------------

FantasyRouter.get("/FantasySettings", async(req, res) => {
    const leagueChoice = req.query.leagueChoice; // Assuming the leagueChoice is passed as a query parameter
    try {
        // Fetch Fantasy settings from the database (you need to implement this)
        const fantasySettings = await DBManager.GetFantasySettingsFromDatabase(leagueChoice);

        // Send the fetched settings as the response
        res.json(fantasySettings);
    } catch (error) {
        console.error("Error fetching Fantasy settings:", error);
        res.status(500).send("Internal Server Error");
    }
});

FantasyRouter.get("/FantasyLeagueData", async(req, res) => {
    const leagueChoice = req.query.leagueChoice; // Assuming the leagueChoice is passed as a query parameter
    try {
        // Fetch Fantasy settings from the database (you need to implement this)
        const fantasyLeagueData = await DBManager.GetLeagueDataFromDatabase(leagueChoice);

        // Send the fetched settings as the response
        res.json(fantasyLeagueData);
    } catch (error) {
        console.error("Error fetching Fantasy settings:", error);
        res.status(500).send("Internal Server Error");
    }
});

FantasyRouter.get("/FantasyUsersList", async(req, res) => {
    const leagueChoice = req.query.leagueChoice; // Assuming the leagueChoice is passed as a query parameter
    const fantasyType = req.query.fantasyType;
    console.log(fantasyType);
    try {
        // Fetch Fantasy users list from the database (you need to implement this)
        const fantasyUsersList = await DBManager.GetFantasyUsersListFromDatabase(leagueChoice, fantasyType);

        // Send the fetched list as the response
        res.json(fantasyUsersList);
    } catch (error) {
        console.error("Error fetching Fantasy settings:", error);
        res.status(500).send("Internal Server Error");
    }
});


////---------------------------- Fantasy User -----------------------------------------------------

FantasyRouter.post("/CreateFantasyUser", async(req, res) => {
    try {
        const fantasyUserDocument = await DBManager.CreateFantasyUserInDB(req.body.leagueID, req.body.leagueChoice,
            req.body.fantasyType, req.body.userInfo, req.body.fantasyUserTeamName,
            req.body.numOfGames, req.body.startFromGameweek);
        const info = { Status: "fantasy user created", fantasyUserInfo: fantasyUserDocument };
        //console.log(user);
        res.send(info);
    } catch (error) {
        console.error("Error creating Fantasy User :", error);
        res.status(500).send("Internal Server Error");
    }

});

FantasyRouter.post("/SetUserLineUpAndCaptain", async(req, res) => {
    try {
        await DBManager.SetFantasyUserLineUp(req.body.userInfo, req.body.leagueChoice,
            req.body.fantasyType, req.body.Gameweek, req.body.lineup, req.body.Captain,
            req.body.tripleUsedInGameweek, req.body.wildCardUsedInGameweek);
        const info = { Status: "fantasy user updated" };
        res.send(info);
    } catch (error) {
        console.error("Error creating Fantasy User :", error);
        res.status(500).send("Internal Server Error");
    }

});



FantasyRouter.get("/GetFantasyUser", async(req, res) => {
    const userID = req.query.userID; // Assuming the userID is passed as a query parameter
    const leagueChoice = req.query.leagueChoice;
    const fantasyType = req.query.fantasyType;
    try {
        const fantasyUser = await DBManager.GetFantasyUserFromDB(userID, leagueChoice, fantasyType);

        // Send the fetched settings as the response
        res.json(fantasyUser);
    } catch (error) {
        console.error("Error fetching Fantasy User:", error);
        res.status(500).send("Internal Server Error");
    }
});
/////


///// TO DO
FantasyRouter.post("/UpdateFantasyUser", async(req, res) => {
    let info = await UpdateFantasyUser(req.body.fantasyUserInfo);
    //console.log(user);
    res.send(info);
});
///////



////-------------------------------------- external routes (requests only from postman) -------------------------------

FantasyRouter.post("/AddPlayer", async(req, res) => {
    try {
        const insertStatus = await DBManager.AddPlayerToTeam(req.body.englishLeagueName, req.body.hebrewPlayerName, req.body.englishPlayerName,
            req.body.position, req.body.englishTeamName, req.body.hebrewTeamName, req.body.price);
        const info = { Status: insertStatus };
        //console.log(user);
        res.send(info);
    } catch (error) {
        console.error("Error inserting player :", error);
        res.status(500).send("Internal Server Error");
    }

});




async function BuildFantasyUser(UserInfo, League) {
    const playerGK = League.LeagueInfo.teamsList[2].players[0];
    const playersDef = [];
    const playersMid = [];
    const playersAtt = [];
    for (let i = 0; i < 4; i++) {
        playersDef.push(League.LeagueInfo.teamsList[i].players[i + 2]);
        playersMid.push(League.LeagueInfo.teamsList[i].players[i + 12]);
    }
    for (let i = 0; i < 2; i++) {
        playersAtt.push(League.LeagueInfo.teamsList[i].players[i + 18]);
    }
    const fantasyUser = new FantasyUser(UserInfo, "", playerGK, playersDef, playersMid, playersAtt);
    const isUserInDB = await DBManager.GetFantasyUserFromDataBase(UserInfo);
    if (isUserInDB != null) {
        fantasyUser.UpdateUserFantasyInDataBase();
    } else {
        fantasyUser.CreasteUserFantasyInDataBase();
    }
    return "Build FantasyUser Sccseed"
}