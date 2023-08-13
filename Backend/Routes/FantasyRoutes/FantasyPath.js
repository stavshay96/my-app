const express = require("express");
const FantasyRouter = express.Router();
module.exports = FantasyRouter;
const path = require("path");
const Fantasy = require('../../Classes/Games/Fantasy/Fantasy');
const FantasyUser = require('../../Classes/Games/Fantasy/FantasyUser');
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

///------------------ post admin settings to DB -------------------/////

FantasyRouter.post("/Admin", async(req, res) => {
    const newFantasySet = new FantasySettings(req.body.leagueChoice, req.body.deadline, req.body.budgetlimit, req.body.subslimit);
    console.log(newFantasySet.leagueChoice)
    await DBManager.InsertFantasySettings(newFantasySet);

    res.send("The Fantasy Settings is updated");
});

///------------------------------------------------------------------

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

FantasyRouter.get("/LeagueData", async(req, res) => {
    const leagueChoice = req.query.leagueChoice; // Assuming the leagueChoice is passed as a query parameter
    try {
        // Fetch Fantasy settings from the database (you need to implement this)
        const fantasyLeague = await DBManager.GetLeagueFromDataBase(leagueChoice);

        // Send the fetched settings as the response
        res.json(fantasyLeague);
    } catch (error) {
        console.error("Error fetching Fantasy league:", error);
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