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
    const FantasyPL  = new Fantasy(await DBManager.GetLeagueFromDataBase("Premier League"), [] , []);
    console.log(req.cookies);
    console.log(FantasyPL);
    res.send(await BuildFantasyUser(req.cookies, FantasyPL));
});

FantasyRouter.post("/Admin", async(req, res) => {
    console.log(req.body.deadline);
    const newFantasySet  = new FantasySettings(req.body.deadline,req.body.budgetlimit,req.body.subslimit);
    const FantasySetInDB = await DBManager.InsertFantasySettings(newFantasySet);

    if(lod.isEqual(newFantasySet, FantasySetInDB))
    {
        res.send("The Fantasy Settings is updated");
    }
    else
    {
        res.send("The Fantasy Settings Insert To DB is failed");
    }
});

FantasyRouter.post("/Check", async(req, res) => {
    res.send("work");
});

async function BuildFantasyUser(UserInfo, League )
{
    const playerGK = League.LeagueInfo.teamsList[2].players[0];
    const playersDef = [];
    const playersMid = [];
    const playersAtt = [];
    for(let i=0; i< 4; i++)
    {
        playersDef.push(League.LeagueInfo.teamsList[i].players[i+2]);
        playersMid.push(League.LeagueInfo.teamsList[i].players[i+12]);
    }
    for(let i=0; i< 2; i++)
    {
        playersAtt.push(League.LeagueInfo.teamsList[i].players[i+18]);
    }
    const fantasyUser = new FantasyUser(UserInfo,"", playerGK, playersDef, playersMid, playersAtt);
    const isUserInDB = await DBManager.GetFantasyUserFromDataBase(UserInfo);
    if(isUserInDB != null)
    {
        fantasyUser.UpdateUserFantasyInDataBase();
    }
    else
    {
        fantasyUser.CreasteUserFantasyInDataBase();
    }
    return "Build FantasyUser Sccseed"
}